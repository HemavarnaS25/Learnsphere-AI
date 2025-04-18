import React from "react";
import { useNavigate } from "react-router-dom";
import "./EnrollModal.css";

const EnrollModal = ({ course, onClose }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate("/payment", { state: { course } });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirm Enrollment</h2>
        <p>Course: <strong>{course.title}</strong></p>
        <p>Instructor: {course.instructor.email}</p>
        <p>Lectures: {course.lectures.length}</p>
        <div className="modal-buttons">
          <button className="confirm" onClick={handleConfirm}>Enroll Now</button>
          <button className="cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EnrollModal;
