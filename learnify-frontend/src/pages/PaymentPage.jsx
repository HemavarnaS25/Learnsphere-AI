// PaymentPage.jsx (Frontend)
import React, { useState } from "react";
import axios from "axios";
import "./PaymentPage.css"; // Style the page as needed

const PaymentPage = () => {
  const [cvv, setCvv] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const instructorEmail = localStorage.getItem("instructorEmail"); // Assumed instructor's email stored in localStorage

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentStatus("");

    try {
      const response = await axios.post("/api/payment", {
        cvv,
        accountNumber,
        amount,
        instructorEmail, // Sending instructor email to track payment history
      });

      if (response.data.success) {
        setPaymentStatus("Payment successful!");
      } else {
        setPaymentStatus("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentStatus("There was an error processing your payment.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-page-container">
      <h1>Payment for Course Enrollment</h1>

      <form onSubmit={handlePayment} className="payment-form">
        <div className="form-field">
          <label>Account Number</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label>CVV</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label>Amount</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Complete Payment"}
        </button>
      </form>

      {paymentStatus && <p className="payment-status">{paymentStatus}</p>}
    </div>
  );
};

export default PaymentPage;
