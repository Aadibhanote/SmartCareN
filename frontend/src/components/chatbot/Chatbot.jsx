import React, { useState, useRef, useEffect } from 'react';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { chatAPI } from '../../services/api';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm the SmartCareN assistant. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    
    const newMessages = [...messages, { text: userMessage, isUser: true }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Send last 10 messages for context
      const history = newMessages.slice(-10).map(m => ({
        role: m.isUser ? 'user' : 'assistant',
        content: m.text
      }));

      const res = await chatAPI.send({ message: userMessage, history });
      setMessages(prev => [...prev, { text: res.data.reply || "I'm sorry, I couldn't understand that.", isUser: false }]);
    } catch (err) {
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting right now.", isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInput(question);
  };

  return (
    <>
      <div className="floating-chat-btn" onClick={toggleChat} title="Chat with us">
        {isOpen ? <FaTimes /> : <FaComments />}
      </div>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h6 className="mb-0 fw-bold"><FaComments className="me-2" /> Support Chat</h6>
            <FaTimes className="cursor-pointer" onClick={toggleChat} style={{cursor: 'pointer'}} />
          </div>
          
          <div className="chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.isUser ? 'user' : 'bot'}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="chat-message bot">
                <span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true"></span>
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {messages.length < 3 && (
            <div className="px-3 pb-2 d-flex flex-wrap gap-1">
              <span className="badge bg-light text-dark border cursor-pointer" style={{cursor: 'pointer'}} onClick={() => handleQuickQuestion("How do I book an appointment?")}>Book appointment</span>
              <span className="badge bg-light text-dark border cursor-pointer" style={{cursor: 'pointer'}} onClick={() => handleQuickQuestion("How to donate organs?")}>Donate organs</span>
            </div>
          )}

          <form className="chat-footer" onSubmit={handleSend}>
            <input 
              type="text" 
              className="form-control form-control-sm" 
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" className="btn btn-primary btn-sm" disabled={isLoading || !input.trim()}>
              <FaPaperPlane />
            </button>
          </form>
          <div className="text-center pb-1 bg-light">
            <small className="text-muted" style={{fontSize: '10px'}}>AI Assistant - Not medical advice</small>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
