// src/pages/Scoreboard.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import './Scoreboard.css';

const Scoreboard = () => {
  const scores = [
    { name: 'Alice', completed: 5 },
    { name: 'Bob', completed: 3 },
    { name: 'You', completed: 7 }
  ];

  return (
    <>
      <Navbar />
      <div className="scoreboard-container">
        <h2>Scoreboard 🏆</h2>
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Modules Completed</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.completed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Scoreboard;
