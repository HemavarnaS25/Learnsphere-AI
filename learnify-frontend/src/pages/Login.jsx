// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Navbar from "../components/Navbar";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem(input.email));
    if (
      storedUser &&
      input.email === storedUser.email &&
      input.password === storedUser.password
    ) {
      sessionStorage.setItem("isAuth", "true");
      sessionStorage.setItem("user", input.email);
      navigate("/student-dashboard"); // or instructor based on role
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <h2>Login to Learnify</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
