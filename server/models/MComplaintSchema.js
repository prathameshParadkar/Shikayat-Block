const mongoose = require("mongoose");

// Define Complaint schema
const complaintSchema = new mongoose.Schema({
  event_id: String,
  event_type: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER", // Reference to the User model
  },
  data: Object,
  tx_hash: String,
  sender_address: String,
  complaint_title: String,
  complaint_id: String,
  event_created_date: Date,
  complaint_updated_at: Date,
  complaint_status: String,
  complaint_type: String,
  complaint_created_by: String,
  reporting_agency: String,
  complaint_documents: String, // Assuming URLs of documents are stored
  agency_documents: String, // Optional field if agency responds with a document
  complaint_description: String,
  complaint_created_date: Date,
  agency_response: String,
  complaint_group_id: String,
});

// Create Complaint model
const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
