import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Flag, School, Building2, Mail, Github, Linkedin } from 'lucide-react';

const ModelViewer = lazy(() => import('./ModelViewer'));

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
      className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-sm"
      whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center mb-2">
        <Icon className="text-blue-400 mr-2" size={24} />
        <h3 className="text-lg font-semibold text-blue-300">{title}</h3>
      </div>
      <p className="text-gray-400 text-sm mb-2">{subtitle}</p>
      <p className="text-gray-300 text-sm">{description}</p>

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
                className="text-gray-300 text-sm pl-4 border-l-2 border-blue-500"
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
      <div className="mt-4 text-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
        >
          Visit Project
        </a>
      </div>
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
    className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <img
      src="rafik.jpg"
      alt="Rafik Manla Hassan"
      className="w-full h-full object-cover"
    />
  </motion.div>
);

function Portfolio() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <header className="py-8 flex justify-between items-center">
          <motion.h1
            className="text-3xl font-bold"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Rafik Manla Hassan
          </motion.h1>
          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SocialLink icon={Github} href="https://github.com/rafikmanla" />
            <SocialLink icon={Linkedin} href="https://linkedin.com/in/rafikmanla" />
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
          </div>
          <ProfilePicture />
        </Section>

        <Section title="Projects">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              icon={Car}
              title="DrivingMan"
              subtitle="Founder & Developer | April 2024 - Present"
              description="Web platform for manual driving lessons business"
              url="https://drivingman.ca"
              details={[
                "Built with React.js and Tailwind CSS",
                "Integrated Acuity for scheduling and Formspree for contact management",
                "Optimized for mobile-first interaction and SEO",
              ]}
            />
            <Card
              icon={Flag}
              title="F1 Race Predictor"
              subtitle="AI Project | June 2024 - Present"
              description="Machine learning-based F1 race prediction platform"
              url="https://f1racepredictorapp.com"
              details={[
                "Built with React.js, Tailwind CSS, and Flask backend",
                "Implemented ML model using Python, Scikit-learn, and Pandas",
                "Real-time race data integration and predictions",
              ]}
            />
          </div>
        </Section>
      </div>
    </div>
  );
}

export default Portfolio;
