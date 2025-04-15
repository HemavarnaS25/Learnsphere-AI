import React from 'react';
import Navbar from '../components/Navbar';
import './Home.css';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="home-content">
          <h1>Welcome to Learnify 💡</h1>
          <p>Your AI-powered platform for personalized, effective learning.</p>
          <div className="buttons">
            <a href="/register" className="btn-primary">Get Started</a>
            <a href="/login" className="btn-secondary">Login</a>
          </div>
        </div>
        <img src="/learnify.png" alt="Learnify Illustration" className="home-img" />
      </div>
    </>
  );
};

export default Home;
