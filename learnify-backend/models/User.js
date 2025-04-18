const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student","instructor"],
    required: true,
    default: "student",
  },
});

module.exports = mongoose.model("User", userSchema);
