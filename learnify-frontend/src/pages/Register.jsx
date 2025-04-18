import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Register.css";
import Navbar from "../components/Navbar";
import LearnifyImage from "./learnify-illustration.jpg";

const Register = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const defaultRole = params.get("role") || "student";

  const [user, setUser] = useState({
    email: "",
    password: "",
    role: defaultRole,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registered successfully!");
        // send them to login with same role
        navigate(`/login?role=${defaultRole}`);
      } else {
        setError(data.msg || "Registration failed");
      }
    } catch (err) {
      console.error("Error during registration:", err);
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
          <h2>
            {defaultRole === "instructor"
              ? "Instructor Sign Up"
              : "Welcome to Learnify!"}
          </h2>
          {defaultRole === "instructor" && (
            <p>Create your instructor account and start teaching 💡</p>
          )}
        </div>
        <div className="right-panel">
          <div className="register-card">
            <form onSubmit={handleRegister} className="register-form">
              <input
                type="email"
                placeholder="Email Address"
                required
                value={user.email}
                onChange={(e) =>
                  setUser({ ...user, email: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={user.password}
                onChange={(e) =>
                  setUser({ ...user, password: e.target.value })
                }
              />
              {/* Hidden role field */}
              <input type="hidden" value={user.role} />
              <button type="submit">Register</button>
              {error && <p className="error-msg">{error}</p>}
            </form>
            <p className="bottom-text">
              Already have an account?{" "}
              <a href={`/login?role=${defaultRole}`}>Login</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
