import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  { id: '1', role: 'assistant', content: 'Hello! I am your AI Eco-Coach. Ask me anything about reducing your footprint, understanding carbon offsets, or sustainable living!' }
];

const SUGGESTED_PROMPTS = [
  "How do I reduce my home energy bill?",
  "What is Direct Air Capture?",
  "How bad is fast fashion for the environment?"
];

const Coach = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/coach/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: "I'm having trouble connecting right now. Please try again later." }]);
      }
    } catch (error) {
      // Fallback for UI if backend is offline
      setTimeout(() => {
        setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: "That is a great question! However, it seems my backend server is currently offline so I cannot generate a real answer. Start the Python server to chat with me!" }]);
        setIsTyping(false);
      }, 2000);
      return;
    }

    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl relative">
      
      {/* Header */}
      <div className="bg-gray-950 p-4 border-b border-gray-800 flex items-center">
        <div className="p-2 bg-primary-500/10 rounded-lg mr-3">
          <Bot className="text-primary-500" size={24} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white flex items-center">Eco-Coach AI <Sparkles size={16} className="text-yellow-500 ml-2" /></h2>
          <p className="text-xs text-primary-400 font-medium">Always active and ready to help</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-primary-600 ml-3' : 'bg-gray-800 border border-gray-700 mr-3'
                }`}>
                  {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-primary-400" />}
                </div>
                <div className={`px-4 py-3 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-primary-600 text-white rounded-tr-none' 
                    : 'bg-gray-800 border border-gray-700 text-gray-200 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex max-w-[80%] flex-row">
                <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-gray-800 border border-gray-700 mr-3">
                  <Bot size={16} className="text-primary-400" />
                </div>
                <div className="px-4 py-4 rounded-2xl bg-gray-800 border border-gray-700 rounded-tl-none flex items-center space-x-1">
                  <motion.div className="w-2 h-2 bg-gray-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                  <motion.div className="w-2 h-2 bg-gray-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                  <motion.div className="w-2 h-2 bg-gray-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gray-950 border-t border-gray-800">
        
        {/* Suggested Prompts */}
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              disabled={isTyping}
              className="flex-shrink-0 px-3 py-1.5 bg-gray-900 border border-gray-700 hover:border-primary-500 text-xs text-gray-300 rounded-full transition-colors whitespace-nowrap"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Ask me how to lower your footprint..."
            disabled={isTyping}
            className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 disabled:opacity-50"
          />
          <button
            aria-label="Send message"
            onClick={() => handleSend(input)}
            disabled={isTyping || !input.trim()}
            className="bg-primary-600 hover:bg-primary-500 text-white rounded-xl px-6 py-3 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Coach;
