import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import MainPortfolio from './components/MainPortfolio';
import ProjectPage from './components/ProjectPage';
import ChatWidget from './components/ChatWidget';
import TerminalInterface from './components/TerminalInterface';

// ↑ ↑ ↓ ↓ ← → ← → B A — opens the terminal easter egg
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div className="grain relative flex min-h-[100dvh] flex-col items-center justify-center bg-zinc-950 px-6 text-center">
      <p className="font-mono text-sm text-emerald-400">404</p>
      <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-zinc-100">Page not found.</h1>
      <p className="mt-4 text-zinc-400">This page doesn't exist or has moved.</p>
      <Link to="/" className="mt-8 text-sm font-semibold text-zinc-300 underline decoration-zinc-600 underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-emerald-400">
        Back to the portfolio
      </Link>
    </div>
  );
}

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    let seq = [];
    const onKey = (e) => {
      seq = [...seq, e.key].slice(-10);
      if (seq.join(',') === KONAMI.join(',')) {
        setTerminalOpen(true);
        seq = [];
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (terminalOpen) {
    return <TerminalInterface onAccessGranted={() => setTerminalOpen(false)} />;
  }

  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPortfolio onChatOpen={() => setChatOpen(true)} />} />
        <Route path="/projects/:slug" element={<ProjectPage onChatOpen={() => setChatOpen(true)} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ChatWidget
        isOpen={chatOpen}
        onOpen={() => setChatOpen(true)}
        onClose={() => setChatOpen(false)}
      />
    </HashRouter>
  );
}

export default App;
