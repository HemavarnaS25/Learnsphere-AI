import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './UploadCourse.css';

const UploadCourse = () => {
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleUpload = (e) => {
    e.preventDefault();
    alert(`Uploaded: ${title}`);
  };

  return (
    <>
      <Navbar />
      <div className="upload-container">
        <h2>Upload New Course</h2>
        <form onSubmit={handleUpload}>
          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="Video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
          />
          <button type="submit">Upload</button>
        </form>
      </div>
    </>
  );
};

export default UploadCourse;
