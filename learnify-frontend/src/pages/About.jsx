import React from 'react';
import Navbar from '../components/Navbar';
import './About.css';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <h1>About Learnify</h1>
        <p>
          Learnify is an innovative AI-driven LMS platform designed to personalize learning experiences
          for students and empower instructors to build interactive, engaging courses. 
          Our mission is to make education smarter, simpler, and more accessible to everyone.
        </p>
      </div>
    </>
  );
};

export default About;
