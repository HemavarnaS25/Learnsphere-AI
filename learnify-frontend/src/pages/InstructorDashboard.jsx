import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import "./InstructorDashboard.css"; // Add custom styling

const InstructorDashboard = () => {
  const email = sessionStorage.getItem("user");
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalEnrolled: 0, totalIncome: 0, rank: null, courses: []
  });
  const [filter, setFilter] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [newCourse, setNewCourse] = useState({
    title: "", description: "", courseId: "", price: "",
    instructorName: "", modules: "", videoLink: "", quizzes: "",
    exam: "", certificationTitle: ""
  });

  useEffect(() => {
    axios
      .get("/api/instructor/dashboard", { params: { email } })
      .then(res => setStats(res.data))
      .catch(console.error);
  }, [email]);

  const handleAddCourse = () => {
    const data = {
      ...newCourse,
      instructorEmail: email,
      modules: newCourse.modules.split(",").map(m => m.trim()),
      quizzes: newCourse.quizzes.split(",").map(q => q.trim())
    };

    axios.post("/api/instructor/add-course", data)
      .then(res => {
        alert("✅ Course Added");
        setStats(prev => ({
          ...prev,
          courses: [...prev.courses, res.data.course]
        }));
        setShowForm(false);
        setNewCourse({
          title: "", description: "", courseId: "", price: "",
          instructorName: "", modules: "", videoLink: "", quizzes: "",
          exam: "", certificationTitle: ""
        });
      })
      .catch(console.error);
  };

  const { totalEnrolled, totalIncome, rank, courses } = stats;
  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(filter.toLowerCase()) ||
    c.courseId.toLowerCase().includes(filter.toLowerCase())
  );

  // Chart.js data for student enrollments
  const chartData = {
    labels: courses.map(course => course.title),
    datasets: [
      {
        label: 'Students Enrolled',
        data: courses.map(course => course.studentsEnrolled.length),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="instructor-dashboard">
      <h1>Welcome, Instructor 👩‍🏫</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search courses..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>

      <div className="stats-cards">
        <div className="stats-card"><h3>👥 Students</h3><p>{totalEnrolled}</p></div>
        <div className="stats-card"><h3>💰 Income</h3><p>${totalIncome.toFixed(2)}</p></div>
        <div className="stats-card"><h3>🏆 Rank</h3><p>#{rank || "—"}</p></div>
      </div>

      <div className="chart-container">
        <h3>Student Enrollment Statistics</h3>
        <Bar data={chartData} />
      </div>

      <button className="btn-add-course" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "➕ Add Course"}
      </button>

      {showForm && (
        <div className="add-course-form">
          <input placeholder="Course Title" value={newCourse.title} onChange={e => setNewCourse({ ...newCourse, title: e.target.value })} />
          <input placeholder="Instructor Name" value={newCourse.instructorName} onChange={e => setNewCourse({ ...newCourse, instructorName: e.target.value })} />
          <input placeholder="Course ID" value={newCourse.courseId} onChange={e => setNewCourse({ ...newCourse, courseId: e.target.value })} />
          <input placeholder="Description" value={newCourse.description} onChange={e => setNewCourse({ ...newCourse, description: e.target.value })} />
          <input placeholder="Modules (comma-separated)" value={newCourse.modules} onChange={e => setNewCourse({ ...newCourse, modules: e.target.value })} />
          <input placeholder="Video Link" value={newCourse.videoLink} onChange={e => setNewCourse({ ...newCourse, videoLink: e.target.value })} />
          <input placeholder="Quizzes (comma-separated)" value={newCourse.quizzes} onChange={e => setNewCourse({ ...newCourse, quizzes: e.target.value })} />
          <input placeholder="Exam Details" value={newCourse.exam} onChange={e => setNewCourse({ ...newCourse, exam: e.target.value })} />
          <input placeholder="Certification Title" value={newCourse.certificationTitle} onChange={e => setNewCourse({ ...newCourse, certificationTitle: e.target.value })} />
          <input type="number" placeholder="Price ($)" value={newCourse.price} onChange={e => setNewCourse({ ...newCourse, price: e.target.value })} />
          <button onClick={handleAddCourse}>💾 Save Course</button>
        </div>
      )}

      <section className="courses-list">
        <h2>My Courses</h2>
        <div className="courses-grid">
          {filtered.map(course => (
            <div key={course._id} className="course-card">
              <h3>{course.title}</h3>
              <p><strong>ID:</strong> {course.courseId}</p>
              <p><strong>Modules:</strong> {course.modules?.length || 0}</p>
              <p><strong>Enrolled:</strong> {course.studentsEnrolled.length}</p>
              <div className="card-buttons">
                <button className="btn-edit" onClick={() => navigate(`/edit-course/${course._id}`)}>Edit</button>
                <button className="btn-view" onClick={() => navigate(`/view-course/${course._id}`)}>View</button>
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
