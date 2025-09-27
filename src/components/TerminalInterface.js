import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TerminalInterface = ({ onAccessGranted }) => {
  const [currentPath, setCurrentPath] = useState('/home/visitor');
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);

  // File system simulation - Fixed structure
  const fileSystem = {
    '/': {
      type: 'directory',
      contents: {
        'home': {
          type: 'directory',
          contents: {
            'visitor': {
              type: 'directory',
              contents: {
                'README.txt': {
                  type: 'file',
                  content: `Welcome to Rafik's Cybersecurity Portfolio Terminal

This is a simulated terminal environment where you can explore my cybersecurity skills and projects.

Available commands:
- ls: List directory contents
- cd <directory>: Change directory
- cat <filename>: Display file contents
- help: Show available commands
- whoami: Display current user
- pwd: Show current directory
- clear: Clear terminal screen

Try exploring the system to find the password file and gain access to my portfolio!

Hint: Look for hidden files and directories...`
                },
                'projects': {
                  type: 'directory',
                  contents: {
                    'vulnerability_assessment.txt': {
                      type: 'file',
                      content: `Vulnerability Assessment Project
==============================

Conducted comprehensive security assessments for enterprise systems:
- Identified 15+ critical vulnerabilities
- Implemented OWASP Top 10 security controls
- Reduced attack surface by 40%
- Tools: Nessus, OpenVAS, Burp Suite`
                    },
                    'penetration_testing.txt': {
                      type: 'file',
                      content: `Penetration Testing Engagements
===============================

Performed authorized penetration tests for various organizations:
- Web application security testing
- Network infrastructure assessment
- Social engineering campaigns
- Red team exercises
- Tools: Metasploit, Nmap, Wireshark, Custom scripts`
                    },
                    'incident_response.txt': {
                      type: 'file',
                      content: `Incident Response & Forensics
============================

Led incident response for security breaches:
- Digital forensics analysis
- Malware reverse engineering
- Evidence collection and preservation
- Incident documentation and reporting
- Tools: Volatility, Autopsy, Wireshark, FTK`
                    }
                  }
                },
                'skills': {
                  type: 'directory',
                  contents: {
                    'technical_skills.txt': {
                      type: 'file',
                      content: `Technical Skills
===============

Programming Languages:
- Python (Advanced) - Automation, forensics tools
- JavaScript (Advanced) - Web security testing
- C/C++ (Intermediate) - Exploit development
- Assembly (Intermediate) - Reverse engineering
- SQL (Advanced) - Database security

Security Tools:
- Burp Suite, OWASP ZAP
- Metasploit Framework
- Nmap, Nessus, OpenVAS
- Wireshark, tcpdump
- Volatility, Autopsy
- Custom Python scripts`
                    },
                    'certifications.txt': {
                      type: 'file',
                      content: `Security Certifications
======================

- Certified Ethical Hacker (CEH) - EC-Council
- CompTIA Security+ - CompTIA
- AWS Security Specialty - Amazon Web Services
- Offensive Security Certified Professional (OSCP) - In Progress
- Certified Information Security Manager (CISM) - Planned`
                    }
                  }
                },
                '.hidden': {
                  type: 'directory',
                  contents: {
                    'secrets': {
                      type: 'directory',
                      contents: {
                        'password.txt': {
                          type: 'file',
                          content: `Password File
=============

Username: rafik
Password: cybersecurity2024

Use these credentials to access the main portfolio:
- Type: login rafik cybersecurity2024
- Or: su - rafik (then enter password when prompted)

This password represents my commitment to cybersecurity excellence!`
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  // Command processing
  const processCommand = (command) => {
    const parts = command.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'ls':
        return listDirectory(currentPath, args);
      case 'cd':
        return changeDirectory(args[0]);
      case 'cat':
        return displayFile(args[0]);
      case 'pwd':
        return currentPath;
      case 'whoami':
        return 'visitor';
      case 'clear':
        setTerminalOutput([]);
        return null;
      case 'help':
        return `Available Commands:
==================
quick            - Instant access to portfolio
access           - Instant access to portfolio
enter            - Instant access to portfolio
portfolio        - Instant access to portfolio
password         - Show login credentials
ls [options]     - List directory contents
cd <directory>   - Change directory
cat <filename>   - Display file contents
pwd              - Show current directory
whoami           - Display current user
clear            - Clear terminal screen
help             - Show this help message
login <user> <pass> - Login to system
su - <user>      - Switch user (will prompt for password)
debug            - Debug file system
test             - Test file system structure

Quick Access:
- Type 'quick', 'access', 'enter', or 'portfolio' for instant access
- Type 'password' to see login info
- Or explore with 'ls' to find the password file!`;
      case 'debug':
        const debugDir = getDirectory(currentPath);
        return `Debug Info:
Current Path: ${currentPath}
Directory exists: ${debugDir ? 'Yes' : 'No'}
Directory type: ${debugDir ? debugDir.type : 'N/A'}
Contents: ${debugDir && debugDir.contents ? Object.keys(debugDir.contents).join(', ') : 'N/A'}`;
      case 'test':
        const rootDir = getDirectory('/');
        const homeDir = getDirectory('/home');
        const visitorDir = getDirectory('/home/visitor');
        return `File System Test:
Root exists: ${rootDir ? 'Yes' : 'No'}
/home exists: ${homeDir ? 'Yes' : 'No'}
/home/visitor exists: ${visitorDir ? 'Yes' : 'No'}
Root contents: ${rootDir && rootDir.contents ? Object.keys(rootDir.contents).join(', ') : 'N/A'}`;
      case 'quick':
        return handleLogin('rafik', 'cybersecurity2024');
      case 'password':
        return `Login Credentials:
==================
Username: rafik
Password: cybersecurity2024

Quick login: Type 'quick' or 'login rafik cybersecurity2024'`;
      case 'access':
        return handleLogin('rafik', 'cybersecurity2024');
      case 'enter':
        return handleLogin('rafik', 'cybersecurity2024');
      case 'portfolio':
        return handleLogin('rafik', 'cybersecurity2024');
      case 'login':
        return handleLogin(args[0], args[1]);
      case 'su':
        if (args[0] === '-') {
          return 'Password: ';
        }
        return 'Usage: su - <username>';
      default:
        if (command.trim() === 'cybersecurity2024' && terminalOutput[terminalOutput.length - 1]?.includes('Password:')) {
          return handlePasswordEntry(command);
        }
        return `Command not found: ${cmd}. Type 'help' for available commands.`;
    }
  };

  const listDirectory = (path, args) => {
    const showHidden = args.includes('-a') || args.includes('--all');
    const dir = getDirectory(path);
    
    if (!dir || dir.type !== 'directory') {
      return `ls: cannot access '${path}': No such file or directory`;
    }

    const contents = dir.contents ? Object.keys(dir.contents) : [];
    const visible = showHidden ? contents : contents.filter(name => !name.startsWith('.'));
    
    return visible.join('  ');
  };

  const changeDirectory = (targetPath) => {
    if (!targetPath) {
      setCurrentPath('/home/visitor');
      return '/home/visitor';
    }

    let newPath;
    if (targetPath.startsWith('/')) {
      newPath = targetPath;
    } else if (targetPath === '..') {
      const parts = currentPath.split('/');
      newPath = parts.slice(0, -1).join('/') || '/';
    } else {
      newPath = currentPath === '/' ? `/${targetPath}` : `${currentPath}/${targetPath}`;
    }

    const dir = getDirectory(newPath);
    if (dir && dir.type === 'directory') {
      setCurrentPath(newPath);
      return newPath;
    } else {
      return `cd: ${targetPath}: No such file or directory`;
    }
  };

  const displayFile = (filename) => {
    if (!filename) {
      return 'cat: missing file operand';
    }

    const filePath = filename.startsWith('/') ? filename : `${currentPath}/${filename}`;
    const file = getDirectory(filePath);
    
    if (!file || file.type !== 'file') {
      return `cat: ${filename}: No such file or directory`;
    }

    return file.content;
  };

  const getDirectory = (path) => {
    // Handle root path
    if (path === '/') {
      return fileSystem['/'];
    }
    
    const parts = path.split('/').filter(part => part !== '');
    let current = fileSystem['/'];
    
    // Navigate through the path
    for (const part of parts) {
      if (current && current.contents && current.contents[part]) {
        current = current.contents[part];
      } else {
        return null;
      }
    }
    
    return current;
  };

  const handleLogin = (username, password) => {
    if (username === 'rafik' && password === 'cybersecurity2024') {
      setIsAuthenticated(true);
      onAccessGranted();
      return `Login successful! Welcome, ${username}!
Access granted to Rafik's Cybersecurity Portfolio.
Type 'portfolio' to view the main portfolio.`;
    } else {
      return 'Login failed: Invalid username or password';
    }
  };

  const handlePasswordEntry = (password) => {
    if (password === 'cybersecurity2024') {
      setIsAuthenticated(true);
      onAccessGranted();
      return `Password correct! Welcome, rafik!
Access granted to Rafik's Cybersecurity Portfolio.
Type 'portfolio' to view the main portfolio.`;
    } else {
      return 'su: Authentication failure';
    }
  };

  const addToOutput = (text) => {
    if (text !== null) {
      setTerminalOutput(prev => [...prev, text]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentCommand.trim()) return;

    const output = processCommand(currentCommand);
    addToOutput(`visitor@cybersec-portfolio:${currentPath}$ ${currentCommand}`);
    addToOutput(output);
    
    setCommandHistory(prev => [...prev, currentCommand]);
    setCurrentCommand('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const lastCommand = commandHistory[commandHistory.length - 1];
      if (lastCommand) {
        setCurrentCommand(lastCommand);
      }
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Initial welcome message
    const welcomeMessage = `Welcome to Rafik's Cybersecurity Portfolio Terminal

🚀 INSTANT ACCESS: Type 'quick', 'access', 'enter', or 'portfolio'
🔑 PASSWORD: Type 'password' to see login credentials
📖 HELP: Type 'help' for all commands

Or explore the system with 'ls' to find the password file!

visitor@cybersec-portfolio:${currentPath}$ `;
    
    setTerminalOutput([welcomeMessage]);
  }, []);

  return (
    <div className="bg-black text-green-400 font-mono min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="bg-gray-900 shadow-2xl">
          <div className="bg-gray-800 px-4 py-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-400 text-sm ml-4">Cybersecurity Portfolio Terminal</span>
            </div>
          </div>
          
          <div className="p-6 h-[70vh] overflow-y-auto">
            <AnimatePresence>
              {terminalOutput.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1 }}
                  className="mb-1"
                >
                  <pre className="whitespace-pre-wrap">{line}</pre>
                </motion.div>
              ))}
            </AnimatePresence>
            
            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="text-green-400 mr-2">
                visitor@cybersec-portfolio:{currentPath}$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent text-green-400 outline-none flex-1"
                autoFocus
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalInterface;
