import React, { useState } from 'react';
import axios from 'axios';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa'; // FaTimes for close icon
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Ask me anything about food, ingredients, calories, or your order.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);  // <-- Add this

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:4000/api/chatbot', { message: input });
      const botMessage = { from: 'bot', text: res.data.answer };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages(prev => [...prev, { from: 'bot', text: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  // Toggle chatbot open/close
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating chatbot icon button */}
      {!isOpen && (
        <button className="chatbot-toggle-button" onClick={toggleChatbot}>
          <FaRobot size={28} />
        </button>
      )}

      {/* Chatbot window */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbox">
            {/* Close button */}
            <button className="chatbot-close-button" onClick={toggleChatbot}>
              <FaTimes size={20} />
            </button>

            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.from}`}>
                <span>{msg.text}</span>
              </div>
            ))}
            {loading && (
              <div className="message bot">
                <span>Typing...</span>
              </div>
            )}
          </div>
          <div className="input-area">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type your question..."
            />
            <button onClick={sendMessage}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
