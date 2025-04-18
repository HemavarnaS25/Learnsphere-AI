import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Navbar from "../components/Navbar";
import LearnifyImage from "./login.jpg"; // 👈 Import image from pages folder

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", input);
      sessionStorage.setItem("isAuth", "true");
      sessionStorage.setItem("user", res.data.email);
      navigate("/student-dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data?.msg || err.message);
      setError(err.response?.data?.msg || "Login failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-wrapper">
        <div className="left-panel">
          <img
            src={LearnifyImage}
            alt="Learnify Visual"
            className="illustration"
          />
          <h2>Welcome Back to Learnify!</h2>
          <p>Your AI-powered personalized learning space 🎓</p>
        </div>
        <div className="right-panel">
          <div className="login-card">
            <h2>Sign In</h2>
            <p className="subtitle">Login to your Learnify account</p>
            <form onSubmit={handleLogin} className="login-form">
              <input
                type="email"
                placeholder="Email Address"
                required
                onChange={(e) => setInput({ ...input, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
              />
              <button type="submit">Sign In</button>
              {error && <p className="error-msg">{error}</p>}
            </form>
            <p className="bottom-text">
              Don’t have an account? <a href="/register">Register here</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
