const express = require("express");
// blockchain router
const blockR = express.Router();

let blockC = require("../controllers/Block");

blockC = new blockC();

blockR.get("/:id", blockC.test);
blockR.post("/title/:id", blockC.changeTitle);
blockR.get("/get/list", blockC.showTitleList);
blockR.post("/remark/:id", blockC.addRemark);
blockR.get("/risk/:id", blockC.getRisk);
blockR.get("/exchange/:from_currency/:to_currency", blockC.getExchangeRate);
blockR.post("/board/save", blockC.saveBoard);
blockR.post("/board/get", blockC.getBoard);
blockR.get("/set/webhookUrl", blockC.setWebhookUrl);
blockR.post("/snap", blockC.custMulter, blockC.storeSnap);
blockR.get("/get/webhookUrl", blockC.getWebhookUrl);
blockR.get("/add/address/:id", blockC.addTrackingAddr);
blockR.get("/remove/address/:id", blockC.addTrackingAddr);
blockR.get("/show/address/:nw", blockC.showTrackedAddresses);
blockR.get("/scam/:address", blockC.CheckScamData);

blockR.post("/complaint/create", blockC.createComplaint);
blockR.post("/complaint/update/:transactionId", blockC.updateComplaint); 

// blockR.post("/", async (req, res) => {
//     console.log("test set", req.body)
//     console.log("here in block");
//     const newAddr = new AddressTracker({ data: req.body })
//     await newAddr.save();
//     return res.status(200).json("ok")
// });






module.exports = blockR;

