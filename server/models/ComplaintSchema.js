const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  data: { type: mongoose.Schema.Types.Mixed, required: true },
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
