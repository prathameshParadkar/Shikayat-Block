const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  data: { type: mongoose.Schema.Types.Mixed, required: true },
});

const Complaint = mongoose.model("OComplaint", complaintSchema);

module.exports = Complaint;
