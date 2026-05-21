import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, Brain, Shield, Mail, Github, Linkedin,
  ExternalLink, ChevronDown, ChevronUp, Menu, X, Zap,
  GraduationCap, MapPin, Calendar, ArrowRight, Database,
} from 'lucide-react';
import rafikImage from '../rafik.JPG';

// ─── Data ─────────────────────────────────────────────────────────────────────

const ROLES = [
  { text: 'Software Engineer',   grad: 'from-blue-600 to-indigo-600'     },
  { text: 'AI/ML Developer',     grad: 'from-violet-600 to-purple-600'   },
  { text: 'Data Engineer',       grad: 'from-sky-500 to-blue-600'        },
  { text: 'Security Researcher', grad: 'from-emerald-600 to-teal-600'    },
];

const COLORS = {
  violet: {
    bg: 'bg-violet-100', text: 'text-violet-700', border: 'border-violet-200',
    dot: 'bg-violet-500', accent: 'bg-violet-600',
    gradient: 'from-violet-500 to-purple-600',
    gradientBg: 'from-violet-50 to-white',
    iconGrad: 'from-violet-500 to-purple-600',
  },
  blue: {
    bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200',
    dot: 'bg-blue-500', accent: 'bg-blue-600',
    gradient: 'from-blue-500 to-indigo-600',
    gradientBg: 'from-blue-50 to-white',
    iconGrad: 'from-blue-500 to-indigo-600',
  },
  sky: {
    bg: 'bg-sky-100', text: 'text-sky-700', border: 'border-sky-200',
    dot: 'bg-sky-500', accent: 'bg-sky-600',
    gradient: 'from-sky-500 to-blue-500',
    gradientBg: 'from-sky-50 to-white',
    iconGrad: 'from-sky-500 to-blue-600',
  },
  emerald: {
    bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200',
    dot: 'bg-emerald-500', accent: 'bg-emerald-600',
    gradient: 'from-emerald-500 to-teal-600',
    gradientBg: 'from-emerald-50 to-white',
    iconGrad: 'from-emerald-500 to-teal-600',
  },
};

const SKILL_CATEGORIES = [
  {
    name: 'AI & Machine Learning', color: 'violet', icon: Brain,
    items: ['Python', 'scikit-learn', 'pandas', 'NumPy', 'Feature Engineering', 'Model Training & Validation', 'Anomaly Detection', 'Data Profiling', 'Demand Forecasting'],
  },
  {
    name: 'Software Engineering', color: 'blue', icon: Code2,
    items: ['JavaScript', 'TypeScript', 'Java', 'React.js', 'Node.js', 'Spring Boot', 'FastAPI', 'REST API Design', 'Bash'],
  },
  {
    name: 'Data & Cloud', color: 'sky', icon: Database,
    items: ['SQL', 'PySpark', 'PostgreSQL', 'MongoDB', 'MS SQL Server', 'AWS', 'Docker', 'GitHub Actions', 'CI/CD', 'Power BI'],
  },
  {
    name: 'Cybersecurity', color: 'emerald', icon: Shield,
    items: ['NIST CSF', 'ISO 27001', 'Threat Risk Assessments', 'Anomalous Access Detection', 'Penetration Testing', 'ICS/OT Security'],
  },
];

