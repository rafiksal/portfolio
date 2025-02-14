import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Code, Briefcase, GraduationCap, Award, Folder, Mail, Github, Linkedin, Car, Flag, School, Building2, Brain, Book, Landmark} from 'lucide-react';
import rafikImage from './rafik.JPG';
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
          <div className="grid grid-cols-1 gap-6">
            <Card 
              icon={Building2}
              title="Ministry of Transportation of Ontario (MTO)"
              subtitle="Software Engineering Intern | May 2023 - Sept 2024"
              description="Developed Python automation scripts and managed database systems"
              details={[
                "Improved data processing efficiency by 40% using Pandas",
                "Transformed 10,000+ components to Oracle DB",
                "Automated ticket management with Power Apps"
              ]}
            />
            <Card 
              icon={Landmark}
              title="CIBC"
              subtitle="Information Security Coordinator | May 2022 - Sept 2022"
              description="Managed security assessments and risk mitigation"
              details={[
                "Analyzed transactions over $500,000",
                "Performed vulnerability assessments",
                "Enhanced transaction security for 11M+ clients"
              ]}
            />
            <Card 
              icon={Code}
              title="Raf’s Solutions"
              subtitle="Freelance Web Developer | Sept 2021 - Present"
              description="Developed and deployed full-stack web solutions"
              details={[
                "Built apps with React.js and Angular",
                "Deployed solutions on AWS",
                "Optimized backend systems with Spring Framework"
              ]}
            />
          </div>
        </Section>

        <Section title="Projects">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              icon={Car}
              title="DrivingMan"
              subtitle="Founder & Developer | April 2024 - Present"
              description="Web platform for manual driving lessons"
              url="https://drivingman.ca"
              details={[
                "Developed using React.js and Tailwind CSS",
                "Integrated AWS Lambda for operations",
                "Optimized backend with Spring Boot"
              ]}
            />
            <Card
              icon={Flag}
              title="F1 Race Predictor"
              subtitle="AI Project | August 2024 - Present"
              description="Machine learning platform for race predictions"
              url="https://f1racepredictorapp.com"
              details={[
                "ML model with Scikit-learn",
                "Frontend with Angular and TypeScript",
                "Real-time API integration with Spring Boot"
              ]}
            />
            <Card
              icon={Book}
              title="Jana Academy"
              subtitle="Freelance Project | February 2024 - Present"
              description="Responsive multilingual website for an Islamic school."
              url="https://janaacademy.ca"
              details={[
                "HTML5 and CSS3 implementation",
                "Supports Arabic and English",
                "Focus on engagement and usability"
              ]}
            />
          </div>
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
            <p className="text-xl mb-8">Interested in collaborating? Let's connect!</p>
            <motion.a
              href="mailto:rafiksalam81@gmail.com"
              className="inline-flex items-center px-8 py-3 bg-blue-500 text-white rounded-full font-bold text-lg"
              whileHover={{ scale: 1.05, backgroundColor: "#3b82f6" }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="mr-2" size={20} />
              Contact Me
            </motion.a>
            <p className="mt-4 text-gray-400">
              Phone: 647-920-0209
            </p>
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
}

export default App;
