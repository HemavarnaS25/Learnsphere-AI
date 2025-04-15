// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Navbar from "../components/Navbar";

const Register = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem(user.email, JSON.stringify(user));
    alert("Registered successfully!");
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <h2>Register to Learnify</h2>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
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
        </form>
      </div>
    </>
  );
};

export default Register;
