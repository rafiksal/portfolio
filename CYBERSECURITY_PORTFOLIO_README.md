# Cybersecurity Portfolio Terminal Interface

## Overview
This is a unique cybersecurity-themed portfolio that presents itself as a terminal interface where visitors must "hack" their way in to access the main portfolio content.

## How It Works

### Terminal Interface
- Visitors are greeted with a terminal-like interface
- They can use common Unix commands to explore the system
- The goal is to find the password file and gain access to the portfolio

### Available Commands
- `ls` - List directory contents
- `ls -a` - List all files including hidden ones
- `cd <directory>` - Change directory
- `cat <filename>` - Display file contents
- `pwd` - Show current directory
- `whoami` - Display current user
- `help` - Show available commands
- `clear` - Clear terminal screen
- `login <username> <password>` - Login to system
- `su - <username>` - Switch user (will prompt for password)

### Finding the Password
1. Use `ls` to explore the directory structure
2. Look for hidden directories with `ls -a`
3. Navigate to `.hidden/secrets/` directory
4. Use `cat password.txt` to view the password
5. Login with username: `rafik` and password: `cybersecurity2024`

### Portfolio Content
Once authenticated, visitors can access:
- Cybersecurity skills and certifications
- Security projects and tools
- Professional experience in security roles
- Contact information

## Features
- Interactive terminal simulation
- File system with cybersecurity-themed content
- Password-based authentication
- Responsive design
- Smooth animations and transitions
- Ability to return to terminal from portfolio

## Technical Stack
- React.js
- Framer Motion (animations)
- Tailwind CSS (styling)
- Lucide React (icons)

## Getting Started
1. Run `npm start` to start the development server
2. Open your browser to the local development URL
3. Start exploring the terminal interface!

## Security Note
This is a demonstration portfolio. The "hacking" is simulated and educational in nature, showcasing cybersecurity skills and knowledge.