const EXPERIENCE = [
  {
    company: 'Tomatoes Bazar', role: 'AI Engineer & Operations Lead',
    period: 'Jul 2025 – Present', location: 'Milton, ON', color: 'violet', tag: 'AI/ML',
    bullets: [
      'Built end-to-end demand forecasting pipeline in Python using scikit-learn across 200+ SKUs',
      'Automated data quality checks with pandas to profile inventory datasets and detect anomalous stock movements',
      'Implemented and validated a SKU classification model, iterating on encoding and normalization strategies',
    ],
  },
  {
    company: 'Ministry of Transportation of Ontario', role: 'Data & AI Engineering Intern',
    period: 'May 2023 – Sep 2024', location: 'Toronto, ON', color: 'sky', tag: 'Data',
    bullets: [
      'Engineered PySpark and pandas pipelines handling 50+ GB weekly — improved analytics throughput by 60%',
      'Integrated Python-based ML models into production reporting pipelines across 5+ enterprise teams',
      'Built data profiling and anomaly detection scripts to remediate inconsistencies in pipeline outputs',
      'Automated operational dashboards, eliminating 3+ hours of daily manual analysis for 4 internal teams',
    ],
  },
  {
    company: 'CIBC', role: 'Information Security Coordinator',
    period: 'May 2022 – Sep 2022', location: 'Toronto, ON', color: 'emerald', tag: 'Security',
    bullets: [
      'Conducted Threat Risk Assessments aligned with NIST and ISO 27001, covering 11M+ clients across 3 business units',
      'Investigated anomalous access patterns, identifying 15+ indicators of potential account abuse',
    ],
  },
  {
    company: "Raf's Web Solutions", role: 'Freelance Full-Stack Developer',
    period: 'Sep 2021 – Present', location: 'Remote', color: 'blue', tag: 'Engineering',
    bullets: [
      'Delivered 20+ client web applications using React, Next.js, and Tailwind CSS',
      'Built responsive, performance-optimized frontends with REST API integrations',
    ],
  },
];

const PROJECTS = [
  {
    title: 'F1 Race Outcome Predictor', domain: 'AI/ML', color: 'violet',
    period: 'Apr 2026 – Present', status: 'active',
    tech: ['Python', 'scikit-learn', 'OpenF1 API', 'React.js'],
    description: 'End-to-end ML pipeline ingesting historical F1 race data via OpenF1 API. Random Forest classifier with feature engineering, hyperparameter tuning, and a data ingestion layer to profile and clean raw API responses.',
    github: null, live: null,
  },
  {
    title: 'DrivingMan.ca', domain: 'Full-Stack', color: 'blue',
    period: 'Apr 2024 – Present', status: 'live',
    tech: ['React.js', 'Tailwind CSS', 'AWS Lambda', 'Spring Boot'],
    description: 'Founded and built a mobile-first driving lesson booking platform with scheduling, payments, and notifications. Reached 1,000+ users within 2 months of launch.',
    github: null, live: 'https://drivingman.ca',
  },
  {
    title: 'Motive App', domain: 'Full-Stack', color: 'blue',
    period: '2024', status: 'complete',
    tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'WebSocket'],
    description: 'Full-stack event coordination platform with real-time WebSocket features, ticket payment processing, admin analytics dashboard, and role-based access control.',
    github: null, live: null,
  },
  {
    title: 'Smart Fire Detection System', domain: 'Data', color: 'sky',
    period: '2024', status: 'complete',
    tech: ['Next.js', 'React.js', 'IoT Sensors'],
    description: 'IoT-based fire detection system with real-time sensor data visualization and automated email/mobile alerts. Built as a capstone project.',
    github: null, live: null,
  },
  {
    title: 'Network Security Monitor', domain: 'Security', color: 'emerald',
    period: '2025', status: 'complete',
    tech: ['Python', 'Wireshark', 'ML'],
    description: 'Real-time packet capture and analysis tool with ML-based anomaly detection and a web interface for network traffic monitoring.',
    github: 'https://github.com/rafiksalam/network-monitor', live: null,
  },
  {
    title: 'Enterprise Security Framework', domain: 'Security', color: 'emerald',
    period: '2025', status: 'complete',
    tech: ['NIST CSF', 'ISO 27001', 'Python'],
    description: 'NIST CSF-aligned risk assessment framework with automated TRA templates, vendor risk workflows, and a compliance dashboard.',
    github: 'https://github.com/rafiksalam/enterprise-risk-framework', live: null,
  },
];

const EDUCATION = [
  {
    school: 'University of Guelph', degree: "Master's in Cybersecurity & Threat Intelligence",
    period: 'Sep 2025 – Aug 2026 (expected)', gpa: '3.7 / 4.0', color: 'violet',
    focus: ['Threat Hunting & Penetration Testing', 'Risk Management & Governance', 'Incident Response & Digital Forensics', 'AI-Driven Threat Detection'],
  },
  {
    school: 'McMaster University', degree: 'Bachelor of Software Engineering',
    period: 'Sep 2020 – Apr 2025', gpa: '3.3 / 4.0', color: 'blue',
    focus: ['Full-Stack Development', 'Algorithms & Data Structures', 'Software Design Patterns', 'Capstone: Full-Stack Web Application'],
  },
];

