const express = require("express");
const Course = require("../models/Course");
const User = require("../models/User");
const router = express.Router();

router.post("/add-course", async (req, res) => {
  try {
    const {
      title, description, courseId, price, instructorEmail,
      instructorName, modules, videoLink, quizzes, exam, certificationTitle
    } = req.body;

    const instructor = await User.findOne({ email: instructorEmail, role: "instructor" });
    if (!instructor) return res.status(403).json({ msg: "Unauthorized" });

    const newCourse = new Course({
      title,
      description,
      courseId,
      price,
      instructor: instructor._id,
      instructorName,
      modules,
      videoLink,
      quizzes,
      exam,
      certification: { title: certificationTitle }
    });

    await newCourse.save();
    res.status(201).json({ msg: "Course added successfully", course: newCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
