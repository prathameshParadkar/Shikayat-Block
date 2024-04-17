const jwt = require("jsonwebtoken");

const express = require("express");
const { connections } = require("../app");
const { emitMessage } = require("../util");
const router = express.Router();
// const User = require("../models/UserSchema");
const Complaints = require("../models/MComplaintSchema");
// const { sendMessageDesc } = require("./Auth");
const { sendMessageDesc } = require("./mutils");
// my file is in test/jps-ss.png
const mfile =
  // const io = require("../app");
  // const { io } = require("../app.js");

  require("../db/Conn");
// const User = require("../models/Schema");
const User = require("../models/UserSchema");
const Complaint = require("../models/MComplaintSchema");

const sendMessageTo = async (data) => {
  console.log("send to ", data);
  const { user_id, event_type, complaint_status, statusType } = data;

  // status is null
  console.log("sendMessageTo", user_id, event_type, complaint_status);
  const user = await User.findById(user_id);
  const phone = user.phone ?? "7977323368";
  console.log("phone", phone);
  switch (event_type) {
    case "new_complaint_added":
      sendMessageDesc(
        phone,
        "Complaint Registered Successfully!",
        complaint_status,
        "success"
      );
      console.log('complaint_updated message sent')
      // send sms
      break;
    case "complaint_updated":
      sendMessageDesc(
        phone,
        "You've got an update on your complaint!",
        complaint_status,
        statusType
      );
      // send sms
      console.log('complaint_updated message sent')
      break;
  }


};

const isDM = false;

const handleIngestForm = (req, res) => {
  const formData = FormData();
  res.send("here");
};

const handleComplaintRegistered = (req, res) => {
  console.log("complaint_registered");
  res.send("complaint_registered");
};

const handleComplaintCreated = async (req, res) => {
  try {
    {
      let data = req.body;
      console.log("data her ", data);
      if (isDM && false) {
        data = {
          event_id: "eg_1",
          event_type: "new_complaint_added",
          user_id: "65c80f95cd4231f66167ae95",
          tx_hash: "txHash",
          sender_address: "receipt.sender_address",
          complaint_title: "title",
          complaint_id: "finalId",
          event_created_date: " 2017-01-01 14:56:00",
          complaint_updated_at: " 2017-01-02 14:56:00",
          complaint_status: " open",
          complaint_type: " complaint",
          complaint_created_by: " user_id",
          reporting_agency: " police",
          complaint_documents: "<url of marksheet or the actual marksheet>",
          agency_documents:
            "<optional field if agency responds with a document>",
          complaint_description:
            " My original copy of marksheet has been lost. I want a new one.",
          complaint_created_date: " 2017-01-01 14:58:00",
          agency_response:
            "We are verifying your details. A department official will contact you shortly.",
          complaint_group_id: "test",
          complaint_id: "fetre why this here",
        };
      }

      const complaint = new Complaint({
        data: data,
        user_id: data.user_id,
        complaint_id: data.complaint_id,
        complaint_group_id: data.complaint_group_id ?? data.complaint_id,
      });
      complaint.save();
      console.log("complaint_created");
      return res.json({
        message: "complaint_created",
      });

      let complaint_group_id = data.complaint_group_id ?? data.complaint_id;
      let complaint_id = data.complaint_id;

      const user = await User.findById(data.user_id);
      console.log("user", user.name);
      // console.log("user", user);
      if (!("events" in user)) {
        user.events = [];
      }
      if (!user.complaints) {
        console.log("no complaints");
        user.complaints = {};
      }
      let cc = user.complaints;

      if (!cc[complaint_group_id]) {
        console.log("not group_com");
        cc[complaint_group_id] = [];
        console.log("user.complaints", cc);
      }

      cc[complaint_group_id].push(complaint_id);
      user.complaints = cc;

      console.log("user.complaints cp2", user.complaints);

      console.log("user  complaint_group_id");

      // user.complaints = {
      //   0: [9, 4],
      //   11: [4, 6],
      // };
      user.events.push(data);
      user.save();
      console.log("complaint_created");
      // emit to front end too
      res.json({
        message: "complaint_created",
      });
    }
  } catch (error) {
    console.log("error", error);
    // res.status(500).json("error", error);
    res.json({ status: 0 });
  }
};

const handleAddFile = (req, res) => {
  res.send("add_file");
};

// const { sendMessageDesc } = require("./Auth");

const handleComplaintUpdate = async (req, res) => {
  const data = req.body;
  console.log("req.body", req.body);
  const complaint = new Complaints({
    data: data,
    user_id: data.user_id,
    complaint_id: data.complaint_id,
    complaint_group_id: data.complaint_group_id ?? data.complaint_id,
  });
  await complaint.save();
  console.log("complaint_update");
  res.send("complaint_update");
  emitMessage("complaint_update");

  // update here
  return;
  if (connections) {
    console.log("io is not null");
    const client = connections[0];

    client.send("complaint_update");
  } else {
    console.log("io is null");
  }
  // io.emit("complaint_update", { data: "complaint_update" });
};

router.post("/", async (req, res) => {
  try {
    const sampleBody =
      '{"event_id":"eg_1","event_type":"complaint_update","event_created_date":"2017-01-01 14:56:00","complaint_updated_at":"2017-01-02 14:56:00","complaint_status":"open","complaint_type":"complaint","complaint_created_by":"user_id","reporting_agency":"police","complaint_documents":"<url_of_marksheet_or_the_actual_marksheet>","agency_documents":"<optional_field_if_agency_responds_with_a_document>","complaint_title":"Lost Original Marsheet","complaint_description":"My original copy of marksheet has been lost. I want a new one.","complaint_created_date":"2017-01-01 14:58:00","agency_response":"We are verifying your details. A department official will contact you shortly."}';
    const sampleBodyObj = JSON.parse(sampleBody);
    // res.send("Hello world from the server rotuer js");

    const {
      event_id,
      event_type,
      event_created_date,
      complaint_updated_at,
      complaint_status,
      complaint_type,
      complaint_created_by,
      reporting_agency,
      complaint_documents,
      agency_documents,
      complaint_title,
      complaint_description,
      complaint_created_date,
      agency_response,
    } = req.body;

    sendMessageTo(req.body);

    switch (event_type) {
      case "ingest_form":
        handleIngestForm(req, res);
        break;
      case "complaint_registered":
        handleComplaintRegistered(req, res);
        break;
      case "complaint_created":
      case "new_complaint_added":
        handleComplaintCreated(req, res);
        break;
      // case "complaint_update":
      //   console.log("complaint_update");
      //   break;
      // case "complaint_created":
      //   console.log("complaint_created");
      //   break;
      // case "complaint_closed":
      //   console.log("complaint_closed");
      //   break;
      case "add_file":
        handleAddFile(req, res);
        break;
      case "complaint_update":
      case "complaint_updated":
        handleComplaintUpdate(req, res);
        break;
      default:
        console.log("default");
        res.send("default");
        break;
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

module.exports = router;

// sign jwt and return []
