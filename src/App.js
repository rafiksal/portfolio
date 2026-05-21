import React, { useState, useEffect } from 'react';
import MainPortfolio from './components/MainPortfolio';
import ChatWidget from './components/ChatWidget';
import TerminalInterface from './components/TerminalInterface';

// ↑ ↑ ↓ ↓ ← → ← → B A — opens the terminal easter egg
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

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
    <>
      <MainPortfolio onChatOpen={() => setChatOpen(true)} />
      <ChatWidget
        isOpen={chatOpen}
        onOpen={() => setChatOpen(true)}
        onClose={() => setChatOpen(false)}
      />
    </>
  );
}

export default App;
