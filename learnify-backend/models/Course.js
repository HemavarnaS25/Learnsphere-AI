// models/Course.js
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title:          { type: String, required: true },
  courseId:       { type: String, required: true, unique: true },
  lectures:       [{ type: String }],               // list of lecture titles
  price:          { type: Number, required: true }, // price per student
  instructor:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt:      { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", courseSchema);
