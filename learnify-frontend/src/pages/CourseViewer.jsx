// src/pages/CourseViewer.jsx
import React, { useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import './CourseViewer.css';

const CourseViewer = () => {
  const videoRef = useRef(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video.currentTime >= video.duration - 1) {
      setIsCompleted(true);
    }
  };

  const handleSeeking = (e) => {
    const video = videoRef.current;
    if (video.currentTime < video.duration - 5) {
      video.currentTime = 0;
      alert("Skipping is not allowed babe 😠");
    }
  };

  return (
    <>
      <Navbar />
      <div className="viewer-container">
        <h2>Course Video 🎥</h2>
        <video
          ref={videoRef}
          width="100%"
          controls
          onTimeUpdate={handleTimeUpdate}
          onSeeking={handleSeeking}
        >
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        {isCompleted && <p className="completed">🎉 Congrats! You finished watching.</p>}
      </div>
    </>
  );
};

export default CourseViewer;
