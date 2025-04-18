// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import InstructorDashboard from './pages/InstructorDashboard';
import StudentDashboard from './pages/StudentDashboard';
import UploadCourse from './pages/UploadCourse';
import CourseGenerator from './pages/CourseGenerator';
import CourseViewer from './pages/CourseViewer';
import Scoreboard from './pages/Scoreboard';
import Chatbot from './pages/Chatbot';
import PaymentPage from './pages/PaymentPage'; // 💖 New Payment Module

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/upload-course" element={<UploadCourse />} />
      <Route path="/generate-course" element={<CourseGenerator />} />
      <Route path="/view-course" element={<CourseViewer />} />
      <Route path="/scoreboard" element={<Scoreboard />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/payment" element={<PaymentPage />} /> {/* 💙 This line handles enroll payment */}
    </Routes>
  );
};

export default App;
