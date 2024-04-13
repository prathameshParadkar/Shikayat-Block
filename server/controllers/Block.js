require("dotenv").config();

const axios = require("axios");
const csv = require("csv-parser");
const fs = require("fs");
const Transactions = require("../models/TransactionSchema");

// for file uploading
const multer = require("multer");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const path = require("path");

const { response } = require("express");
const AddressTracker = require("../models/AddressTracker");

// const sources = {
//     "TokenView": 0,
//     "Etherscan": 1,
//     "Trongrid": 2,
// }

const addTransaction = async (transaction) => {
  try {
    // console.log(transaction)
    const transac = new Transactions(transaction);
    await transac.save();
    return { status: 1, msg: "Added to database" };
  } catch (e) {
    return { status: 0, msg: e };
  }
};
const checkCurrencyInCSV = async (currency, filename) => {
  return new Promise((resolve, reject) => {
    const filePath = __dirname + "/../currency_list/" + filename;
    const currencies = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        currencies.push(row.currency_code);
      })
      .on("end", () => {
        resolve(currencies.includes(currency));
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};
class BlockController {
  constructor() {}

  checkBlockchainAddress(address) {
    console.log("Address: ", address);
    const regexes = {
      btc: [
        /^1[a-zA-Z0-9]{25,33}$/,
        /^3[a-zA-Z0-9]{25,33}$/,
        /^bc1[a-zA-Z0-9]{23,42}$/,
        /^bc1p[a-zA-Z0-9]{23,42}$/,
      ],
      eth: [/^0x[a-fA-F0-9]{40}$/],
      xmr: [/^(4|8)[1-9A-Za-z]{94}$/],
      ada: [
        /^Ae2[1-9A-HJ-NP-Za-km-z]+$/,
        /^DdzFF[1-9A-HJ-NP-Za-km-z]+$/,
        /^addr1[a-z0-9]+$/,
        /^stake1[a-z0-9]+$/,
      ],
      tron: [/^T[A-HJ-NP-Za-km-z1-9]{33}$/],
      sol: [/^[1-9A-HJ-NP-Za-km-z]{32,44}$/],
      ton: [/^0:[a-z0-9]{64}$/, /^[a-zA-Z0-9\-\_]{48}$/, /^\w\s\w\s\w$/],
    };

    for (let blockchain in regexes) {
      for (let regex of regexes[blockchain]) {
        if (regex.test(address)) {
          return blockchain;
        }
      }
    }

    throw new Error("Invalid address");
  }

  test = async (req, res) => {
    var title = "Untitled";
    var dbStatus = {};
    var flag = false;
    var transaction = {};
    try {
      const id = req.params.id;
      // use regex to check if address is valid
      const nw = this.checkBlockchainAddress(id);
      const previousTransaction = await Transactions.findOne({ addr: id }).sort(
        { date: -1 }
      );
      if (previousTransaction) {
        if (Date.now() - previousTransaction.date < 120000) {
          return res.status(200).json({
            dbStatus,
            message: "Successfully Retrieved old",
            network: nw,
            data: previousTransaction,
          });
        } else {
          var prevTitle = previousTransaction.title;
          var prevFlag = previousTransaction.flag;
          var prevRemark = previousTransaction.remark;
          await previousTransaction.deleteOne();
        }
      }
      //retrive normal transaction list for trons
      // res
      // balance:
      // txs: []
      if (nw === "tron") {
        let data = await axios.get(
          `https://services.tokenview.io/vipapi/trx/address/${id}?apikey=${process.env.vTOKEN}`
        );
        transaction = {
          addr: id,
          network: nw,
          source: 0,
          data: data.data.data,
          flag: prevFlag || flag,
          title: prevTitle || title,
          remark: prevRemark || "",
          date: Date.now(),
          boardID: id,
        };
        if (data.data.code !== 1) {
          // alternative tron api
          let data = await axios.get(
            `https://api.trongrid.io/v1/accounts/${id}/transactions`
          );
          transaction = {
            addr: id,
            network: nw,
            source: 2,
            data: data.data.data,
            flag: prevFlag || flag,
            title: prevTitle || title,
            remark: prevRemark || "",
            date: Date.now(),
            boardID: id,
          };
          console.log("the transaction is: ", transaction);
          // return res.status(200).json({ dbStatus, message: "Successfully Retrieved", network: nw, data: data.data})
        }
        dbStatus = await addTransaction(transaction);
        return res.status(200).json({
          dbStatus,
          message: "Successfully Retrieved",
          network: nw,
          data: transaction.data,
        });
      } else if (nw === "xmr") {
        // https://localmonero.co/blocks/api
      }

      // test for generalized data rather than lots of txs
      // https://services.tokenview.io/vipapi/{lowercase-coin-abbr}/address/{address}?apikey={apikey}
      else if (nw === "eth") {
        let data = await axios.get(
          `https://services.tokenview.io/vipapi/${nw}/address/${id.toLowerCase()}?apikey=${
            process.env.vTOKEN
          }`
        );

        let firstTx = await axios.get(
          `https://services.tokenview.io/vipapi/firsttx/${nw}/${id.toLowerCase()}?apikey=${
            process.env.vTOKEN
          }`
        );
        firstTx = firstTx.data.data.time;

        // no last tx api for eth
        data.data.data.first = firstTx;
        transaction = {
          addr: id,
          network: nw,
          source: 0,
          data: data.data.data,
          flag: prevFlag || flag,
          title: prevTitle || title,
          remark: prevRemark || "",
          date: Date.now(),
          boardID: id,
        };
        dbStatus = await addTransaction(transaction);
        return res.status(200).json({
          dbStatus,
          message: "Successfully Retrieved",
          network: nw,
          data: transaction,
        });

        // return res.status(200).json({ message: "Successfully Retrieved", network: nw, data: transaction })
      } else if (nw === "btc") {
        let data = await axios.get(
          `https://services.tokenview.io/vipapi/address/${nw}/${id}/1/50?apikey=${process.env.vTOKEN}`
        );
        let ndata = data.data.data[0];
        ndata.balance = parseFloat(ndata.receive) + parseFloat(ndata.spend);

        transaction = {
          addr: id,
          network: nw,
          source: 0,
          data: ndata,
          flag: prevFlag || flag,
          title: prevTitle || title,
          remark: prevRemark || "",
          date: Date.now(),
          boardID: id,
        };

        dbStatus = await addTransaction(transaction);
        return res.status(200).json({
          dbStatus,
          message: "Successfully Retrieved",
          network: nw,
          data: transaction,
        });
      } else {
        return res
          .status(200)
          .json({ message: "Address Incorrect", network: nw });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  };

  //search transaction title
  showTitleList = async (req, res) => {
    try {
      const foundTransaction = await Transactions.find({}).sort({ date: -1 });
      if (!foundTransaction) {
        return res.status(400).json({
          message: "No transaction found",
          foundTransaction: foundTransaction,
        });
      }
      return res.status(200).json({
        message: "Successfully changed title",
        foundTransaction: foundTransaction,
      });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  };

  //change transaction title
  changeTitle = async (req, res) => {
    console.log(req.body);
    try {
      const id = req.params.id;
      const title = req.body.title;
      const boardID = req.body.boardID;
      const previousTransaction = await Transactions.findOne({ addr: id }).sort(
        { date: -1 }
      );
      if (!previousTransaction) {
        return res.status(400).json({
          message: "No transaction found",
          previousTransaction: previousTransaction,
        });
      }
      previousTransaction.title = title;
      previousTransaction.boardID = boardID;
      await previousTransaction.save();
      return res.status(200).json({
        message: "Successfully changed title",
        previousTransaction: previousTransaction,
      });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  };

  //addRemark
  addRemark = async (req, res) => {
    try {
      const id = req.params.id;
      const remark = req.body.remark;
      const transaction = await Transactions.findOne({ addr: id }).sort({
        date: -1,
      });
      transaction.remark = remark;
      await transaction.save();
      return res.status(200).json({ "Added remark": remark });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ error: err });
    }
  };

  getRisk = async (req, res) => {
    try {
      const address = req.params.id;

      if (!address) {
        return res.status(404).json({ error: "Address not valid" });
      }

      const nw = this.checkBlockchainAddress(address);
      let payload = {};
      if (nw === "eth") {
        payload = {
          ethAddresses: [address],
        };
      } else if (nw === "btc") {
        payload = {
          btcAddresses: [address],
        };
      } else {
        return res.status(404).json({ error: "Only for ETH and BTC networks" });
      }
      // console.log(`${nw}address: ${address}`);

      const url = "https://risk.charybdis.januus.io/";

      const axiosConfig = {
        method: "POST",
        url: url,
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      };

      const response = await axios(axiosConfig);
      const jsonResponse = response.data;

      res.status(200).json({ mdata: jsonResponse });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        res.status(400).json({ error: "RequestedNullReport" });
      } else if (error.response && error.response.status === 500) {
        res.status(500).json({ error: "EndPointException" });
      } else {
        console.error("Error fetching risk report:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  };

  async exchangeFallback(from_currency, to_currency) {
    const options = {
      method: "GET",
      url: "https://currency-exchange.p.rapidapi.com/exchange",
      params: {
        from: from_currency,
        to: to_currency,
        q: "1.0",
      },
      headers: {
        "X-RapidAPI-Key": process.env.cTOKEN,
        "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    // console.log(response.data);
    return response.data;
  }

  getExchangeRate = async (req, res) => {
    try {
      let { from_currency, to_currency } = req.params;
      from_currency = from_currency.toUpperCase();
      to_currency = to_currency.toUpperCase();

      const isFromCurrencyValid = await checkCurrencyInCSV(
        from_currency,
        "digital_currency_list.csv"
      );
      const isToCurrencyValid = await checkCurrencyInCSV(
        to_currency,
        "physical_currency_list.csv"
      );

      if (!isFromCurrencyValid || !isToCurrencyValid) {
        return res.status(400).json({ error: "Invalid currency selection" });
      }
      // hit api 1
      const resp = await axios.get(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from_currency}&to_currency=${to_currency}&apikey=${process.env.aTOKEN}`
      );
      let data = null;

      // console.log("Note", resp.data)
      if (resp.data.Note != undefined || resp.data.Information != undefined) {
        // console.log("api2 called")
        data = await this.exchangeFallback(from_currency, to_currency);
      } else {
        // console.log("api1 called")
        data = resp.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
      }
      return res.status(200).json({
        message: "Successfully Retrieved",
        exRate: data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "An error occurred" });
    }
  };

  //tracking address
  setWebhookUrl = async (req, res) => {
    try {
      // Endpoint URL for setting the webhook URL
      const endpointUrl = `https://services.tokenview.io/vipapi/monitor/setwebhookurl?apikey=${process.env.vaTOKEN}`;
      // const webhookUrl = "https://648b-103-120-31-178.ngrok-free.app/webhook";
      const webhookUrl = "https://1ec4-150-242-199-99.ngrok.io/webhook";
      console.log(webhookUrl);
      // Set up the POST request
      const axiosConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/text",
        },
        url: endpointUrl,
        data: webhookUrl,
      };

      const response = await axios(axiosConfig);
      const jsonResponse = response.data;
      console.log(jsonResponse);
      const addressData = await AddressTracker.find()
        .sort({ _id: -1 })
        .limit(1);
      return res.status(200).json({ data: addressData });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "An error occurred" });
    }
  };
  getWebhookUrl = async (req, res) => {
    try {
      // Endpoint URL for setting the webhook URL
      const endpointUrl = `https://services.tokenview.io/vipapi/monitor/getwebhookurl?apikey=${process.env.vaTOKEN}`;
      const response = await axios.get(endpointUrl);
      const jsonResponse = response.data;
      return res.status(200).json({ data: jsonResponse });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "An error occurred" });
    }
  };
  addTrackingAddr = async (req, res) => {
    try {
      const id = req.params.id;
      const nw = this.checkBlockchainAddress(id);
      if (nw === "tron") {
        nw = "trx";
      }
      let response = await axios.get(
        `https://services.tokenview.io/vipapi/monitor/address/add/${nw}/${id}?apikey=${process.env.vaTOKEN}`
      );
      const jsonResponse = response.data;
      return res.status(200).json({ data: jsonResponse });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };
  removeTrackingAddr = async (req, res) => {
    try {
      const id = req.params.id;
      const nw = this.checkBlockchainAddress(id);
      if (nw === "tron") {
        nw = "trx";
      }
      let response = await axios.get(
        `https://services.tokenview.io/vipapi/monitor/address/remove/${nw}/${id}?apikey=${process.env.vaTOKEN}`
      );
      const jsonResponse = response.data;
      return res.status(200).json({ data: jsonResponse });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };

  showTrackedAddresses = async (req, res) => {
    try {
      const nw = req.params.nw;
      if (nw === "tron") {
        nw = "trx";
      }
      let response = await axios.get(
        `https://services.tokenview.io/vipapi/monitor/address/list/${nw}?page=0&apikey=${process.env.vaTOKEN}`
      );
      let jsonResponse = response.data;
      jsonResponse.network = nw;
      return res.status(200).json({ data: jsonResponse });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  };

  storage = multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const randomString = crypto.randomBytes(3).toString("hex");
      // const filename = `${Date.now()}_${randomString}${ext}`;
      const filename = `screenshot.png`;
      req.body.mime_type = file.mimetype;
      req.body.filename = filename;
      cb(null, filename);
    },
  });

  upload = multer({
    storage: this.storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith("image")) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Only image formats allowed!"));
      }
    },
  }).single("img");

  custMulter = (req, res, next) => {
    this.upload(req, res, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
      }
      next();
    });
  };

  async sendEmail2(toEmail) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAILPASS,
      },
    });

    // // await user.save();
    // // Schedule a task to set otp to null after 3 minutes
    // setTimeout(async () => {
    //   // console.log("setting otp to null")
    //   user.otp = null;
    //   await user.save();
    //   // console.log("done")
    // }, 3 * 60 * 1000); // 3 minutes in milliseconds

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"No Reply" <Support>`, // sender address
      to: toEmail, // list of receivers
      subject: "Investigation Screen Shot", // Subject line
      attachments: [
        {
          // file on disk as an attachment
          // filename: "ss.png", // name of the file as it should appear in the email
          filename: "screenshot.png", // name of the file as it should appear in the email
          path: "../server/uploads/screenshot.png", // path to the file on disk
        },
      ],

      // check if this can be dynamic
    });

    console.log(`Message sent: ${info.messageId}`);
  }

  storeSnap = async (req, res) => {
    try {
      // use uploaded file
      if (!req.file) {
        return res.status(400).json({
          status: 0,
          message: "CSV file not found in the request",
        });
      }
      const { email } = req.body;

      const filePath = req.file.path;
      const fileMimeType = req.file.mimetype;

      console.log("the email", email);

      // send email
      await this.sendEmail2(email);

      console.log("email sent with attachment");

      return res.status(200).json({
        status: 1,
        message: "File uploaded successfully",
        path: filePath,
        mime_type: fileMimeType,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  CheckScamData = async (req, res) => {
    const address = req.params.address;
    try {
      const response = await axios.get(
        `https://scamsearch.io/api/search?search=${address}&type=all&api_token=${process.env.SCAM_SEARCH}`
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.log(`${error} ERROR_SCAM_DATA_API`);
      res.status(500).send("An error occurred while trying to fetch the data");
    }
  };

  //save board
  saveBoard = async (req, res) => {
    try {
      const { boardId, graphData } = req.body;
      console.log(boardId, graphData);
      const board = new Boards({ boardId, graphData });
      await board.save();
      return res.status(200).json({ message: "saved successfully", board });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  };

  //get board data
  getBoard = async (req, res) => {
    try {
      const { boardId } = req.body;
      const board = await Boards.findOne({ boardId: boardId });
      if (!board) {
        return res.status(404).json({ message: "board not found" });
      }
      return res.status(200).json({ message: "found board", board });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  };

  //Complaint routes
  // Create a new report
  createComplaint = async (req, res) => {
    try {
      const newReport = new Complaints(req.body);
      const savedReport = await newReport.save();
      res.status(201).json(savedReport);
    } catch (error) {
      res.status(400).json({ error: "Failed to create report" });
    }
  };

  // Update an existing report by ID
  updateComplaint = async (req, res) => {
    try {
      const { transactionId } = req.params;
      // console.log(transactionId)
      const updatedReport = await Complaints.findOneAndUpdate(
        { transactionId },
        req.body,
        { new: true }
      );
      if (!updatedReport) {
        return res.status(404).json({ error: "Report not found" });
      }
      res.json(updatedReport);
    } catch (error) {
      res.status(400).json({ error: "Failed to update report" });
    }
  };
}

module.exports = BlockController;
