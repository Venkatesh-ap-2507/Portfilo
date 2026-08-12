import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, User, Mic } from 'lucide-react';
import { sendChatMessage } from '../services/api';

/**
 * Chatbot Widget
 * ================
 * Floating AI chatbot with message history, typing animation, and error handling.
 */
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: "Hi! I'm the AI assistant for this portfolio. Ask me anything about my skills, projects, or experience!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    // Add user message
    const userMessage = { role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await sendChatMessage(trimmed);
      const botMessage = {
        role: 'bot',
        content: res.data.answer,
        confidence: res.data.confidence,
      };
      setMessages((prev) => [...prev, { ...botMessage, content: '' }]);
      for (let i = 1; i <= botMessage.content.length; i += 4) {
        await new Promise((resolve) => setTimeout(resolve, 9));
        setMessages((prev) => prev.map((m, index) => index === prev.length - 1 ? { ...m, content: botMessage.content.slice(0, i) } : m));
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content: "Sorry, I'm having trouble connecting right now. Please try again later or use the contact form.",
          isError: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const startVoice = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) { setInput('Voice input is not supported in this browser.'); return; }
    const recognition = new Recognition();
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (e) => setInput(e.results[0][0].transcript);
    recognition.start();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen
            ? 'bg-dark-700 hover:bg-dark-600 rotate-0'
            : 'bg-primary-600 hover:bg-primary-700 animate-pulse-glow'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        <div className="glass rounded-2xl overflow-hidden shadow-2xl shadow-black/30 flex flex-col h-[500px]">
          {/* Header */}
          <div className="bg-dark-800 border-b border-dark-700 px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-primary-500/20 rounded-full flex items-center justify-center">
              <Bot size={18} className="text-primary-400" />
            </div>
            <div>
              <h3 className="text-white text-sm font-semibold">AI Assistant</h3>
              <p className="text-dark-500 text-xs">Ask about my skills & experience</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-dark-500 text-xs">Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 1 && <div className="flex flex-wrap gap-2"><span className="w-full text-xs text-dark-500">Suggested prompts</span>{['Tell me about your RAG work', 'Which LLMs have you used?', 'Show your projects'].map((q) => <button key={q} onClick={() => setInput(q)} className="text-xs text-cyan-200 border border-cyan-400/20 bg-cyan-400/5 rounded-full px-2.5 py-1 hover:bg-cyan-400/10">{q}</button>)}</div>}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-fade-in`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-primary-500/20' : 'bg-dark-700'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <User size={14} className="text-primary-400" />
                  ) : (
                    <Bot size={14} className="text-dark-400" />
                  )}
                </div>

                {/* Message bubble */}
                <div
                  className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white rounded-br-sm'
                      : msg.isError
                      ? 'bg-red-500/10 border border-red-500/20 text-red-300 rounded-bl-sm'
                      : 'bg-dark-800 text-dark-200 border border-dark-700/50 rounded-bl-sm'
                  }`}
                >
                  {msg.content}
                  {/* Confidence indicator */}
                  {msg.confidence && (
                    <div className="mt-1.5 flex items-center gap-1">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          msg.confidence === 'high'
                            ? 'bg-green-400'
                            : msg.confidence === 'medium'
                            ? 'bg-yellow-400'
                            : 'bg-red-400'
                        }`}
                      />
                      <span className="text-dark-500 text-[10px]">{msg.confidence} confidence</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2.5 animate-fade-in">
                <div className="w-7 h-7 rounded-full bg-dark-700 flex items-center justify-center flex-shrink-0">
                  <Bot size={14} className="text-dark-400" />
                </div>
                <div className="bg-dark-800 border border-dark-700/50 rounded-xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                  <span className="typing-dot" style={{ animationDelay: '0ms' }} />
                  <span className="typing-dot" style={{ animationDelay: '150ms' }} />
                  <span className="typing-dot" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-dark-700 px-3 py-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                maxLength={1000}
                disabled={isTyping}
                className="flex-1 bg-dark-800 border border-dark-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 transition-all disabled:opacity-50"
              />
              <button onClick={startVoice} type="button" className={`p-2.5 rounded-lg border ${listening ? 'text-cyan-200 border-cyan-300 animate-pulse' : 'text-dark-400 border-dark-700'}`} aria-label="Use voice input"><Mic size={17} /></button>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-2.5 bg-primary-600 hover:bg-primary-700 rounded-lg text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                aria-label="Send message"
              >
                {isTyping ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
            <p className="text-dark-600 text-[10px] text-center mt-1.5">
              AI-powered • Answers about my professional profile only
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
