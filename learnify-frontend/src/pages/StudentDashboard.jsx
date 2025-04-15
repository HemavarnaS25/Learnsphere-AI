import React from 'react';
import Navbar from '../components/Navbar';
import './StudentDashboard.css';

const StudentDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1>Student Dashboard 🎓</h1>
        <div className="dashboard-links">
          <a href="/generate-course" className="card">Generate Course with AI</a>
          <a href="/view-course" className="card">View Courses</a>
          <a href="/scoreboard" className="card">View Scoreboard</a>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