const HERO_STATS = [
  { value: '20+',   label: 'Client Apps Shipped'    },
  { value: '50 GB+', label: 'Weekly Data Pipelines' },
  { value: '11M+',  label: 'Accounts Secured'       },
];

const NAV_LINKS      = ['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'];
const PROJECT_FILTERS = ['All', 'AI/ML', 'Full-Stack', 'Data', 'Security'];

// ─── Shared helpers ────────────────────────────────────────────────────────────

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function SectionLabel({ children, center = false }) {
  return (
    <div className={`flex items-center gap-3 mb-2 ${center ? 'justify-center' : ''}`}>
      <div className="w-6 h-px bg-gradient-to-r from-blue-400 to-violet-400 flex-shrink-0" />
      <p className="text-xs font-black uppercase tracking-widest bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
        {children}
      </p>
      {center && <div className="w-6 h-px bg-gradient-to-l from-blue-400 to-violet-400 flex-shrink-0" />}
    </div>
  );
}

function Tag({ label, color = 'blue' }) {
  const c = COLORS[color] || COLORS.blue;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${c.bg} ${c.text}`}>
      {label}
    </span>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────

function Navbar({ onChatOpen }) {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md transition-all duration-300 ${scrolled ? 'shadow-sm border-b border-gray-100' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-md shadow-violet-200">
            <span className="text-white text-xs font-black">R</span>
          </div>
          <span className="font-black text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">Rafik</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollTo(link.toLowerCase())}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-semibold">
              {link}
            </button>
          ))}
          <button onClick={onChatOpen}
            className="text-sm bg-gradient-to-r from-blue-600 to-violet-600 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity font-bold shadow-md shadow-violet-300/40">
            Chat with Resume
          </button>
        </nav>

        <button className="md:hidden text-gray-500" onClick={() => setMobileOpen(v => !v)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 px-6 pb-4">
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => { scrollTo(link.toLowerCase()); setMobileOpen(false); }}
                className="block w-full text-left py-2.5 text-sm text-gray-600 hover:text-gray-900 border-b border-gray-50 last:border-0 font-semibold">
                {link}
              </button>
            ))}
            <button onClick={() => { onChatOpen(); setMobileOpen(false); }}
              className="mt-3 w-full text-sm bg-gradient-to-r from-blue-600 to-violet-600 text-white px-4 py-3 rounded-xl font-bold">
              Chat with Resume
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero({ onChatOpen }) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex(i => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, []);

  const role = ROLES[roleIndex];

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16">

      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-[550px] h-[550px] bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-80 animate-blob" />
        <div className="absolute -top-24 -left-24 w-[450px] h-[450px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-80 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-[380px] h-[380px] bg-rose-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 w-full z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* ── Text ── */}
          <motion.div className="flex-1 text-center lg:text-left"
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>

            {/* Status pill */}
            <motion.div variants={fadeUp}
              className="inline-flex items-center gap-2 bg-white/80 border border-gray-200 rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-gray-600">Open to new opportunities · Toronto, ON</span>
            </motion.div>

            {/* Name */}
            <motion.h1 variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-5 leading-[1.04] tracking-tight">
              <span className="text-gray-900">Rafik Manla</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                Hassan
              </span>
            </motion.h1>

            {/* Animated role */}
            <motion.div variants={fadeUp} className="h-10 flex items-center justify-center lg:justify-start mb-5">
              <AnimatePresence mode="wait">
                <motion.span key={roleIndex}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`text-xl md:text-2xl font-black bg-gradient-to-r ${role.grad} bg-clip-text text-transparent`}>
                  {role.text}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Tagline */}
            <motion.p variants={fadeUp} className="text-base text-gray-500 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed font-medium">
              Software Engineering graduate & Master's candidate building ML pipelines,
              full-stack apps, and security systems — in production.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
              <button onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors font-bold text-sm shadow-xl shadow-gray-900/20">
                View Projects <ArrowRight size={15} />
              </button>
              <button onClick={onChatOpen}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity font-bold text-sm shadow-xl shadow-violet-500/30">
                Chat with my Resume <ArrowRight size={15} />
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp}
              className="flex flex-wrap gap-8 justify-center lg:justify-start pb-7 border-b border-gray-100 mb-7">
              {HERO_STATS.map(s => (
                <div key={s.label}>
                  <p className="text-2xl font-black text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-400 font-semibold mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeUp} className="flex items-center gap-5 justify-center lg:justify-start">
              {[
                { href: 'https://github.com/rafiksalam', icon: Github, label: 'GitHub' },
                { href: 'https://linkedin.com/in/manlahar', icon: Linkedin, label: 'LinkedIn' },
                { href: 'mailto:rafiksalam81@gmail.com', icon: Mail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors font-semibold">
                  <Icon size={15} />{label}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, type: 'spring', stiffness: 80 }}
            className="flex-shrink-0 relative">

            {/* Soft glow behind photo */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-violet-400 to-purple-400 rounded-2xl opacity-25 blur-2xl scale-110" />

            {/* Floating domain badges */}
            <motion.div animate={{ y: [0, -9, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-5 -right-4 bg-white rounded-2xl px-3 py-2 shadow-xl border border-gray-100 z-10">
              <span className="text-xs font-black text-violet-700">🤖 AI/ML</span>
            </motion.div>
            <motion.div animate={{ y: [0, 9, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              className="absolute -bottom-5 -left-4 bg-white rounded-2xl px-3 py-2 shadow-xl border border-gray-100 z-10">
              <span className="text-xs font-black text-blue-700">⚡ Full-Stack</span>
            </motion.div>
            <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              className="absolute top-1/2 -right-10 -translate-y-1/2 bg-white rounded-2xl px-3 py-2 shadow-xl border border-gray-100 z-10">
              <span className="text-xs font-black text-emerald-700">🔐 Security</span>
            </motion.div>

            {/* Photo frame — gradient border effect */}
            <div className="relative w-64 h-64 md:w-72 md:h-72">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-violet-500 to-purple-600 rounded-2xl" />
              <div className="absolute inset-[3px] bg-white rounded-xl overflow-hidden">
                <img src={rafikImage} alt="Rafik Manla Hassan" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────────

function About() {
  const pillars = [
    { icon: Code2,    color: 'blue',    title: 'Software Engineering', desc: 'McMaster BSE graduate with 4+ years building production web apps and APIs using React, Node.js, Java, and Spring Boot.' },
    { icon: Brain,    color: 'violet',  title: 'AI & Data Engineering', desc: 'Hands-on experience shipping ML pipelines with scikit-learn and PySpark at scale — feature engineering to production deployment.' },
    { icon: Shield,   color: 'emerald', title: 'Cybersecurity', desc: "Master's candidate at U of Guelph with real-world TRA experience at CIBC covering 11M+ client accounts." },
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-gradient-to-bl from-violet-50 to-transparent rounded-full opacity-80 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <SectionLabel>About</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Building across{' '}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">domains</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mb-12 leading-relaxed font-medium">
            I bridge software engineering, machine learning, and cybersecurity — building things that work in production, not just in notebooks.
            Currently pursuing my Master's while working as an AI Engineer.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {pillars.map((p, i) => {
            const c = COLORS[p.color];
            const Icon = p.icon;
            return (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className={`relative overflow-hidden rounded-2xl p-6 border border-gray-100 bg-gradient-to-br ${c.gradientBg} hover:shadow-lg transition-shadow group`}>

                {/* Corner decoration */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${c.bg} opacity-50 group-hover:opacity-70 transition-opacity`} />

                {/* Icon */}
                <div className={`relative inline-flex p-3.5 rounded-2xl bg-gradient-to-br ${c.iconGrad} mb-5 shadow-lg`}>
                  <Icon size={22} className="text-white" />
                </div>

                <h3 className="relative font-black text-gray-900 mb-2">{p.title}</h3>
                <p className="relative text-sm text-gray-500 leading-relaxed font-medium">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Skills ────────────────────────────────────────────────────────────────────

