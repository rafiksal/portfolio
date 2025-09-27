import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  Bug, 
  Network, 
  FileText, 
  Award, 
  Code, 
  Building2, 
  School, 
  Mail, 
  Github, 
  Linkedin,
  Terminal,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import rafikImage from './rafik.JPG';

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
        className="text-3xl font-bold mb-8 text-green-400 border-b-2 border-green-500 pb-2 inline-block"
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

const Card = ({ icon: Icon, title, subtitle, description, details = [], url, status = 'completed' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-400" size={16} />;
      case 'in-progress':
        return <AlertTriangle className="text-yellow-400" size={16} />;
      case 'planned':
        return <XCircle className="text-red-400" size={16} />;
      default:
        return <CheckCircle className="text-green-400" size={16} />;
    }
  };

  return (
    <motion.div
      className="bg-gray-900/50 p-6 rounded-lg shadow-lg backdrop-blur-sm border border-green-500/30 relative"
      whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)' }}
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center mb-2">
        <Icon className="text-green-400 mr-2" size={24} />
        <h3 className="text-lg font-semibold text-green-300 flex-1">{title}</h3>
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="text-xs text-gray-400">{status}</span>
        </div>
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
                className="text-gray-300 text-sm pl-4 border-l-2 border-green-500"
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
                className="block mt-4 text-center bg-green-500 text-black py-2 rounded-md hover:bg-green-400 transition-colors font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                View Project
              </motion.a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SkillBadge = ({ skill, level, category }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'expert':
        return 'bg-green-500/30 text-green-300 border-green-500';
      case 'advanced':
        return 'bg-blue-500/30 text-blue-300 border-blue-500';
      case 'intermediate':
        return 'bg-yellow-500/30 text-yellow-300 border-yellow-500';
      case 'beginner':
        return 'bg-red-500/30 text-red-300 border-red-500';
      default:
        return 'bg-gray-500/30 text-gray-300 border-gray-500';
    }
  };

  return (
    <motion.div
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.span
        className={`px-3 py-1 rounded-full text-sm inline-block border ${getLevelColor(level)}`}
        whileHover={{ scale: 1.1 }}
      >
        {skill}
      </motion.span>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white text-xs py-1 px-2 rounded border border-green-500"
          >
            {level} - {category}
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
    className="text-green-400 hover:text-green-300"
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon size={24} />
  </motion.a>
);

