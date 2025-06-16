import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Fonction de nettoyage pour les caractères encodés bizarres
  function cleanText(text) {
    try {
      return decodeURIComponent(escape(text));
    } catch (e) {
      return text;
    }
  }

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await axios.post('https://apiv1-a8gb.onrender.com/message', {
        prompt: input,
      });

      const rawText = response.data.response || 'Aucune réponse reçue.';
      const cleanedText = cleanText(rawText);

      const botMessage = {
        sender: 'bot',
        text: cleanedText,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: "Erreur lors de la communication avec l'API." },
      ]);
    } finally {
      setInput('');
      setLoading(false);
    }
  };

  return (
    <div className="container mt-3" style={{ maxWidth: '600px' }}>
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          Chat IA
        </div>
        <div className="card-body" style={{ height: '400px', overflowY: 'auto' }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'} mb-2`}
            >
              <div
                className="p-2"
                style={{
                  backgroundColor: msg.sender === 'user' ? '#f1f1f1' : '#d1ecf1',
                  color: '#000',
                  borderRadius: '10px',
                  maxWidth: '75%',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                }}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="card-footer">
          <form onSubmit={sendMessage} className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tapez votre message..."
              disabled={loading}
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '⏳' : 'Envoyer'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
