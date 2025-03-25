import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Code, Briefcase, GraduationCap, Award, Folder, Mail, Github, Linkedin, Car, Flag, School, Building2, Brain, Book, Landmark, Sun, Moon} from 'lucide-react';
import rafikImage from './rafik.JPG';
import { ThemeProvider, useTheme } from './ThemeContext';

const Section = ({ children, title, className = '' }) => {
  const { darkMode } = useTheme();
  
  return (
    <motion.section
      className={`py-16 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {title && (
        <motion.h2
          className={`text-3xl font-bold mb-8 ${darkMode ? 'text-blue-300 border-blue-500' : 'text-blue-700 border-blue-600'} border-b-2 pb-2 inline-block`}
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
};

const Card = ({ icon: Icon, title, subtitle, description, details = [], url, isBlog, blogContent }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBlog, setShowBlog] = useState(false);
  const { darkMode } = useTheme();

  return (
    <>
      <motion.div
        className={`${darkMode ? 'bg-white/10' : 'bg-blue-50 shadow-md'} p-6 rounded-lg backdrop-blur-sm relative`}
        whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(30, 64, 175, 0.1)'}` }}
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center mb-2">
          <Icon className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} size={24} />
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>{title}</h3>
          <div className={`ml-auto ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.div
                  key="chevron-up"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  exit={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="chevron-down"
                  initial={{ rotate: 180 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-2`}>{subtitle}</p>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>{description}</p>

        <AnimatePresence>
          {isExpanded && details.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 space-y-2"
            >
              {details.map((detail, index) => (
                <motion.p
                  key={index}
                  className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm pl-4 border-l-2 ${darkMode ? 'border-blue-500' : 'border-blue-600'}`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  • {detail}
                </motion.p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Button for visiting the project */}
        {(url || isBlog) && (
          <div className="mt-4 text-center">
            <a
              href={url}
              target={isBlog ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className={`inline-block px-4 py-2 ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} text-white rounded-lg font-semibold hover:bg-blue-700`}
              onClick={(e) => {
                e.stopPropagation();
                if (isBlog) {
                  e.preventDefault();
                  setShowBlog(true);
                }
              }}
            >
              {isBlog ? "View Project Details" : "Visit Project"}
            </a>
          </div>
        )}
      </motion.div>

      {/* Blog Modal */}
      {isBlog && showBlog && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowBlog(false)}
        >
          <motion.div 
            className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg shadow-xl p-6`}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                {blogContent.title}
              </h2>
              <button 
                onClick={() => setShowBlog(false)}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="space-y-6">
              {blogContent.sections.map((section, index) => (
                <div key={index}>
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {section.heading}
                  </h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                    {section.content}
                  </p>
                </div>
              ))}
              
              {/* Media Gallery */}
              {blogContent.mediaItems && blogContent.mediaItems.length > 0 && (
                <div className="mt-8">
                  <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    Project Gallery
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {blogContent.mediaItems.map((item, index) => (
                      <div key={index} className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-2`}>
                        <div className={`aspect-w-16 aspect-h-9 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
                          {/* Placeholder for actual images */}
                          <div className={`text-center p-12 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                              <circle cx="8.5" cy="8.5" r="1.5"></circle>
                              <polyline points="21 15 16 10 5 21"></polyline>
                            </svg>
                            <p className="mt-2 text-sm">{item.placeholder}</p>
                          </div>
                        </div>
                        <p className={`mt-2 text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {item.caption}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-8 border-t pt-6 text-center">
                <p className={`italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  This project is currently in development. Stay tuned for the official launch!
                </p>
                <button
                  onClick={() => setShowBlog(false)}
                  className={`mt-4 px-6 py-2 ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} text-white rounded-lg font-semibold hover:bg-blue-700`}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

const SkillBadge = ({ skill, level }) => {
  const { darkMode } = useTheme();
  
  const getLevelColor = () => {
    if (darkMode) {
      switch (level) {
        case 'Advanced': return 'bg-green-500/20 text-green-300 border-green-500';
        case 'Intermediate': return 'bg-blue-500/20 text-blue-300 border-blue-500';
        case 'Beginner': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500';
        case 'Certified': return 'bg-purple-500/20 text-purple-300 border-purple-500';
        default: return 'bg-gray-500/20 text-gray-300 border-gray-500';
      }
    } else {
      switch (level) {
        case 'Advanced': return 'bg-green-100 text-green-800 border-green-600';
        case 'Intermediate': return 'bg-blue-100 text-blue-800 border-blue-600';
        case 'Beginner': return 'bg-yellow-100 text-yellow-800 border-yellow-600';
        case 'Certified': return 'bg-purple-100 text-purple-800 border-purple-600';
        default: return 'bg-gray-100 text-gray-800 border-gray-600';
      }
    }
  };

  return (
    <motion.span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor()}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {skill}
    </motion.span>
  );
};

const SocialLink = ({ icon: Icon, href }) => {
  const { darkMode } = useTheme();
  
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon size={24} />
    </motion.a>
  );
};

const ProfilePicture = () => {
  const { darkMode } = useTheme();
  
  return (
    <motion.div
      className={`w-48 h-48 rounded-full overflow-hidden border-4 ${darkMode ? 'border-blue-500' : 'border-blue-700'} shadow-lg`}
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
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { darkMode } = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className={`max-w-lg mx-auto ${darkMode ? 'bg-white/10' : 'bg-blue-50 shadow-md'} p-6 rounded-lg backdrop-blur-sm`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4">
        <label htmlFor="name" className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={`w-full px-3 py-2 ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-gray-50 text-gray-800 border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="email" className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={`w-full px-3 py-2 ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-gray-50 text-gray-800 border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="message" className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="4"
          className={`w-full px-3 py-2 ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-gray-50 text-gray-800 border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        ></textarea>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
      
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 p-2 ${darkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'} rounded-md text-center`}
        >
          Message sent successfully!
        </motion.div>
      )}
    </motion.form>
  );
};

const TimelineItem = ({ icon: Icon, title, subtitle, description, details = [], isLast = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { darkMode } = useTheme();
  
  return (
    <div className="relative pl-8 pb-8">
      {/* Timeline line */}
      {!isLast && (
        <div 
          className={`absolute left-4 top-8 w-0.5 h-full ${darkMode ? 'bg-blue-500/50' : 'bg-blue-600/50'}`}
          style={{ transform: 'translateX(-50%)' }}
        ></div>
      )}
      
      {/* Timeline dot */}
      <div 
        className={`absolute left-4 top-2 w-6 h-6 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} flex items-center justify-center`}
        style={{ transform: 'translateX(-50%)' }}
      >
        <Icon size={16} className="text-white" />
      </div>
      
      {/* Content */}
      <motion.div
        className={`${darkMode ? 'bg-white/10' : 'bg-blue-50 shadow-md'} p-6 rounded-lg backdrop-blur-sm cursor-pointer`}
        whileHover={{ scale: 1.01, boxShadow: `0 0 20px ${darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(30, 64, 175, 0.1)'}` }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>{title}</h3>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`${darkMode ? 'text-blue-300' : 'text-blue-700'}`}
          >
            <ChevronDown size={20} />
          </motion.div>
        </div>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-2`}>{subtitle}</p>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>{description}</p>
        
        <AnimatePresence>
          {isExpanded && details.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 space-y-2"
            >
              {details.map((detail, index) => (
                <motion.p
                  key={index}
                  className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm pl-4 border-l-2 ${darkMode ? 'border-blue-500' : 'border-blue-600'}`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  • {detail}
                </motion.p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

function App() {
  const [projectFilter, setProjectFilter] = useState('all');
  
  const skills = {
    "Programming Languages": [
      { name: "Java", level: "Advanced" },
      { name: "Python", level: "Advanced" },
      { name: "JavaScript", level: "Advanced" },
      { name: "TypeScript", level: "Intermediate" },
      { name: "C++", level: "Intermediate" },
      { name: "SQL", level: "Intermediate" }
    ],
    "Frameworks & Technologies": [
      { name: "React.js", level: "Advanced" },
      { name: "Angular", level: "Intermediate" },
      { name: "Spring Framework", level: "Intermediate" },
      { name: "Next.js", level: "Intermediate" },
      { name: "AWS", level: "Intermediate" },
      { name: "Flask", level: "Intermediate" },
      { name: "Tailwind CSS", level: "Intermediate" },
      { name: "Node.js", level: "Intermediate" }
    ],
    "Tools": [
      { name: "GitHub", level: "Advanced" },
      { name: "Power Platforms", level: "Advanced" },
      { name: "Agile Development", level: "Advanced" },
      { name: "SDLC", level: "Advanced" },
      { name: "Software Testing", level: "Intermediate" }
    ],
    "Certifications": [
      { name: "AWS Solutions Architect", level: "Certified" }
    ]
  };
  
  const projects = [
    {
      icon: Car,
      title: "DrivingMan",
      subtitle: "Founder & Developer | April 2024 - Present",
      description: "Web platform for manual driving lessons",
      url: "https://drivingman.ca",
      details: [
        "Developed using React.js and Tailwind CSS",
        "Integrated AWS Lambda for operations",
        "Optimized backend with Spring Boot"
      ],
      category: "web"
    },
    {
      icon: Brain,
      title: "Motive App",
      subtitle: "Lead Developer | February 2025 - Present",
      description: "Comprehensive event coordination platform",
      isBlog: true,
      blogContent: {
        title: "Motive App: Building a Modern Social Event Platform",
        sections: [
          {
            heading: "Project Overview",
            content: "The Motive App is a comprehensive mobile application designed to streamline social event coordination and gathering management. Built with modern technologies including React Native, TypeScript, and Supabase (PostgreSQL), this app offers users a seamless experience for creating, discovering, and managing social events (referred to as \"motives\" in the application)."
          },
          {
            heading: "Technical Architecture",
            content: "We've implemented a three-tier architecture with a React Native frontend, Supabase as our Backend-as-a-Service, and PostgreSQL for our database layer. This design ensures scalability while maintaining performance through distributed systems principles."
          },
          {
            heading: "Key Features",
            content: "The app includes robust event management with detailed information fields, an invite system for adding friends, RSVP functionality, and event history tracking. Our location and mapping features offer an interactive map with custom clustering and integration with native map applications. Social features include a friend request system, user profiles, and activity notifications. Everything updates in real-time through WebSocket connections."
          },
          {
            heading: "Technical Challenges",
            content: "We've overcome several significant challenges during development. Our custom location clustering algorithm prevents map clutter when multiple events occur in similar locations. We've implemented Supabase's real-time subscription system to ensure all users receive immediate updates about event changes. As user data grew, we optimized performance through strategic denormalization and composite indexes. Cross-platform compatibility was ensured through careful architecture planning."
          },
          {
            heading: "Current Status",
            content: "The Motive App is currently in late-stage development. We've completed the core functionality and are now focusing on UI polish, performance optimization, and user testing before our official launch. Below you can see some screenshots of our current progress."
          }
        ],
        mediaItems: [
          {
            type: "image",
            caption: "Main Dashboard with Upcoming Events",
            placeholder: "dashboard-screenshot.jpg"
          },
          {
            type: "image",
            caption: "Interactive Map View with Event Clustering",
            placeholder: "map-view-screenshot.jpg"
          },
          {
            type: "image",
            caption: "Event Creation Interface",
            placeholder: "event-creation-screenshot.jpg"
          }
        ]
      },
      details: [
        "Built distributed, multi-tiered system architecture using React Native, TypeScript, and Supabase",
        "Designed scalable PostgreSQL database with geospatial indexing and optimized query performance",
        "Implemented fault-tolerant WebSocket communication for reliable real-time notifications",
        "Created custom algorithms for location clustering and friend discovery"
      ],
      category: "web"
    },
    {
      icon: Flag,
      title: "F1 Race Predictor",
      subtitle: "AI Project | August 2024 - Present",
      description: "Machine learning platform for race predictions",
      url: "https://f1racepredictorapp.com",
      details: [
        "ML model with Scikit-learn",
        "Frontend with Angular and TypeScript",
        "Real-time API integration with Spring Boot"
      ],
      category: "ai"
    },
    {
      icon: Book,
      title: "Jana Academy",
      subtitle: "Freelance Project | February 2024 - Present",
      description: "Responsive multilingual website for an Islamic school.",
      url: "https://janaacademy.ca",
      details: [
        "HTML5 and CSS3 implementation",
        "Supports Arabic and English",
        "Focus on engagement and usability"
      ],
      category: "web"
    }
  ];
  
  const experiences = [
    {
      icon: Building2,
      title: "Ministry of Transportation of Ontario (MTO)",
      subtitle: "Software Engineering Intern | May 2023 - Sept 2024",
      description: "Developed Python automation scripts and managed database systems",
      details: [
        "Improved data processing efficiency by 40% using Pandas",
        "Transformed 10,000+ components to Oracle DB",
        "Automated ticket management with Power Apps"
      ]
    },
    {
      icon: Landmark,
      title: "CIBC",
      subtitle: "Information Security Coordinator | May 2022 - Sept 2022",
      description: "Managed security assessments and risk mitigation",
      details: [
        "Analyzed transactions over $500,000",
        "Performed vulnerability assessments",
        "Enhanced transaction security for 11M+ clients"
      ]
    },
    {
      icon: Code,
      title: "Raf's Solutions",
      subtitle: "Freelance Web Developer | Sept 2021 - Present",
      description: "Developed and deployed full-stack web solutions",
      details: [
        "Built apps with React.js and Angular",
        "Deployed solutions on AWS",
        "Optimized backend systems with Spring Framework"
      ]
    }
  ];
  
  const filteredProjects = projectFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === projectFilter);

  return (
    <ThemeProvider>
      <AppContent 
        projectFilter={projectFilter}
        setProjectFilter={setProjectFilter}
        skills={skills}
        projects={projects}
        experiences={experiences}
        filteredProjects={filteredProjects}
      />
    </ThemeProvider>
  );
}

// Separate component to use the theme context
const AppContent = ({ 
  projectFilter, 
  setProjectFilter, 
  skills,
  projects,
  experiences,
  filteredProjects
}) => {
  const { darkMode, setDarkMode } = useTheme();
  
  return (
    <div className={`${darkMode 
      ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-black' 
      : 'bg-gradient-to-br from-blue-50 via-gray-100 to-white'} ${
      darkMode ? 'text-white' : 'text-gray-800'} min-h-screen transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto px-4">
        <header className="py-8 flex justify-between items-center">
          <motion.h1 
            className={`text-3xl font-bold ${darkMode ? '' : 'text-blue-800'}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Rafik Manla Hassan
          </motion.h1>
          <motion.div
            className="flex space-x-4 items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <SocialLink icon={Github} href="https://github.com/rafiksalam" />
            <SocialLink icon={Linkedin} href="https://www.linkedin.com/in/manlahar/" />
          </motion.div>
        </header>

        <Section className="flex flex-col md:flex-row items-center justify-between py-20">
          <div className="md:w-2/3 mb-8 md:mb-0">
            <motion.h2 
              className="text-5xl font-bold mb-4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Software Engineer
            </motion.h2>
            <motion.p
              className="text-xl text-blue-300 mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Fourth Year Software Engineering Student at McMaster University
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="w-full mb-4">
                  <h3 className="text-sm text-gray-400 mb-2">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <SkillBadge key={skill.name} skill={skill.name} level={skill.level} />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          <ProfilePicture />
        </Section>

        <Section title="Experience">
          <div className="max-w-3xl mx-auto">
            {experiences.map((exp, index) => (
              <TimelineItem
                key={exp.title}
                icon={exp.icon}
                title={exp.title}
                subtitle={exp.subtitle}
                description={exp.description}
                details={exp.details}
                isLast={index === experiences.length - 1}
              />
            ))}
          </div>
        </Section>

        <Section title="Projects">
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={() => setProjectFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                projectFilter === 'all' 
                  ? (darkMode ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white') 
                  : (darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-600')
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Projects
            </motion.button>
            <motion.button
              onClick={() => setProjectFilter('web')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                projectFilter === 'web' 
                  ? (darkMode ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white') 
                  : (darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-600')
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Web Development
            </motion.button>
            <motion.button
              onClick={() => setProjectFilter('ai')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                projectFilter === 'ai' 
                  ? (darkMode ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white') 
                  : (darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-600')
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              AI Projects
            </motion.button>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={projectFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <Card
                  key={project.title}
                  icon={project.icon}
                  title={project.title}
                  subtitle={project.subtitle}
                  description={project.description}
                  url={project.url}
                  details={project.details}
                  isBlog={project.isBlog}
                  blogContent={project.blogContent}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </Section>

        <Section title="Education">
          <Card 
            icon={School}
            title="Bachelor of Engineering - Software Engineering"
            subtitle="McMaster University | Expected Graduation: April 2025"
            description="Fourth Year Software Engineering Student with a cumulative GPA of 3.5/4.0."
          />
        </Section>

        <Section title="Get in Touch" className="text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className={`text-xl mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Interested in collaborating? Let's connect!</p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <motion.a
                href="mailto:rafiksalam81@gmail.com"
                className={`inline-flex items-center px-8 py-3 ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} text-white rounded-full font-bold text-lg`}
                whileHover={{ scale: 1.05, backgroundColor: darkMode ? "#3b82f6" : "#2563eb" }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="mr-2" size={20} />
                Email Me
              </motion.a>
              
              <p className={`mt-4 md:mt-0 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Phone: 647-920-0209
              </p>
            </div>
            
            <div className="mt-12">
              <ContactForm />
            </div>
          </motion.div>
        </Section>
      </div>

      <motion.div
        className="fixed bottom-4 right-4 bg-blue-500 rounded-full p-2 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ChevronDown className="transform rotate-180" size={24} />
      </motion.div>
    </div>
  );
};

export default App;
