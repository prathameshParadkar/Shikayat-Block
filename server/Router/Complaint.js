const express = require("express");
const multer = require("multer");
const { upload } = require("../app");
const complaintR = express.Router();
require("dotenv").config();
const saveFile = require("./Utils");
const axios = require("axios");

const {
  getAuthorityFromComplaint,
  getPriorityFromComplaint,
} = require("../utils/utils");

complaintR.post("/create", upload.single("file"), async (req, res) => {
  const { complaint_title, complaint_description, authority } = req.body;
  const priority = await getPriorityFromComplaint(complaint_description);

  const filePath = req.file.path;

  if (!filePath) {
    return res.status(400).json({ error: "No file path." });
  }

  const storedhash = await saveFile(filePath);
  console.log("Response Stored Hash : ", storedhash);

  try {
    const response = await axios.post(
      "http://localhost:8080/blockchain/newComplaints",
      {
        userId: req.userID,
        subject: complaint_title,
        description: complaint_description,
        ipfs: storedhash,
        priority: priority,
        authority: authority,
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
