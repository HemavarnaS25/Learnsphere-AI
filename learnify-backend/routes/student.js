const express = require("express");
const Course = require("../models/Course");
const router = express.Router();

router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch courses" });
  }
});

module.exports = router;
