// models/Instructor.js
const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  paymentHistory: [
    {
      cvv: String,
      accountNumber: String,
      amount: Number,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Instructor = mongoose.model("Instructor", instructorSchema);

module.exports = Instructor;
