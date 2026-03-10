import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Search } from 'lucide-react';
import { Button } from './ui/button';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string, isSearch?: boolean }[]>([
    { role: 'model', text: 'Hi! I am the ItzEasy AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (useSearch: boolean = false) => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage, isSearch: useSearch }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      let responseText = '';
      
      if (useSearch) {
        // Use gemini-3-flash-preview with googleSearch for grounded answers
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: userMessage,
          config: {
            tools: [{ googleSearch: {} }],
            systemInstruction: "You are a helpful assistant for ItzEasy, a marketplace for gaming software. Provide concise, accurate answers using Google Search."
          }
        });
        responseText = response.text || 'Sorry, I could not find an answer.';
        
        // Extract URLs if available
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (chunks && chunks.length > 0) {
          responseText += '\n\n**Sources:**\n';
          chunks.forEach((chunk: any) => {
            if (chunk.web?.uri && chunk.web?.title) {
              responseText += `- [${chunk.web.title}](${chunk.web.uri})\n`;
            }
          });
        }
      } else {
        // Use gemini-3.1-pro-preview for general chat
        const chat = ai.chats.create({
          model: 'gemini-3.1-pro-preview',
          config: {
            systemInstruction: "You are a helpful assistant for ItzEasy, a marketplace for AI aimbots, triggerbots, and spoofers. Be helpful, concise, and friendly."
          }
        });
        
        // Send previous messages as context (simplified for this example)
        const response = await chat.sendMessage({ message: userMessage });
        responseText = response.text || 'Sorry, I encountered an error.';
      }

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error while processing your request.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-neon-cyan rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-shadow z-50 text-bg"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] bg-surface border border-border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="p-4 bg-surface-hover border-b border-border flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-neon-cyan" />
                <h3 className="font-bold text-lg">ItzEasy AI</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-text-secondary hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.role === 'user' 
                      ? 'bg-neon-cyan text-bg rounded-tr-none' 
                      : 'bg-surface-hover border border-border text-text-primary rounded-tl-none'
                  }`}>
                    {msg.role === 'model' ? (
                      <div className="prose prose-invert prose-sm max-w-none">
                        <Markdown>{msg.text}</Markdown>
                      </div>
                    ) : (
                      <p className="text-sm">{msg.text}</p>
                    )}
                    {msg.isSearch && (
                      <div className="text-[10px] opacity-70 mt-1 flex items-center gap-1">
                        <Search className="w-3 h-3" /> Web Search
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-surface-hover border border-border rounded-2xl rounded-tl-none px-4 py-3 flex gap-1">
                    <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-border bg-surface-hover">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(false)}
                  placeholder="Ask me anything..."
                  className="flex-grow bg-bg border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon-cyan"
                />
                <Button 
                  onClick={() => handleSend(true)} 
                  variant="outline" 
                  size="icon"
                  title="Search Web"
                  className="border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-white shrink-0"
                  disabled={isLoading || !input.trim()}
                >
                  <Search className="w-4 h-4" />
                </Button>
                <Button 
                  onClick={() => handleSend(false)} 
                  className="bg-neon-cyan hover:bg-neon-cyan/90 text-bg shrink-0"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
