const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");


// -------------------------------
// Create Complaint (Citizen)
// -------------------------------
router.post("/create", async (req, res) => {
  try {

    const complaint = new Complaint({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      status: "pending"
    });

    await complaint.save();

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating complaint",
      error: error.message
    });
  }
});


// -------------------------------
// Get All Complaints (Officer)
// With Optional Status Filter
// -------------------------------
router.get("/all", async (req, res) => {

  try {

    const { status } = req.query;

    let filter = {};

    if (status) {
      filter.status = status;
    }

    const complaints = await Complaint
      .find(filter)
      .sort({ createdAt: -1 });

    res.json(complaints);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching complaints",
      error: error.message
    });
  }

});


// -------------------------------
// Update Complaint Status (Officer)
// -------------------------------
router.put("/:id/status", async (req, res) => {

  try {

    const { status } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    res.json({
      message: "Complaint status updated successfully",
      complaint
    });

  } catch (error) {

    res.status(500).json({
      message: "Error updating complaint",
      error: error.message
    });

  }

  // -------------------------------
// Assign Officer to Complaint (Admin)
// -------------------------------
router.put("/:id/assign", async (req, res) => {
  try {
    const { officer } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { assignedOfficer: officer },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json({
      message: "Officer assigned successfully",
      complaint
    });

  } catch (error) {
    res.status(500).json({
      message: "Error assigning officer",
      error: error.message
    });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { title, description, location, department } = req.body;

    const complaint = new Complaint({
      title,
      description,
      location,
      department, // save department
      status: "pending"
    });

    await complaint.save();

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint
    });

  } catch (error) {
    res.status(500).json({ message: "Error creating complaint", error: error.message });
  }
});

});


module.exports = router;