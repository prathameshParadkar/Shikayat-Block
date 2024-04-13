const jwt = require("jsonwebtoken");

const express = require("express");
const { connections } = require("../app");
const { emitMessage } = require("../util");
const router = express.Router();

// my file is in test/jps-ss.png
const mfile =
  // const io = require("../app");
  // const { io } = require("../app.js");

  require("../db/Conn");
// const User = require("../models/Schema");
const User = require("../models/UserSchema");

const isDM = true;

const handleIngestForm = (req, res) => {
  const formData = FormData();
  res.send("here");
};

const handleComplaintRegistered = (req, res) => {
  console.log("complaint_registered");
  res.send("complaint_registered");
};

const handleComplaintCreated = async (req, res) => {
  const data = req.body;

  const user = await User.findById(data.user_id);
  // console.log("user", user);
  if (!("events" in user)) {
    user.events = [];
  }
  user.events.push(data);
  user.save();
  console.log("complaint_created");
  // emit to front end too
  res.json({
    message: "complaint_created",
  });
};

const handleAddFile = (req, res) => {
  res.send("add_file");
};

const handleComplaintUpdate = (req, res) => {
  const data = {
    event_id: "eg_1",
    event_type: "new_complaint_added",
    user_id: userId,
    event_created_date: " 2017-01-01 14:56:00",
    complaint_updated_at: " 2017-01-02 14:56:00",
    complaint_status: " open",
    complaint_type: " complaint",
    complaint_created_by: " user_id",
    reporting_agency: " police",
    complaint_documents: "<url of marksheet or the actual marksheet>",
    agency_documents: "<optional field if agency responds with a document>",
    complaint_title: "Lost Original Marsheet",
    complaint_description:
      " My original copy of marksheet has been lost. I want a new one.",
    complaint_created_date: " 2017-01-01 14:58:00",
    agency_response:
      "We are verifying your details. A department official will contact you shortly.",
  };
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
      handleComplaintUpdate(req, res);
      break;
    default:
      console.log("default");
      res.send("default");
  }
});

module.exports = router;

// sign jwt and return []
