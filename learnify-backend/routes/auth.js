const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();    // ← define router here

// Register route
router.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    // pass along role (student or instructor)
    const newUser = new User({
      email,
      password: hashedPassword,
      role: role || "student",
    });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully", role: newUser.role });
  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Login route
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid email or password" });

    // return their role so front‐end can redirect appropriately
    res.status(200).json({
      msg: "Login successful",
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;      // ← export it here
