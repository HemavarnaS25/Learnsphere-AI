import React from 'react';
import Navbar from '../components/Navbar';
import './InstructorDashboard.css';

const InstructorDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1>Instructor Dashboard 🧑‍🏫</h1>
        <div className="dashboard-links">
          <a href="/upload-course" className="card">Upload Course</a>
          <a href="/scoreboard" className="card">Scoreboard</a>
        </div>
      </div>
    </>
  );
};

export default InstructorDashboard;