// Gradient stops mapped to color keys — avoids dynamic Tailwind class construction
const TAB_GRADS = {
  violet: '#7c3aed, #9333ea',
  blue:   '#2563eb, #4338ca',
  sky:    '#0284c7, #2563eb',
  emerald:'#059669, #0d9488',
};

function Skills() {
  const [active, setActive] = useState(0);

  return (
    <section id="skills" className="py-24 relative overflow-hidden dot-grid">
      <div className="absolute inset-0 bg-white/88 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <SectionLabel>Skills</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">Technical toolkit</h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {SKILL_CATEGORIES.map((cat, i) => {
            const isActive = active === i;
            const Icon = cat.icon;
            return (
              <button key={cat.name} onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isActive ? 'text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
                style={isActive ? { background: `linear-gradient(135deg, ${TAB_GRADS[cat.color]})` } : {}}>
                <Icon size={14} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Skill badges */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-wrap gap-2.5">
            {SKILL_CATEGORIES[active].items.map((skill, i) => {
              const c = COLORS[SKILL_CATEGORIES[active].color];
              return (
                <motion.span key={skill}
                  initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className={`px-4 py-2 rounded-xl text-sm font-bold ${c.bg} ${c.text} border ${c.border} hover:-translate-y-0.5 hover:shadow-sm transition-all cursor-default`}>
                  {skill}
                </motion.span>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Experience ────────────────────────────────────────────────────────────────

function Experience() {
  const [expanded, setExpanded] = useState(0);

  return (
    <section id="experience" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <SectionLabel>Experience</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10">Where I've worked</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline spine */}
          <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gradient-to-b from-blue-200 via-violet-200 via-sky-200 to-emerald-200 rounded-full" />

          <div className="space-y-4">
            {EXPERIENCE.map((job, i) => {
              const c = COLORS[job.color];
              const isOpen = expanded === i;
              return (
                <motion.div key={job.company}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09 }}
                  className="relative flex gap-5">

                  {/* Timeline node */}
                  <div className="flex-shrink-0 mt-5 z-10">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.iconGrad} flex items-center justify-center shadow-md`}>
                      <div className="w-2.5 h-2.5 rounded-full bg-white/80" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`flex-1 bg-white rounded-2xl border overflow-hidden transition-all duration-200 ${
                    isOpen ? `${c.border} shadow-lg` : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
                  }`}>
                    {/* Gradient stripe */}
                    <div className={`h-1 bg-gradient-to-r ${c.gradient}`} />

                    <button onClick={() => setExpanded(isOpen ? -1 : i)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50/70 transition-colors">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-black text-gray-900">{job.company}</span>
                          <Tag label={job.tag} color={job.color} />
                        </div>
                        <p className="text-sm text-gray-500 font-semibold">{job.role}</p>
                        <div className="flex flex-wrap gap-4 mt-1.5">
                          <span className="text-xs text-gray-400 flex items-center gap-1 font-medium"><Calendar size={11} />{job.period}</span>
                          <span className="text-xs text-gray-400 flex items-center gap-1 font-medium"><MapPin size={11} />{job.location}</span>
                        </div>
                      </div>
                      {isOpen
                        ? <ChevronUp size={16} className={`flex-shrink-0 ml-4 ${c.text}`} />
                        : <ChevronDown size={16} className="flex-shrink-0 ml-4 text-gray-400" />}
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                          <ul className={`px-5 pb-5 border-t ${c.border} bg-gradient-to-b ${c.gradientBg} space-y-2.5 pt-4`}>
                            {job.bullets.map(b => (
                              <li key={b} className="text-sm text-gray-600 flex gap-2.5 leading-relaxed font-medium">
                                <span className={`mt-2 w-1.5 h-1.5 rounded-full ${c.dot} flex-shrink-0`} />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Projects ──────────────────────────────────────────────────────────────────

function Projects() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.domain === filter);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Subtle tinted background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white to-violet-50/40" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <SectionLabel>Projects</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">Things I've built</h2>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {PROJECT_FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                filter === f
                  ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}>
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map(proj => {
              const c = COLORS[proj.color];
              return (
                <motion.div key={proj.title} layout
                  initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-200 flex flex-col group">

                  {/* Gradient top stripe */}
                  <div className={`h-1.5 bg-gradient-to-r ${c.gradient}`} />

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Tag label={proj.domain} color={proj.color} />
                        {proj.status === 'live' && (
                          <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Live
                          </span>
                        )}
                        {proj.status === 'active' && (
                          <span className="flex items-center gap-1 text-xs font-bold text-violet-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />Active
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {proj.github && <a href={proj.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-700 transition-colors"><Github size={15} /></a>}
                        {proj.live && <a href={proj.live} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-700 transition-colors"><ExternalLink size={15} /></a>}
                      </div>
                    </div>

                    <h3 className="font-black text-gray-900 mb-2">{proj.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4 font-medium">{proj.description}</p>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-50">
                      {proj.tech.map(t => (
                        <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg font-semibold">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Education ─────────────────────────────────────────────────────────────────

function Education() {
  return (
    <section id="education" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <SectionLabel>Education</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10">Academic background</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {EDUCATION.map((edu, i) => {
            const c = COLORS[edu.color];
            return (
              <motion.div key={edu.school}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`relative overflow-hidden rounded-2xl border border-gray-100 p-6 bg-gradient-to-br ${c.gradientBg} hover:shadow-lg transition-shadow group`}>

                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${c.bg} opacity-50 group-hover:opacity-70 transition-opacity`} />

                <div className={`relative inline-flex p-3.5 rounded-2xl bg-gradient-to-br ${c.iconGrad} mb-4 shadow-lg`}>
                  <GraduationCap size={22} className="text-white" />
                </div>
                <h3 className="relative font-black text-gray-900 text-lg mb-1">{edu.school}</h3>
                <p className="relative text-sm font-bold text-gray-700 mb-3">{edu.degree}</p>
                <div className="flex flex-wrap gap-4 text-xs mb-4">
                  <span className="flex items-center gap-1.5 text-gray-400 font-semibold"><Calendar size={11} />{edu.period}</span>
                  <span className={`flex items-center gap-1.5 font-black ${c.text}`}><Zap size={11} />GPA {edu.gpa}</span>
                </div>
                <ul className="space-y-1.5">
                  {edu.focus.map(f => (
                    <li key={f} className="text-sm text-gray-600 flex items-center gap-2 font-medium">
                      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} flex-shrink-0`} />{f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ───────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" className="py-28 relative overflow-hidden bg-gray-950 text-white">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-48 right-0 w-[600px] h-[600px] bg-violet-900/30 rounded-full filter blur-3xl" />
        <div className="absolute -bottom-48 left-0 w-[500px] h-[500px] bg-blue-900/30 rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <SectionLabel center>Contact</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black mb-4 mt-2">
            Let's{' '}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              work together
            </span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-10 leading-relaxed font-medium">
            Whether you're hiring, collaborating, or just want to talk about AI, data, or security — I'm open.
          </p>

          <a href="mailto:rafiksalam81@gmail.com"
            className="inline-flex items-center gap-2.5 bg-white text-gray-900 px-8 py-4 rounded-2xl hover:bg-gray-100 transition-colors font-black text-sm mb-8 shadow-2xl shadow-black/40">
            <Mail size={16} /> rafiksalam81@gmail.com
          </a>

          <div className="flex items-center justify-center gap-8 mb-16">
            <a href="https://github.com/rafiksalam" target="_blank" rel="noreferrer"
              className="text-gray-500 hover:text-white transition-colors flex items-center gap-1.5 text-sm font-bold">
              <Github size={16} /> GitHub
            </a>
            <a href="https://linkedin.com/in/manlahar" target="_blank" rel="noreferrer"
              className="text-gray-500 hover:text-white transition-colors flex items-center gap-1.5 text-sm font-bold">
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>

          <p className="text-xs text-gray-700 font-medium">
            © {new Date().getFullYear()} Rafik Manla Hassan · Built with React & Tailwind CSS
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Export ────────────────────────────────────────────────────────────────────

export default function MainPortfolio({ onChatOpen }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar onChatOpen={onChatOpen} />
      <main>
        <Hero onChatOpen={onChatOpen} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
    </div>
  );
}
