import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Code, Briefcase, GraduationCap, Award, Folder, Mail, Github, Linkedin, Car, Flag, School, Building2 } from 'lucide-react';
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

const Card = ({ icon: Icon, title, subtitle, description, details = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-sm cursor-pointer"
      whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
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
            animate={{ height: "auto", opacity: 1 }}
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
    className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg"
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
      { name: "HTML/CSS", level: "Advanced" },
      { name: "C/C++", level: "Intermediate" },
      { name: "SQL", level: "Intermediate" }
    ],
    "Frameworks & Technologies": [
      { name: "React.js", level: "Advanced" },
      { name: "Node.js", level: "Advanced" },
      { name: "Next.js", level: "Advanced" },
      { name: "Flask", level: "Intermediate" },
      { name: "Angular", level: "Intermediate" },
      { name: "AWS", level: "AWS Solutions Architect" }
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
              title="Software Engineering Intern"
              subtitle="Ministry of Transportation of Ontario (MTO) | May 2023 - Sept 2024"
              description="Developed automation solutions and managed highway technology systems"
              details={[
                "Developed Python automation scripts using Pandas, increasing efficiency by 40%",
                "Transformed 10,000+ highway technology components into Oracle database",
                "Created automated ticketing system using Microsoft Power Apps and Power Automate"
              ]}
            />
            <Card 
              icon={Code}
              title="Freelance Web Developer"
              subtitle="Self-Employed | Sept 2021 - Present"
              description="Full-stack web development for various clients"
              details={[
                "Developed responsive website for Islamic preschool using Next.js and React",
                "Integrated AWS for secure student registration",
                "Collaborated with administrators to enhance site features and performance"
              ]}
            />
            <Card 
              icon={Building2}
              title="Information Security Coordinator"
              subtitle="CIBC | May 2022 - Sept 2022"
              description="Managed security assessments and risk analysis"
              details={[
                "Worked on deviation cases for deals over $500,000",
                "Performed security assessments and risk analysis",
                "Handled 50+ security deviation cases for CIBC's clientele"
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

        {/* <Section title="3D Model Showcase">
          <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-blue-300 mb-4">Interactive 3D Model</h3>
            <Suspense fallback={<div>Loading 3D model...</div>}>
              <ModelViewer modelUrl="/my-3d-model.glb" />
            </Suspense>
            <p className="mt-4 text-gray-300 text-sm">
              This is an interactive 3D model created using Meshy. You can rotate and zoom the model using your mouse or touch gestures.
            </p>
          </div>
        </Section> */}

        <Section title="Education">
          <Card 
            icon={School}
            title="Bachelor of Engineering - Software Engineering"
            subtitle="McMaster University | Expected Graduation: April 2025"
            description="Fourth Year Software Engineering Student"
          />
        </Section>

        <Section title="Get in Touch" className="text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl mb-8">Interested in working together? Let's connect!</p>
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

