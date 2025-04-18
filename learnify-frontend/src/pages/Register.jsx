import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Navbar from "../components/Navbar";
import LearnifyImage from "./learnify-illustration.jpg"; // 👈 Import image

const Register = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registered successfully!");
        navigate("/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An error occurred during registration");
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-wrapper">
        <div className="left-panel">
          <img
            src={LearnifyImage}
            alt="Learnify Visual"
            className="illustration"
          />
          <h2>Welcome to Learnify!</h2>
          <p>Empowering your learning journey with AI-powered education 💡</p>
        </div>
        <div className="right-panel">
          <div className="register-card">
            <h2>Create Account</h2>
            <form onSubmit={handleRegister} className="register-form">
              <input
                type="email"
                placeholder="Email Address"
                required
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <button type="submit">Register</button>
              {error && <p className="error-msg">{error}</p>}
            </form>
            <p className="bottom-text">
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
