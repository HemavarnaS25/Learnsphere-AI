const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  courseId: String,
  price: Number,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  instructorName: String,
  modules: [String],
  videoLink: String,
  quizzes: [String],
  exam: String,
  certification: {
    title: String,
    issuedBy: { type: String, default: "Learnify" },
    dateIssued: { type: Date, default: Date.now }
  },
  studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  lectures: []
});

module.exports = mongoose.model("Course", CourseSchema);
