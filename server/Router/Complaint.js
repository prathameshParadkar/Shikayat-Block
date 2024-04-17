const express = require("express");
const multer = require("multer");
const { upload } = require("../app");
const complaintR = express.Router();
require("dotenv").config();
const saveFile = require("./Utils");
const axios = require("axios");

const isDM = false;

const {
  getAuthorityFromComplaint,
  getPriorityFromComplaint,
} = require("../utils/utils");
const Complaint = require("../models/MComplaintSchema");

const getGrouped = (complaints) => {
  console.log("Complaints from get grouped : ", complaints);
  const uniqueGIDS = new Set();
  complaints.forEach((complaint) => {
    uniqueGIDS.add(complaint.data.complaint_group_id);
  });

  const resData = [];

  for (let gid of uniqueGIDS) {
    console.log("GID: ", gid);
    if (!gid) continue;
    // const groupedComplaints = await Complaint.find({ complaint_group_id: gid });
    const groupedComplaints = complaints.filter(
      (complaint) => complaint.data.complaint_group_id == gid
    );

    const data = [];
    groupedComplaints.forEach((complaint) => {
      data.push(complaint);
    });

    resData.push({
      complaint_group_id: gid,
      complaints: data,
    });

    console.log("resData: ", resData);
  }
  return resData;
};

complaintR.get("/get_complaints", async (req, res) => {
  const userID = req.userID;
  const userRole = req.userRole;
  let complaints;
  if (userRole != "citizen") {
    // complaints = await Complaint.find();
    complaints = await Complaint.find();
    console.log("Complaints: ", complaints);
    // return res.json(allComplaints);
  } else {
    complaints = await Complaint.find();
    complaints = complaints.filter((complaint) => {
      return complaint.user_id == userID;
    });
    // { user_id: userID }
  }
  const resData = getGrouped(complaints);

  res.json({
    data: resData,
  });

  // res.json(complaints);
});

// get complaint
complaintR.get("/get_complaints/:id", async (req, res) => {
  const complaints = await Complaint.find();

  const resData = getGrouped(complaints);
  console.log("ResData: from get id", resData);
  console.log("params: ", req.params.id);
  const newArr = [];
  resData.forEach((group) => {
    group.complaints.forEach((complaint) => {
      console.log("Complaint: from loop ", complaint);
      if (complaint.data.complaint_group_id == req.params.id) {
        newArr.push(complaint);
      }
    });
  });
  // console.log();
  // const rdata = resData.filter(
  //   (complaint) =>
  //     {
  //       console.log("Complaint: ", complaint);
  //       return complaint["complaint_group_id"] === 25
  //     }
  // );

  // get id
  const mcomplaint = resData.sort((a, b) => {
    return a.complaint_group_id - b.complaint_group_id;
  });

  console.log("Complaint 103", mcomplaint[0].complaints[0]);

  // const complaint = await Complaint.findOne({ complaint_id: req.params.id })
  const complaint = await Complaint.findOne({
    _id: mcomplaint[0].complaints[0]._id,
  })
    .populate("user_id", "name email")
    .exec();

  // const groupedComplaints =

  // console.log("Complaint: 104 ", newArr);
  res.json({ complaint, gd: newArr });
});

complaintR.post("/create", upload.single("file"), async (req, res) => {
  const { complaint_title, complaint_description, authority, complaint_type } =
    req.body;

  console.log("body of create complaint", req.body);
  // const priority = await getPriorityFromComplaint(complaint_description);
  const priority = 2;
  const filePath = req.file.path;


  if (!filePath) {
    return res.status(400).json({ error: "No file path." });
  }

  let storedhash;
  if (!isDM) {
    storedhash = await saveFile(filePath);
  } else {
    storedhash = "test";
  }
  console.log("Response Stored Hash : ", storedhash);

  try {
    const response = await axios.post(
      "http://localhost:8080/blockchain/newComplaints",
      {
        userId: req.userID,
        // userId: "65c772a2b24737ce78451b52",
        subject: complaint_title,
        description: complaint_description,
        ipfs: storedhash,
        status: "Your complaint has been registered successfully",
        statusType: "success",
        priority: priority,
        authorityName: authority,
        complaintType: complaint_type,
      }
    );
    if (response.status === 200) {
      res.status(200).json("Added successfully");
    } else {
      res.status(400).json("Failed to add the complaint.");
    }
  } catch (err) {
    console.log("Error in Pardy:", err);
  }
});

complaintR.post("/get_authority", async (req, res) => {
  console.log(req.body);
  console.log("from router", req.body.complaint_description);
  const authorityName = await getAuthorityFromComplaint(
    req.body.complaint_description
  );
  res.send({
    authority: authorityName ?? "No authority found",
    complaint_description: req.body.complaint_description,
  });
});

complaintR.post("/get_authority", async (req, res) => {
  console.log(req.body);
  console.log("from router", req.body.complaint_description);
  const authorityName = await getAuthorityFromComplaint(
    req.body.complaint_description
  );
  res.send({
    authority: authorityName ?? "No authority found",
    complaint_description: req.body.complaint_description,
  });
});

module.exports = complaintR;
