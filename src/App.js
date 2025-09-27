import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Code, Briefcase, GraduationCap, Award, Folder, Mail, Github, Linkedin, Car, Flag, School, Building2, Brain, Book, Landmark, Terminal, Shield} from 'lucide-react';
import rafikImage from './rafik.JPG';
import TerminalInterface from './components/TerminalInterface';
import CyberSecurityPortfolio from './components/CyberSecurityPortfolio';
const ModelViewer = lazy(() => import('./components/ModelViewer'));

const Section = ({ children, title, className = '' }) => (
  <motion.section
    className={`py-16 ${className}`}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true, amount: 0.3 }}
  >
    {title && (
      <motion.h2
        className="text-3xl font-bold mb-8 text-blue-300 border-b-2 border-blue-500 pb-2 inline-block"
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {title}
      </motion.h2>
    )}
    {children}
  </motion.section>
);

const Card = ({ icon: Icon, title, subtitle, description, details = [], url }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-sm relative"
      whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center mb-2">
        <Icon className="text-blue-400 mr-2" size={24} />
        <h3 className="text-lg font-semibold text-blue-300">{title}</h3>
        <div className="ml-auto text-blue-300">
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="chevron-up"
                initial={{ rotate: 0 }}
                animate={{ rotate: 180 }}
                exit={{ rotate: 0 }}
              >
                <ChevronDown className="transform rotate-180" size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="chevron-down"
                initial={{ rotate: 180 }}
                animate={{ rotate: 0 }}
                exit={{ rotate: 180 }}
              >
                <ChevronDown size={20} />
              </motion.div> 
            )}
          </AnimatePresence>
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-2">{subtitle}</p>
      <p className="text-gray-300 text-sm">{description}</p>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 space-y-2"
          >
            {details.length > 0 && details.map((detail, index) => (
              <motion.p
                key={index}
                className="text-gray-300 text-sm pl-4 border-l-2 border-blue-500"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                • {detail}
              </motion.p>
            ))}
            
            {url && (
              <motion.a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()} 
              >
                Visit Project
              </motion.a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SkillBadge = ({ skill, level }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.span
        className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm inline-block"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
      >
        {skill}
      </motion.span>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-blue-900/90 text-white text-xs py-1 px-2 rounded"
          >
            {level}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SocialLink = ({ icon: Icon, href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-400 hover:text-blue-300"
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon size={24} />
  </motion.a>
);

const ProfilePicture = () => (
  <motion.div
    className="w-64 h-64 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <img
      src={rafikImage}
      alt="Rafik Manla Hassan"
      className="w-full h-full object-cover"
    />
  </motion.div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);

  const handleAccessGranted = () => {
    setIsAuthenticated(true);
    setShowTerminal(false);
  };

  const handleBackToTerminal = () => {
    setIsAuthenticated(false);
    setShowTerminal(true);
  };

  if (showTerminal && !isAuthenticated) {
    return <TerminalInterface onAccessGranted={handleAccessGranted} />;
  }

  if (isAuthenticated) {
    return (
      <div className="relative">
        <CyberSecurityPortfolio />
        <motion.button
          className="fixed bottom-4 right-4 bg-green-500 text-black p-3 rounded-full shadow-lg hover:bg-green-400 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleBackToTerminal}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <Terminal size={24} />
        </motion.button>
      </div>
    );
  }

  return null;
}

export default App;
