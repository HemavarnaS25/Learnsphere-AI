import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Navbar from "../components/Navbar";
import LearnifyImage from "./login.jpg";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // detect role from URL, default to "student"
  const params = new URLSearchParams(location.search);
  const defaultRole = params.get("role") || "student";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        input
      );
      
      // store auth
      sessionStorage.setItem("isAuth", "true");
      sessionStorage.setItem("user", res.data.email);
      sessionStorage.setItem("role", res.data.role);

      // navigate based on returned role
      if (res.data.role === "instructor") {
        navigate("/instructor-dashboard");
      } else {
        navigate("/student-dashboard");
      }
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
          <h2>{defaultRole === "instructor" ? "Instructor Sign In" : "Welcome Back to Learnify!"}</h2>
          {defaultRole === "instructor" && (
            <p>Login with your instructor credentials 🎓</p>
          )}
        </div>
        <div className="right-panel">
          <div className="login-card">
            <form onSubmit={handleLogin} className="login-form">
              <input
                type="email"
                placeholder="Email Address"
                value={input.email}
                required
                onChange={(e) =>
                  setInput({ ...input, email: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Password"
                value={input.password}
                required
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
              />
              <button type="submit">Sign In</button>
              {error && <p className="error-msg">{error}</p>}
            </form>
            <p className="bottom-text">
              Don’t have an account?{" "}
              <a href={`/register?role=${defaultRole}`}>Register here</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
