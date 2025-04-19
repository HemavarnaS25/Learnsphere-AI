import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Home.css";

const Home = () => (
  <>
    <Navbar />
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Learnify 💡</h1>
        <p>Your AI‑powered platform for personalized, effective learning experiences tailored to your goals.</p>
        <div className="buttons">
          {/* pass ?role=instructor */}
          <Link to="/login?role=instructor" className="btn-primary">
            Instructor
          </Link>
          
          <Link to="/login" className="btn-secondary">
            Login
          </Link>
        </div>
      </div>
      <img src="/Learnify.jpg" alt="Learnify Illustration" className="home-img" />
    </div>
      <section className="info-section">
  <h2>Why Choose Learnify?</h2>
  <div className="info-cards">
    <div className="info-card">
      <h3>📚 Personalized Learning</h3>
      <p>AI-driven paths tailored to your goals and learning style for maximum effectiveness.</p>
    </div>
    <div className="info-card">
      <h3>🧠 Progress Tracking</h3>
      <p>Smart dashboards help you monitor your growth and stay on top of your progress.</p>
    </div>
    <div className="info-card">
      <h3>👩‍🏫 Certified Instructors</h3>
      <p>Learn from top educators and industry pros with verified credentials.</p>
    </div>
    <div className="info-card">
      <h3>💻 100+ In-Demand Courses</h3>
      <p>Master Cybersecurity, AI, Cloud Computing, and more—anytime, anywhere.</p>
    </div>
  </div>
</section>


      <footer className="footer">
        <div className="footer-left">
          <h3>Contact Us</h3>
          <p>Email: <a href="mailto:hemavarnas25@gmail.com">Learnify Team</a></p>
          <p>© {new Date().getFullYear()} Learnify. All rights reserved.</p>
        </div>
        <div className="footer-right">
          <iframe
            title="Learnify Location"
            src="https://maps.google.com/maps?q=Coimbatore&t=&z=13&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </footer>
    </>
  );


export default Home;
