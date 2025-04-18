import React, { useState } from 'react';
import axios from 'axios';

const InstructorAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "http://localhost:5000/api/auth/login" : "http://localhost:5000/api/register";

    try {
      const res = await axios.post(endpoint, {
        email,
        password,
        role: "instructor" // 👈 Important for registration
      });

      alert(res.data.msg);
      if (res.data.role === "instructor") {
        localStorage.setItem("userRole", "instructor");
        localStorage.setItem("email", res.data.email);
        window.location.href = "/instructor-dashboard";
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong!");
    }
  };

  return (
    <div className="auth-box">
      <h2>{isLogin ? "Instructor Login" : "Instructor Signup"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', marginTop: "10px" }}>
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
      </p>
    </div>
  );
};

export default InstructorAuth;
