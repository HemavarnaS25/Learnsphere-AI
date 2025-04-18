const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  cvv: { type: String, required: true },
  accountNumber: { type: String, required: true },
  amount: { type: Number, required: true },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true },
  date: { type: Date, default: Date.now },
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
