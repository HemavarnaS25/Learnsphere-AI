import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const email = localStorage.getItem("userEmail");
  const name = email ? email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1) : "Learner";

  useEffect(() => {
    axios
      .get("/api/courses")
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setError("Could not load courses.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="student-dashboard-container">
      <aside className="sidebar">
        <h2>Learnify</h2>
        <a href="/generate-course">✨ AI Course</a>
        <a href="/scoreboard">🏆 Scoreboard</a>
      </aside>

      <main className="dashboard-content">
        <div className="topbar">
          <div className="profile-badge">
            Welcome, {name} 👋
          </div>
        </div>

        <h1>Your Courses</h1>

        {loading && <p>Loading courses...</p>}
        {error && <p className="error-msg">{error}</p>}

        <div className="courses-grid">
          {!loading && !error && courses.length > 0 ? (
            courses.map((c) => (
              <div key={c._id} className="course-card">
                <h2>{c.title}</h2>
                <p><strong>ID:</strong> {c.courseId}</p>
                <p><strong>Lectures:</strong> {c.lectures.length}</p>
                <p><strong>Instructor:</strong> {c.instructor.email}</p>
                <button onClick={() => alert("Enroll flow coming soon!")}>
                  Enroll
                </button>
              </div>
            ))
          ) : (
            !loading && <p>No courses available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
