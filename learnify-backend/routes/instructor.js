// routes/instructor.js
const express = require("express");
const Course = require("../models/Course");
const User = require("../models/User");

const router = express.Router();

router.get("/dashboard", async (req, res) => {
  try {
    const { email } = req.query;

    const instructor = await User.findOne({ email, role: "instructor" });
    if (!instructor) return res.status(403).json({ msg: "Unauthorized" });

    const allStats = await Course.aggregate([
      {
        $project: {
          instructor: 1,
          numEnrolled: { $size: "$studentsEnrolled" },
          income: { $multiply: ["$price", { $size: "$studentsEnrolled" }] },
        },
      },
      {
        $group: {
          _id: "$instructor",
          totalEnrolled: { $sum: "$numEnrolled" },
          totalIncome: { $sum: "$income" },
        },
      },
      { $sort: { totalEnrolled: -1 } },
    ]);

    const idx = allStats.findIndex((a) =>
      a._id.toString() === instructor._id.toString()
    );
    const yourStats =
      idx >= 0 ? allStats[idx] : { totalEnrolled: 0, totalIncome: 0 };
    const rank = idx >= 0 ? idx + 1 : null;

    const courses = await Course.find({ instructor: instructor._id })
      .populate("studentsEnrolled", "email")
      .lean();

// POST /api/instructor/add-course
router.post("/add-course", async (req, res) => {
    try {
      const { title, description, courseId, price, instructorEmail } = req.body;
  
      const instructor = await User.findOne({ email: instructorEmail, role: "instructor" });
      if (!instructor) return res.status(403).json({ msg: "Unauthorized" });
  
      const newCourse = new Course({
        title,
        description,
        courseId,
        price,
        instructor: instructor._id,
        studentsEnrolled: [],
        lectures: []
      });
  
      await newCourse.save();
      res.status(201).json({ msg: "Course added successfully", course: newCourse });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error" });
    }
  });
  
    return res.json({
      totalEnrolled: yourStats.totalEnrolled,
      totalIncome: yourStats.totalIncome,
      rank,
      courses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
