import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Input, Button } from 'antd';
import { SendOutlined, CloseOutlined } from '@ant-design/icons';
import  {callchat}  from '../modules/Chatbot/callchat'; 
import './Chatbot.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const reply = await callchat([...messages, userMessage]); // ✅ gọi từ utils/chatAPI
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '❌ Kết nối thất bại. Vui lòng thử lại sau!' },
      ]);
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header" onClick={() => setIsOpen(!isOpen)}>
        Sweeties AI
        <button className="chatbot-toggle">
          <CloseOutlined />
        </button>
      </div>
      {isOpen && (
        <div className="chatbot-body">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form className="chatbot-input" onSubmit={handleSubmit}>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hỏi tôi về Sweeties Dodging..."
            />
            <Button htmlType="submit" type="primary" icon={<SendOutlined />} disabled={!input.trim()} />
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