const ProfilePicture = () => (
  <motion.div
    className="w-64 h-64 rounded-full overflow-hidden border-4 border-green-500 shadow-lg"
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

function CyberSecurityPortfolio() {
  const skills = {
    "Cybersecurity & Governance": [
      { name: "NIST CSF", level: "Advanced", category: "Risk Management" },
      { name: "ISO 27001/27005", level: "Advanced", category: "Information Security" },
      { name: "Threat Risk Assessments", level: "Advanced", category: "Risk Analysis" },
      { name: "Risk Management", level: "Advanced", category: "Risk Governance" },
      { name: "Penetration Testing", level: "Advanced", category: "Security Testing" },
      { name: "Cloud Security Standards", level: "Advanced", category: "Cloud Security" },
      { name: "Vendor Risk Assessments", level: "Advanced", category: "Supply Chain Security" }
    ],
    "Programming Languages": [
      { name: "Java", level: "Advanced", category: "Backend Development" },
      { name: "Python", level: "Expert", category: "Data Analysis & Automation" },
      { name: "JavaScript", level: "Advanced", category: "Frontend Development" },
      { name: "TypeScript", level: "Advanced", category: "Type-Safe Development" },
      { name: "C++", level: "Intermediate", category: "System Programming" },
      { name: "SQL", level: "Advanced", category: "Database Management" },
      { name: "NoSQL", level: "Advanced", category: "Database Management" }
    ],
    "Frameworks & Technologies": [
      { name: "Spring", level: "Advanced", category: "Java Framework" },
      { name: "React", level: "Expert", category: "Frontend Framework" },
      { name: "Angular", level: "Intermediate", category: "Frontend Framework" },
      { name: "Apache Spark", level: "Advanced", category: "Big Data Processing" },
      { name: "Next.js", level: "Advanced", category: "React Framework" },
      { name: "Flask", level: "Advanced", category: "Python Framework" },
      { name: "Node.js", level: "Advanced", category: "Backend Runtime" },
      { name: "Tailwind CSS", level: "Expert", category: "CSS Framework" },
      { name: "REST API", level: "Expert", category: "API Development" }
    ],
    "Tools & Platforms": [
      { name: "AWS", level: "Advanced", category: "Cloud Platform" },
      { name: "GitLab CI/CD", level: "Advanced", category: "DevOps" },
      { name: "Power BI", level: "Advanced", category: "Data Visualization" },
      { name: "Power Apps", level: "Advanced", category: "Low-Code Development" },
      { name: "Power Automate", level: "Advanced", category: "Workflow Automation" },
      { name: "Agile Development", level: "Expert", category: "Project Management" },
      { name: "Software Testing", level: "Advanced", category: "Quality Assurance" }
    ]
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-green-900 to-black text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <header className="py-8 flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Terminal className="text-green-400" size={32} />
            <h1 className="text-3xl font-bold text-green-400">Rafik Manla Hassan</h1>
          </motion.div>
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
              className="text-xl text-green-300 mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Pursuing Master's in Cybersecurity & Threat Intelligence | Ethical Hacker | Security Researcher
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
                      <SkillBadge 
                        key={skill.name} 
                        skill={skill.name} 
                        level={skill.level}
                        category={skill.category}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          <ProfilePicture />
        </Section>

        <Section title="Security Experience">
          <div className="grid grid-cols-1 gap-6">
            <Card
              icon={Building2}
              title="Ministry of Transportation of Ontario (MTO)"
              subtitle="Systems and Data Analysis Intern | May 2023 - September 2024"
              description="Built robust ETL pipelines and integrated NoSQL databases to support high-volume analytics"
              details={[
                "Built robust ETL pipelines using Python (Pandas, NumPy, PySpark) and integrated NoSQL databases (MongoDB) to support high-volume analytics",
                "Migrated and optimized 10K+ excel legacy records into Oracle and NoSQL schemas, cutting data retrieval time by 60%",
                "Utilized Apache Spark for distributed processing of large-scale traffic and infrastructure datasets to uncover trends in congestion and maintenance needs",
                "Collaborated in Agile sprints and deployed automated tools via GitLab CI/CD, improving reporting workflows across departments"
              ]}
            />
            <Card
              icon={Shield}
              title="CIBC"
              subtitle="Information Security Coordinator | May 2022 - September 2022"
              description="Supported cybersecurity risk management by investigating risk deviation cases for high-value transactions"
              details={[
                "Supported cybersecurity risk management by investigating risk deviation cases for high-value transactions in alignment with internal controls, NIST/ISO 27001-based frameworks, and cloud security standards",
                "Assisted in conducting Threat Risk Assessments (TRAs) and translating technical risks into business impacts, strengthening governance and compliance reporting",
                "Collaborated with security and audit teams to analyze vulnerabilities, interpret security policies, and recommend remediation measures for systems supporting 11M+ clients",
                "Contributed to security awareness and governance initiatives by assisting with policy interpretation, remediation tracking, and aligning risk mitigation with business objectives"
              ]}
            />
            <Card
              icon={Code}
              title="Raf's Web Solutions"
              subtitle="Freelance Web Developer | Sept 2021 - Present"
              description="Provided full-stack web development and consulting services"
              details={[
                "Developed responsive web applications for 20+ clients",
                "Built custom web solutions using React, Next.js, and modern frameworks",
                "Performed web application development and optimization",
                "Created interactive user interfaces and user experience designs",
                "Implemented scalable web solutions for small businesses"
              ]}
            />
          </div>
        </Section>

        <Section title="Projects">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              icon={AlertTriangle}
              title="Ransomware Attack Simulation & Response Playbook"
              subtitle="August 2025 - Present"
              description="Built a controlled lab to simulate a ransomware attack on a small network"
              status="in-progress"
              details={[
                "Built a controlled lab to simulate a ransomware attack on a small network",
                "Practiced identifying the infection vector, isolating affected systems, and restoring from backups",
                "Developed an Incident Response Playbook with step-by-step recovery actions, aligned with NIST Incident Response Lifecycle"
              ]}
            />
            <Card
              icon={Code}
              title="DrivingMan.ca - Founder & Developer"
              subtitle="April 2024 – September 2024"
              description="Launched a mobile-first manual driving lesson website using React.js and Tailwind CSS"
              url="https://drivingman.ca"
              status="completed"
              details={[
                "Launched a mobile-first manual driving lesson website using React.js and Tailwind CSS, reaching 1K+ users in the first 2 months",
                "Integrated AWS Lambda and Spring Boot to streamline backend scheduling and user management"
              ]}
            />
            <Card
              icon={Building2}
              title="Motive App - Event Coordination Platform"
              subtitle="Full-Stack Development | 2024"
              description="Developed a comprehensive event coordination platform showcasing full-stack development skills"
              status="completed"
              details={[
                "Built responsive frontend using React.js with modern UI/UX design principles",
                "Developed RESTful API backend using Node.js and Express.js for event management",
                "Implemented real-time features using WebSocket for live event updates and notifications",
                "Integrated payment processing system for event registration and ticket sales",
                "Created admin dashboard for event organizers with analytics and management tools",
                "Designed database schema using MongoDB for scalable event and user data storage",
                "Implemented user authentication, role-based access control, and secure data handling"
              ]}
            />
            <Card
              icon={AlertTriangle}
              title="Smart Fire Detection System - Capstone Project"
              subtitle="McMaster University | 2024"
              description="Developed an IoT-based smart fire detection system using Next.js, React, and embedded sensors"
              status="completed"
              details={[
                "Built a comprehensive fire detection system using Next.js and React for the frontend interface",
                "Collaborated with embedded systems team to integrate multiple sensor types (smoke, temperature, gas)",
                "Developed real-time data visualization dashboard for monitoring sensor readings and alerts",
                "Implemented automated alert system with email notifications and mobile app integration",
                "Created responsive web interface for remote monitoring and system configuration",
                "Designed scalable architecture to support multiple sensor nodes and real-time data processing"
              ]}
            />
            <Card
              icon={Shield}
              title="Enterprise Security Risk Assessment Framework"
              subtitle="Capstone Project | 2025"
              description="NIST-based security risk management framework for critical infrastructure"
              url="https://github.com/rafiksalam/enterprise-risk-framework"
              status="completed"
              details={[
                "Implemented NIST Cybersecurity Framework for risk assessment",
                "Developed automated TRA (Threat Risk Assessment) templates",
                "Created vendor risk assessment workflows and scoring system",
                "Built security policy compliance tracking dashboard",
                "Designed ICS/OT security controls mapping for electrical sector",
                "Integrated ISO 27001/27002 standards with business objectives"
              ]}
            />
            <Card
              icon={Network}
              title="Network Security Monitor"
              subtitle="University Project | 2025"
              description="Real-time network traffic analysis and threat detection system"
              url="https://github.com/rafiksalam/network-monitor"
              status="completed"
              details={[
                "Developed using Python and Wireshark integration",
                "Real-time packet capture and analysis",
                "Machine learning-based anomaly detection",
                "Alert system for suspicious network activity",
                "Web interface for monitoring and configuration"
              ]}
            />
          </div>
        </Section>

        <Section title="Education & Certifications">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              icon={School}
              title="Master of Cybersecurity and Threat Intelligence"
              subtitle="University of Guelph | Enrollment Date: Sept 2025"
              description="Pursuing advanced graduate program in cybersecurity and threat intelligence"
              status="in-progress"
              details={[
                "Specialized coursework in threat hunting and intelligence analysis",
                "Advanced penetration testing and red team operations",
                "Cybersecurity risk management and governance",
                "Incident response and digital forensics",
                "Research focus on AI-driven threat detection"
              ]}
            />
            <Card
              icon={School}
              title="Bachelor of Software Engineering"
              subtitle="McMaster University | Graduation Date: April 2025"
              description="Software Engineering degree with comprehensive technical foundation"
              details={[
                "Cumulative GPA: 3.5/4.0",
                "Relevant Coursework: Software Design, Data Structures, Algorithms, Database Systems",
                "Software Engineering Capstone Project: Full-stack web application development",
                "Active member of Software Engineering Society",
                "Presented technical projects at university engineering conference"
              ]}
            />
            <Card
              icon={Award}
              title="Professional Certifications"
              subtitle="Industry-Recognized Certifications"
              description="Cybersecurity and cloud computing certifications"
              details={[
                "AWS Solutions Architect - Amazon Web Services",
                "Big Data Alison Course - Alison Learning Platform",
                "Certified Ethical Hacker (CEH) - EC-Council (Planned)",
                "CompTIA Security+ - CompTIA (Planned)",
                "Offensive Security Certified Professional (OSCP) - Planned"
              ]}
            />
          </div>
        </Section>

        <Section title="Get in Touch" className="text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl mb-8">Interested in cybersecurity collaboration? Let's connect!</p>
            <motion.a
              href="mailto:rafiksalam81@gmail.com"
              className="inline-flex items-center px-8 py-3 bg-green-500 text-black rounded-full font-bold text-lg"
              whileHover={{ scale: 1.05, backgroundColor: "#22c55e" }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="mr-2" size={20} />
              Contact Me
            </motion.a>
            <p className="mt-4 text-gray-400">
              rafiksalam81@gmail.com | 647-920-0209 | LinkedIn: /in/manlahar | GitHub: /rafiksalam
            </p>
          </motion.div>
        </Section>
      </div>
    </div>
  );
}

export default CyberSecurityPortfolio;
