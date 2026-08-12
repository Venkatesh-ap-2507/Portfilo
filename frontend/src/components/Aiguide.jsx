import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Send, Loader2, Mic, Sparkles } from 'lucide-react';
import { sendChatMessage } from '../services/api';
import '../AIguide.css';

/**
 * AiGuide — "Nova"
 * ==================
 * The site's signature element: an ambient, animated AI companion.
 * Idle state cycles short narration bubbles inviting exploration.
 * Open state is a full HUD-styled chat panel wired to the same
 * chatbot API the rest of the site uses.
 */

const TIPS = [
  "I'm Nova — ask me about the RAG systems on this page.",
  'Curious about the agentic AI workflows? Just ask.',
  'Try: "What LLMs has Venkatesh worked with?"',
  'Scroll around, or ask me to summarize this profile.',
];

const SUGGESTED = ['Tell me about your RAG work', 'Which LLMs have you used?', 'Show your projects'];

export default function AiGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hi, I'm Nova — the AI guide for this portfolio. Ask me about skills, projects, or experience." },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Ambient narration cycle while closed and untouched
  useEffect(() => {
    if (isOpen || hasInteracted) {
      setShowTip(false);
      return undefined;
    }
    const showTimer = setTimeout(() => setShowTip(true), 2400);
    const cycleTimer = setInterval(() => {
      setShowTip(false);
      setTimeout(() => {
        setTipIndex((i) => (i + 1) % TIPS.length);
        setShowTip(true);
      }, 400);
    }, 7000);
    return () => {
      clearTimeout(showTimer);
      clearInterval(cycleTimer);
    };
  }, [isOpen, hasInteracted]);

  const openGuide = useCallback(() => {
    setIsOpen(true);
    setHasInteracted(true);
    setShowTip(false);
  }, []);

  const handleSend = async (overrideText) => {
    const trimmed = (overrideText ?? input).trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await sendChatMessage(trimmed);
      const botMessage = { role: 'bot', content: res.data.answer, confidence: res.data.confidence };
      setMessages((prev) => [...prev, { ...botMessage, content: '' }]);
      for (let i = 1; i <= botMessage.content.length; i += 4) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => setTimeout(resolve, 9));
        setMessages((prev) =>
          prev.map((m, index) => (index === prev.length - 1 ? { ...m, content: botMessage.content.slice(0, i) } : m))
        );
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
    if (!Recognition) {
      setInput('Voice input is not supported in this browser.');
      return;
    }
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
      {/* Idle narration bubble */}
      <AnimatePresence>
        {showTip && !isOpen && (
          <motion.button
            type="button"
            onClick={openGuide}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="nova-tip"
          >
            {TIPS[tipIndex]}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating orb avatar */}
      <button
        type="button"
        onClick={() => (isOpen ? setIsOpen(false) : openGuide())}
        className="nova-orb-btn"
        aria-label={isOpen ? 'Close AI guide' : 'Open AI guide, Nova'}
      >
        <span className="nova-orb-ring nova-orb-ring--outer" />
        <span className="nova-orb-ring nova-orb-ring--inner" />
        <span className="nova-orb-particle" />
        <span className="nova-orb-core">
          {isOpen ? <X size={18} /> : <Sparkles size={18} />}
        </span>
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="nova-panel"
          >
            {/* Header */}
            <div className="nova-panel__header">
              <span className="nova-mini-orb">
                <span className="nova-mini-orb__core" />
              </span>
              <div>
                <h3>Nova</h3>
                <p>AI guide · this portfolio</p>
              </div>
              <div className="nova-status">
                <span className="nova-status__dot" />
                Online
              </div>
            </div>

            {/* Messages */}
            <div className="nova-panel__body">
              {messages.length === 1 && (
                <div className="nova-suggestions">
                  <span>Suggested</span>
                  <div>
                    {SUGGESTED.map((q) => (
                      <button key={q} type="button" onClick={() => handleSend(q)}>
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`nova-msg nova-msg--${msg.role}`}>
                  <div className={`nova-bubble ${msg.isError ? 'nova-bubble--error' : ''}`}>
                    {msg.content}
                    {msg.confidence && (
                      <div className="nova-confidence">
                        <span className={`nova-confidence__dot nova-confidence__dot--${msg.confidence}`} />
                        {msg.confidence} confidence
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="nova-msg nova-msg--bot">
                  <div className="nova-bubble nova-bubble--typing">
                    <span className="typing-dot" style={{ animationDelay: '0ms' }} />
                    <span className="typing-dot" style={{ animationDelay: '150ms' }} />
                    <span className="typing-dot" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="nova-panel__input">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Nova anything..."
                maxLength={1000}
                disabled={isTyping}
              />
              <button
                type="button"
                onClick={startVoice}
                className={listening ? 'is-listening' : ''}
                aria-label="Use voice input"
              >
                <Mic size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="nova-send"
                aria-label="Send message"
              >
                {isTyping ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
            <p className="nova-panel__footnote">AI-powered · answers about this profile only</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}