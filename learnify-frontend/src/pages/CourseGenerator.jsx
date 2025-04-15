import React, { useState } from 'react';
import './CourseGenerator.css'; // optional: add your styling
import Navbar from '../components/Navbar';

const CourseGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');

  const fetchCourse = async () => {
    try {
      const response = await fetch('/courseData.json');
      const data = await response.json();

      const formattedKeyword = keyword.trim().toLowerCase();

      const matchedKey = Object.keys(data).find(
        key => key.toLowerCase() === formattedKeyword
      );

      if (matchedKey) {
        setCourse(data[matchedKey]);
        setError('');
      } else {
        setCourse(null);
        setError('Course not found');
      }
    } catch (err) {
      console.error('Error fetching course:', err);
      setError('Something went wrong while loading the course.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="generator-container" style={{ padding: '20px' }}>
        <h1>Course Generator</h1>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter course keyword like AI, Cybersecurity..."
          style={{
            padding: '8px',
            marginRight: '10px',
            fontSize: '16px',
            width: '300px',
          }}
        />
        <button onClick={fetchCourse} style={{ padding: '8px 16px' }}>
          Generate Course
        </button>

        {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}

        {course && (
          <div className="course-output" style={{ marginTop: '20px' }}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <h3>Modules:</h3>
            {course.modules.map((module, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <h4>{module.title}</h4>
                <ul>
                  {module.subtopics.map((topic, i) => (
                    <li key={i}>
                      <strong>{topic.title}:</strong> {topic.description}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CourseGenerator;
