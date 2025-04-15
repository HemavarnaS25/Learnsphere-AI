import React from 'react';
import Navbar from '../components/Navbar';
import './Contact.css';

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>Have a question, suggestion, or issue? We’d love to hear from you.</p>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Email Address" required />
          <textarea rows="5" placeholder="Your Message" required />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </>
  );
};

export default Contact;
