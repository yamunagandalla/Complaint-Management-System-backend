const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },
  department: { 
      type: String, 
      required: true 
      },

  status: {
    type: String,
    enum: ["pending", "in_progress", "resolved"],
    default: "pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Complaint", ComplaintSchema);