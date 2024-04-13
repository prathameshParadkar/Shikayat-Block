const express = require("express");
// blockchain router
const blockR = express.Router();

let blockC = require("../controllers/Block");
const AddressTracker = require("../models/AddressTracker");

blockC = new blockC();

blockR.get("/:id", blockC.test);
blockR.post("/title/:id", blockC.changeTitle);

blockR.get("/get/list", blockC.searchTitle);

blockR.get("/risk/:id", blockC.getRisk);
blockR.get("/exchange/:from_currency/:to_currency", blockC.getExchangeRate);
blockR.get("/set/webhookUrl", blockC.setWebhookUrl);
blockR.post("/snap", blockC.custMulter, blockC.storeSnap);
blockR.get("/get/webhookUrl", blockC.getWebhookUrl);
blockR.get("/add/address/:id", blockC.addTrackingAddr);
blockR.get("/remove/address/:id", blockC.addTrackingAddr);
blockR.get("/show/address/:nw", blockC.showTrackedAddresses);

blockR.post("/", async (req, res) => {
    console.log("test set", req.body)
    console.log("here in block");
    const newAddr = new AddressTracker({ data: req.body })
    await newAddr.save();
    return res.status(200).json("ok")
});






module.exports = blockR;

