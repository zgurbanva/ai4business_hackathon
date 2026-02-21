import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Hello! I am the Innovation Azerbaijan AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleToggle = () => {
      setIsOpen(true);
      setIsMinimized(false);
    };
    window.addEventListener('toggle-chatbot', handleToggle);
    return () => window.removeEventListener('toggle-chatbot', handleToggle);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Simulate typing delay for natural feel
      await new Promise(resolve => setTimeout(resolve, 800));

      const apiKey = process.env.GEMINI_API_KEY || '';

      if (!apiKey) {
        // Fallback Logic for when API Key is missing or in offline mode
        const lastInput = userMessage.toLowerCase();
        let fallbackResponse = "I'm currently in institutional offline mode. How can I help you with our ecosystem resources?";

        if (lastInput.includes('register') || lastInput.includes('startup')) {
          fallbackResponse = "To register your startup, please visit the 'Startup ID Registry' section. You'll need your company tax ID and founder details.";
        } else if (lastInput.includes('invest') || lastInput.includes('funding')) {
          fallbackResponse = "Investors can access our Analytics Portal to view vetted startup profiles and funding history. Visit the 'Investor' portal to begin.";
        } else if (lastInput.includes('event') || lastInput.includes('hackathon')) {
          fallbackResponse = "Our latest events and hackathons are listed in the 'Events' page. The Baku Innovation Hackathon is currently open for registration!";
        } else if (lastInput.includes('support') || lastInput.includes('help')) {
          fallbackResponse = "Our support team is available 24/7. You can also visit the Support Center for detailed FAQs and documentation.";
        } else if (lastInput.includes('hello') || lastInput.includes('hi')) {
          fallbackResponse = "Hello! I am the Innovation Azerbaijan AI. I can guide you through our portal features even in offline mode. What are you looking for today?";
        }

        setMessages(prev => [...prev, { role: 'model', text: fallbackResponse }]);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, { role: 'user', text: userMessage }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: "You are the official AI assistant for Innovation Azerbaijan. Provide helpful, concise, and professional information about the ecosystem. If you don't know something, suggest contacting support.",
        }
      });

      const aiResponse = response.text || "I'm sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    } catch (error) {
      console.error('Chatbot Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to my neural core right now. However, I can still help with general navigation! What do you need?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="size-14 bg-accent text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-accent/90 transition-all group"
          >
            <MessageSquare size={28} className="group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            className={`bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${isMinimized ? 'h-16 w-72' : 'h-[600px] w-[400px]'}`}
          >
            {/* Header */}
            <div className="bg-slate-950 p-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="size-8 bg-accent/20 rounded-lg flex items-center justify-center text-accent">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Innovation AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="size-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 text-slate-500 hover:text-white transition-colors"
                >
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-500 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-accent text-white' : 'bg-slate-800 text-slate-400'}`}>
                          {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-accent text-white rounded-tr-none' : 'bg-slate-800 text-slate-300 rounded-tl-none'}`}>
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 max-w-[85%]">
                        <div className="size-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                          <Bot size={16} />
                        </div>
                        <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none">
                          <Loader2 size={16} className="text-slate-500 animate-spin" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-slate-950 border-t border-slate-800">
                  <div className="relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask me anything..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-4 pr-12 text-sm text-white outline-none focus:ring-2 focus:ring-accent transition-all"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 size-8 bg-accent text-white rounded-lg flex items-center justify-center hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                  <p className="text-[10px] text-center text-slate-600 mt-3 font-medium">Powered by Gemini AI Technology</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
