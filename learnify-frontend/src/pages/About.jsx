import React from 'react';
import Navbar from '../components/Navbar';
import './About.css';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-wrapper">
        <section className="about-hero">
          <h1>About Learnify</h1>
          <p>
            Learnify is a cutting-edge, AI-powered Learning Management System (LMS) built to redefine modern education. 
            We personalize the journey of every learner while giving instructors the tools to build impactful, interactive courses.
          </p>
        </section>

        <section className="about-highlights">
          <div className="highlight-card">
            <h2>🚀 Our Vision</h2>
            <p>
              To revolutionize education using smart technology, making personalized learning accessible for all.
            </p>
          </div>
          <div className="highlight-card">
            <h2>📈 Driven by Intelligence</h2>
            <p>
              Our adaptive AI engine tailors each path for the learner’s pace, goals, and style—ensuring effective mastery.
            </p>
          </div>
          <div className="highlight-card">
            <h2>🎓 Empowering Educators</h2>
            <p>
              Instructors can build immersive courses, track student progress, and engage with learners in real-time.
            </p>
          </div>
        </section>

        {/* <footer className="about-footer">
          <p>📍 Headquartered in Coimbatore, India</p>
          <p>📧 Reach us at: <a href="mailto:support@learnify.ai">support@learnify.ai</a></p>
          <p>© {new Date().getFullYear()} Learnify. All rights reserved.</p>
        </footer> */}
        <footer className="footer">
        <div className="footer-left">
          <h3>Contact Us</h3>
          <p>Email: <a href="mailto:hemavarnas25@gmail.com">Learnify team</a></p>
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
      </div>
    </>
  );
};

export default About;
