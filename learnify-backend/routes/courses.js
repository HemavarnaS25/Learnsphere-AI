const express = require("express");
const Course  = require("../models/Course");
const User    = require("../models/User");
const router  = express.Router();

// Helper: get user by email (you could swap for real auth middleware)
async function findUser(email) {
  return await User.findOne({ email });
}

// POST /api/courses
// { title, courseId, lectures: [ "Intro", "Setup", ... ], instructorEmail }
router.post("/courses", async (req, res) => {
  try {
    const { title, courseId, lectures, instructorEmail } = req.body;
    const instructor = await findUser(instructorEmail);
    if (!instructor || instructor.role !== "instructor") {
      return res.status(403).json({ msg: "Only instructors can add courses" });
    }

    const existing = await Course.findOne({ courseId });
    if (existing) {
      return res.status(400).json({ msg: "courseId already in use" });
    }

    const course = new Course({
      title,
      courseId,
      lectures,
      instructor: instructor._id,
    });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/instructor/courses?email=foo
router.get("/instructor/courses", async (req, res) => {
  try {
    const { email } = req.query;
    const instructor = await findUser(email);
    if (!instructor || instructor.role !== "instructor") {
      return res.status(403).json({ msg: "Unauthorized" });
    }
    const courses = await Course.find({ instructor: instructor._id })
      .populate("studentsEnrolled", "email")
      .lean();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/courses
// public: returns all courses (for students)
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "email")
      .lean();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
