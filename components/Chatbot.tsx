import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chatRef.current) {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            chatRef.current = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: "You are a friendly and knowledgeable weather assistant for the Skylens Weather app. Your knowledge base includes information from leading atmospheric science projects like NASA's SatCORPS, the BRAMS modeling system, and the Pandora Project. You provide concise and helpful answers about weather, climate, satellite imagery, cloud products, and air quality. When asked for weather in a specific location, provide a brief summary.",
                },
            });
            setMessages([{ role: 'model', text: 'Hello! How can I help you with the weather today?' }]);
        } catch (error) {
            console.error("Failed to initialize chatbot:", error);
            setMessages([{ role: 'model', text: 'Sorry, I am unable to connect right now.' }]);
        }
    }
  }, [isOpen]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !chatRef.current) return;
    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const response = await chatRef.current.sendMessage({ message: input });
        const modelMessage: Message = { role: 'model', text: response.text };
        setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
        console.error("Chatbot error:", error);
        const errorMessage: Message = { role: 'model', text: "I'm having trouble responding right now. Please try again later." };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
  
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full text-white flex items-center justify-center shadow-2xl shadow-blue-500/50 hover:scale-110 transition-transform duration-300 z-50"
        aria-label="Open weather chatbot"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] max-w-md h-[60vh] max-h-[700px] bg-slate-800/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col z-50 transition-opacity duration-300 animate-fade-in-up">
          <header className="flex items-center justify-between p-4 border-b border-white/10">
            <h3 className="font-bold text-white text-glow">Weather Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-blue-200 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>
          
          <main className="flex-1 p-4 overflow-y-auto chatbot-messages">
            <div className="flex flex-col gap-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-white ${msg.role === 'user' ? 'bg-blue-600 rounded-br-none' : 'bg-slate-700 rounded-bl-none'}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                   <div className="max-w-[80%] p-3 rounded-2xl bg-slate-700 rounded-bl-none text-white">
                     <div className="flex items-center gap-2">
                       <span className="h-2 w-2 bg-blue-300 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                       <span className="h-2 w-2 bg-blue-300 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                       <span className="h-2 w-2 bg-blue-300 rounded-full animate-pulse"></span>
                     </div>
                   </div>
                 </div>
              )}
               <div ref={messagesEndRef} />
            </div>
          </main>

          <footer className="p-4 border-t border-white/10">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about the weather..."
                className="w-full pl-4 pr-12 py-3 bg-slate-700 text-white placeholder-blue-300 border border-white/20 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                   <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                 </svg>
              </button>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default Chatbot;