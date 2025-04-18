// src/pages/InstructorDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./InstructorDashboard.css";
import { useNavigate } from "react-router-dom";

const InstructorDashboard = () => {
  const email = sessionStorage.getItem("user");
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalEnrolled: 0,
    totalIncome: 0,
    rank: null,
    courses: []
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("/api/instructor/dashboard", { params: { email } })
      .then(res => setStats(res.data))
      .catch(console.error);
  }, [email]);

  const { totalEnrolled, totalIncome, rank, courses } = stats;
  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(filter.toLowerCase()) ||
    c.courseId.toLowerCase().includes(filter.toLowerCase())
  );
  const [showForm, setShowForm] = useState(false);
const [newCourse, setNewCourse] = useState({
  title: "", description: "", courseId: "", price: ""
});

const handleAddCourse = () => {
  axios.post("/api/instructor/add-course", {
    ...newCourse,
    instructorEmail: email
  }).then(res => {
    alert("✅ Course Added");
    setStats(prev => ({
      ...prev,
      courses: [...prev.courses, res.data.course]
    }));
    setShowForm(false);
    setNewCourse({ title: "", description: "", courseId: "", price: "" });
  }).catch(console.error);
};


  return (
    <div className="instructor-dashboard">
      <h1>Welcome, Instructor 👩‍🏫</h1>

      {/* — Search Bar — */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search courses..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>

      {/* — Stats Cards — */}
      <div className="stats-cards">
        <div className="stats-card">
          <h3>👥 Students Enrolled</h3>
          <p>{totalEnrolled}</p>
        </div>
        <div className="stats-card">
          <h3>💰 Total Income</h3>
          <p>${totalIncome.toFixed(2)}</p>
        </div>
        <div className="stats-card">
          <h3>🏆 Your Rank</h3>
          <p>#{rank || "—"}</p>
        </div>
      </div>

      {/* — Courses Grid — */}
      <button className="btn-add-course" onClick={() => setShowForm(!showForm)}>
  {showForm ? "Cancel" : "➕ Add Course"}
</button>

{showForm && (
  <div className="add-course-form">
    <input type="text" placeholder="Title" value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} />
    <input type="text" placeholder="Description" value={newCourse.description} onChange={e => setNewCourse({...newCourse, description: e.target.value})} />
    <input type="text" placeholder="Course ID" value={newCourse.courseId} onChange={e => setNewCourse({...newCourse, courseId: e.target.value})} />
    <input type="number" placeholder="Price ($)" value={newCourse.price} onChange={e => setNewCourse({...newCourse, price: e.target.value})} />
    <button onClick={handleAddCourse}>Save Course</button>
  </div>
)}

      <section className="courses-list">
        <h2>My Courses</h2>
        <div className="courses-grid">
          {filtered.map(course => (
            <div key={course._id} className="course-card">
              <h3>{course.title}</h3>
              <p><strong>ID:</strong> {course.courseId}</p>
              <p><strong>Lectures:</strong> {course.lectures.length}</p>
              <p><strong>Enrolled:</strong> {course.studentsEnrolled.length}</p>
              <div className="card-buttons">
                <button
                  className="btn-edit"
                  onClick={() => navigate(`/edit-course/${course._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn-view"
                  onClick={() => navigate(`/view-course/${course._id}`)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p>No courses found.</p>}
        </div>
      </section>
    </div>
  );
};

export default InstructorDashboard;
