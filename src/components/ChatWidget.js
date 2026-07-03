import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MessageCircle, X, ArrowUp } from 'lucide-react';
import { retrieveContext } from '../data/resumeKnowledge';

const EASE = [0.32, 0.72, 0, 1];

const SUGGESTIONS = [
  "What's Rafik's ML experience?",
  'What projects has he built?',
  'What tech stack does he use?',
  'Tell me about DrivingMan.ca',
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <motion.span key={i}
          className="h-1.5 w-1.5 rounded-full bg-emerald-400"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }} />
      ))}
    </div>
  );
}

export default function ChatWidget({ isOpen, onOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi, I'm an AI grounded in Rafik's resume. Ask me anything about his experience, skills, or projects.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }, [messages, loading, reduce]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const send = async (question) => {
    const q = (question ?? input).trim();
    if (!q || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setLoading(true);

    try {
      const context = retrieveContext(q);
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, context }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'API error');
      setMessages(prev => [...prev, { role: 'assistant', text: data.answer }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: "Connection failed. Please try again in a moment.", error: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const showSuggestions = messages.length === 1 && !loading;

  return (
    <>
      {/* Floating trigger */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={onOpen}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ delay: 1.2, duration: 0.5, ease: EASE }}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full border border-white/10 bg-zinc-900/80 py-3 pl-4 pr-5 text-zinc-100 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-transform duration-300 ease-out-expo hover:scale-[1.03] active:scale-[0.97]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 text-zinc-950">
              <MessageCircle size={13} strokeWidth={2} />
            </span>
            <span className="text-sm font-semibold">Chat with my resume</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed bottom-0 right-0 z-50 flex h-[100dvh] w-full flex-col border-white/10 bg-zinc-950/90 backdrop-blur-2xl sm:bottom-6 sm:right-6 sm:h-[600px] sm:max-h-[calc(100dvh-3rem)] sm:w-[400px] sm:rounded-[1.75rem] sm:border sm:shadow-[0_24px_80px_rgba(0,0,0,0.6)]">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400 font-display text-sm font-bold text-zinc-950">R</span>
                <div>
                  <p className="text-sm font-bold text-zinc-100">Resume chat</p>
                  <p className="font-mono text-[10px] text-zinc-500">RAG over Rafik's resume</p>
                </div>
              </div>
              <button onClick={onClose} aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors duration-300 hover:bg-white/5 hover:text-white">
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {messages.map((m, i) => (
                <motion.div key={i}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'rounded-br-md bg-emerald-400 font-medium text-zinc-950'
                      : m.error
                        ? 'rounded-bl-md border border-red-400/20 bg-red-400/5 text-red-200'
                        : 'rounded-bl-md border border-white/5 bg-white/[0.04] text-zinc-200'
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-white/5 bg-white/[0.04]">
                    <TypingDots />
                  </div>
                </div>
              )}

              {showSuggestions && (
                <div className="space-y-2 pt-2">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">Try asking</p>
                  {SUGGESTIONS.map(s => (
                    <button key={s} onClick={() => send(s)}
                      className="block w-full rounded-xl border border-white/10 px-4 py-2.5 text-left text-sm text-zinc-400 transition-colors duration-300 hover:border-emerald-400/40 hover:text-zinc-100">
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={e => { e.preventDefault(); send(); }}
              className="border-t border-white/5 p-4">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-5 pr-1.5 transition-colors duration-300 focus-within:border-emerald-400/50">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about experience, skills, projects..."
                  className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none"
                />
                <button type="submit" disabled={!input.trim() || loading} aria-label="Send"
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-400 text-zinc-950 transition-all duration-300 ease-out-expo enabled:hover:scale-105 enabled:active:scale-95 disabled:opacity-30">
                  <ArrowUp size={15} strokeWidth={2} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
