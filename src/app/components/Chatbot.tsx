import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Input, Button, Spin } from 'antd';
import { SendOutlined, CloseOutlined, MessageOutlined } from '@ant-design/icons';
import { callchat } from '../modules/Chatbot/callchat';
import './Chatbot.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Khởi tạo với tin nhắn chào mừng
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: '👋 Chào mừng đến với cửa hàng Sweeties Dodging! Tôi có thể giúp bạn tìm merchandise chính thức của game. Bạn muốn xem sản phẩm gì?',
        timestamp: new Date()
      }]);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { 
      role: 'user', 
      content: input,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const reply = await callchat([...messages, userMessage]);
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: reply,
        timestamp: new Date()
      }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { 
          role: 'assistant', 
          content: '❌ Kết nối thất bại. Vui lòng thử lại sau!',
          timestamp: new Date()
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Gợi ý câu hỏi nhanh
  const quickQuestions = [
    "Bạn bán những gì?",
    "Tìm áo thun Sweetie Star",
    "Giá sản phẩm như thế nào?", 
    "Còn hàng không?",
    "Làm sao để đặt hàng?",
    "Game Sweeties Dodging là gì?"
  ];

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot">
      {/* Nút mở chat khi đóng */}
      {!isOpen && (
        <div className="chatbot-header" onClick={toggleChat}>
          <MessageOutlined style={{ marginRight: '8px' }} />
          Sweeties AI
        </div>
      )}

      {/* Cửa sổ chat khi mở */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header" onClick={toggleChat}>
            <div>
              🎮 Sweeties AI
              <div style={{ fontSize: '10px', opacity: 0.9 }}>Merchandise Helper</div>
            </div>
            <button className="chatbot-toggle">
              <CloseOutlined />
            </button>
          </div>

          <div className="chatbot-body">
            <div className="messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.role === 'assistant' ? 'bot' : msg.role}`}>
                  <div className="message-content">
                    {msg.content.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                  {msg.timestamp && (
                    <div className="message-time">
                      {msg.timestamp.toLocaleTimeString('vi-VN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="message bot">
                  <div className="message-content">
                    <Spin size="small" /> Đang suy nghĩ...
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Gợi ý câu hỏi nhanh */}
            {messages.length <= 1 && (
              <div className="quick-questions">
                <div className="quick-questions-title">💡 Gợi ý câu hỏi:</div>
                <div className="quick-questions-grid">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="quick-question-btn"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form className="chatbot-input" onSubmit={handleSubmit}>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Hỏi về sản phẩm Sweeties Dodging..."
                disabled={isLoading}
              />
              <Button 
                htmlType="submit" 
                type="primary" 
                icon={<SendOutlined />} 
                disabled={!input.trim() || isLoading}
                loading={isLoading}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;