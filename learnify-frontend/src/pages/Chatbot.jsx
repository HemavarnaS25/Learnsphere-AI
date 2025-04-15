// src/pages/Chatbot.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');

  const handleSend = () => {
    if (!msg.trim()) return;
    const newMessages = [...messages, { user: 'You', text: msg }, { user: 'Bot', text: `I'm here to help with "${msg}" 💬` }];
    setMessages(newMessages);
    setMsg('');
  };

  return (
    <>
      <Navbar />
      <div className="chatbot-container">
        <h2>Help Chatbot 💬</h2>
        <div className="chat-window">
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.user === 'You' ? 'user' : 'bot'}`}>
              <strong>{m.user}:</strong> {m.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Ask something..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
