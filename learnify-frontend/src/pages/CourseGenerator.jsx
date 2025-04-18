import React, { useState } from 'react';
import './CourseGenerator.css';
import Navbar from '../components/Navbar';
import './CourseViewer.css'

const CourseGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openModuleIndex, setOpenModuleIndex] = useState(null);

  const fetchCourse = async () => {
    setLoading(true);
    setCourse(null);
    setError('');
    setOpenModuleIndex(null);

    try {
      const response = await fetch('/courseData.json');
      const data = await response.json();
      const formattedKeyword = keyword.trim().toLowerCase();

      const matchedKey = Object.keys(data).find(
        key => key.toLowerCase() === formattedKeyword
      );

      setTimeout(() => {
        setLoading(false);
        if (matchedKey) {
          setCourse(data[matchedKey]);
        } else {
          setError('Course not found');
        }
      }, 10000);
    } catch (err) {
      console.error('Error fetching course:', err);
      setLoading(false);
      setError('Something went wrong while loading the course.');
    }
  };

  const toggleModule = (index) => {
    setOpenModuleIndex(openModuleIndex === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <div className="generator-container">
        <h1>Course Generator</h1>
        <div className="search-section">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter course keyword like AI, Cybersecurity..."
          />
          <button onClick={fetchCourse}>Generate Course</button>
        </div>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Fetching the contents, please wait...</p>
          </div>
        )}

        {error && !loading && (
          <p className="error-message">{error}</p>
        )}

        {course && !loading && (
          <div className="course-output wide">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <h3>Modules:</h3>
            {course.modules.map((module, index) => (
              <div key={index} className="module-section">
                <h4
                  className="collapsible-title"
                  onClick={() => toggleModule(index)}
                >
                  {module.title}
                  <span>{openModuleIndex === index ? '−' : '+'}</span>
                </h4>
                {openModuleIndex === index && (
                  <ul>
                    {module.subtopics.map((topic, i) => (
                      <li key={i}>
                        <strong>{topic.title}</strong>
                        <span>{topic.description}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CourseGenerator;
