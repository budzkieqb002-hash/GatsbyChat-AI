import React, { useState, useEffect, useRef } from 'react';
import { Mic, Paperclip, Menu, Send } from 'lucide-react';
import { sendMessage } from '../lib/gemini';
import { getGreeting } from '../lib/personas';

const GatsbyChat = ({ onOpenSidebar, selectedTone }) => {

  // 🔴 IMPORTANT: Ensure your image link is correct here
  const bgImage = "url('https://img.freepik.com/free-vector/gradient-art-deco-background_23-2149157989.jpg')";

  // --- STATE ---
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: getGreeting('Jay Gatsby')
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Reset conversation when the selected character changes
  useEffect(() => {
    setMessages([
      {
        id: Date.now(),
        sender: 'ai',
        text: getGreeting(selectedTone),
      },
    ]);
    setInputValue('');
    setIsTyping(false);
  }, [selectedTone]);

  // --- AI LOGIC (Gemini API) ---
  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    // 1. Add User Message
    const userText = inputValue;
    const userMsg = { id: Date.now(), sender: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      // 2. Call Gemini API
      const currentMessages = [...messages, userMsg]; // include the new user message for context
      const aiResponseText = await sendMessage(selectedTone, currentMessages, userText);

      const aiMsg = { id: Date.now() + 1, sender: 'ai', text: aiResponseText };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      const errorMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: `I beg your pardon — something seems to have gone wrong. ${error.message || 'Please try again in a moment.'}`,
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="flex-1 h-screen flex flex-col relative overflow-hidden bg-black font-['MonteCarlo'] text-[#BB933F]"
      style={{
        backgroundImage: bgImage,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }}
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=MonteCarlo&display=swap');`}
      </style>

      {/* MOBILE MENU BUTTON */}
      <div className="md:hidden absolute top-5 left-5 z-50">
        <button
          onClick={onOpenSidebar}
          className="p-2 bg-[#BE9C4C] rounded-lg text-black border-2 border-[#BB933F] shadow-lg active:scale-95 transition-transform"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* MAIN CHAT AREA */}
      <main className="flex-1 flex flex-col relative overflow-y-auto px-6 pb-4 pt-24 md:p-24 scrollbar-none">

        {/* MESSAGES LIST */}
        <div className="flex-1 flex flex-col space-y-6">

          {/* Static Header */}
          <div className="self-center mb-4">
            <div className="px-4 py-2 border-2 border-[#BB933F] text-center bg-[#BE9C4C] shadow-lg rounded-lg">
              <p className="text-xs tracking-widest text-black/80 font-sans">SESSION ACTIVE</p>
              <h2 className="text-xl text-black leading-none">{selectedTone} AI</h2>
            </div>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col w-full max-w-3xl z-10 ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
            >
              {/* Message Bubble */}
              <div
                className={`
                  relative px-6 py-4 rounded-2xl shadow-xl backdrop-blur-sm border
                  ${msg.sender === 'user'
                    ? 'bg-[#BB933F] text-black border-[#BB933F] rounded-tr-none' // USER STYLE (Gold Highlighter)
                    : 'bg-black/80 text-[#BB933F] border-[#BB933F] rounded-tl-none' // AI STYLE (Dark Contrast)
                  }
                `}
              >
                {/* Sender Label */}
                <span className={`text-sm block mb-1 opacity-70 font-sans tracking-wider ${msg.sender === 'user' ? 'text-black' : 'text-[#BB933F]'}`}>
                  {msg.sender === 'user' ? 'You' : selectedTone}
                </span>

                {/* Message Text */}
                <p className="text-2xl md:text-4xl leading-tight">
                  {msg.text}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="self-start ml-2 p-3 bg-black/50 rounded-full border border-[#BB933F]/50 animate-pulse">
              <span className="text-[#BB933F] text-lg">Thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* FOOTER INPUT AREA */}
        <div className="w-full relative z-20 shrink-0 mt-6 md:mt-8">
          <div className="w-full rounded-xl md:rounded-2xl h-28 md:h-32 relative flex flex-col justify-between p-3 md:p-5 bg-[#BE9C4C]/95 backdrop-blur-sm shadow-[inset_0_0_20px_#A88843]">

            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${selectedTone}...`}
              className="w-full h-full bg-transparent border-none outline-none text-2xl md:text-3xl placeholder-black/60 text-black resize-none pt-1 pr-16 font-['MonteCarlo']"
            />

            {/* Left Icons */}
            <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 flex items-center gap-3 md:gap-4">
              <button className="text-black/80 hover:text-black transition-all active:scale-95">
                <Mic size={24} className="md:w-8 md:h-8" strokeWidth={1.5} />
              </button>
              <button className="text-black/80 hover:text-black transition-all active:scale-95">
                <Paperclip size={24} className="md:w-8 md:h-8" strokeWidth={1.5} />
              </button>
            </div>

            {/* Send Button */}
            <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4">
              <button
                onClick={handleSend}
                disabled={isTyping}
                className={`bg-black hover:bg-black/80 text-[#BB933F] p-2 md:p-3 rounded-xl shadow-lg transition-all active:scale-95 hover:shadow-xl border border-[#BB933F] ${isTyping ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Send size={20} className="md:w-6 md:h-6 ml-1" strokeWidth={2} />
              </button>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
};

export default GatsbyChat;