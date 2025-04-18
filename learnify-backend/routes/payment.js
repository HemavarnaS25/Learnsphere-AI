// routes/payment.js
const express = require("express");
const Instructor = require("../models/Instructor");

const router = express.Router();

router.post("/payment", async (req, res) => {
  const { cvv, accountNumber, amount, instructorEmail } = req.body;

  try {
    // Find the instructor by email
    const instructor = await Instructor.findOne({ email: instructorEmail });
    
    if (!instructor) {
      return res.status(404).json({ success: false, message: "Instructor not found" });
    }

    // Save the payment information to the instructor's payment history
    instructor.paymentHistory.push({
      cvv,
      accountNumber,
      amount,
      date: new Date(),
    });
    
    // Save the instructor record with the updated payment history
    await instructor.save();

    // Here you can also integrate with a real payment gateway (e.g., Stripe)
    // For now, assume the payment is successful
    res.json({ success: true, message: "Payment processed successfully!" });
  } catch (err) {
    console.error("Error processing payment:", err);
    res.status(500).json({ success: false, message: "An error occurred while processing the payment" });
  }
});

module.exports = router;
