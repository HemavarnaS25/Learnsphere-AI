import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1>Student Dashboard 🎓</h1>

        <div className="dashboard-links">
          <a href="/generate-course" className="card">
            Generate Course with AI
          </a>
          {/* <a href="/view-course" className="card">
            View Courses
          </a> */}
          <a href="/scoreboard" className="card">
            View Scoreboard
          </a>
        </div>

        {/* Dynamic Courses Section */}
        <section className="courses-section">
          <h2>Available Courses</h2>

          {loading && <p>Loading courses…</p>}
          {error && <p className="error-msg">{error}</p>}

          {!loading && !error && (
            <div className="courses-grid">
              {courses.map((c) => (
                <div key={c._id} className="card course-card">
                  <h3>{c.title}</h3>
                  <p><strong>ID:</strong> {c.courseId}</p>
                  <p><strong>Lectures:</strong> {c.lectures.length}</p>
                  <p><strong>Instructor:</strong> {c.instructor.email}</p>
                  <button
                    onClick={() => alert("Enroll flow coming soon!")}
                    className="enroll-btn"
                  >
                    Enroll
                  </button>
                </div>
              ))}
              {courses.length === 0 && <p>No courses available.</p>}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default StudentDashboard;
