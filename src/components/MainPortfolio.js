import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, ChevronDown } from 'lucide-react';
import rafikImage from '../rafik.JPG';

/* ── Data ─────────────────────────────────────────────────────────────────── */

const ROLES = ['Software Engineer', 'AI/ML Developer', 'Data Engineer', 'Security Researcher'];

const SKILL_CATEGORIES = [
  {
    name: 'AI & Machine Learning',
    blurb: 'Pipelines that ship, not notebooks that rot.',
    items: ['Python', 'scikit-learn', 'pandas', 'NumPy', 'Feature Engineering', 'Model Validation', 'Anomaly Detection', 'Demand Forecasting'],
    span: 'lg:col-span-7',
    glow: 'radial-gradient(ellipse 80% 60% at 20% 0%, rgba(52,211,153,0.12), transparent)',
  },
  {
    name: 'Software Engineering',
    blurb: 'Full-stack, typed, tested.',
    items: ['JavaScript', 'TypeScript', 'Java', 'React.js', 'Node.js', 'Spring Boot', 'JUnit/Mockito', 'FastAPI', 'REST APIs'],
    span: 'lg:col-span-5',
    glow: 'radial-gradient(ellipse 80% 60% at 80% 0%, rgba(255,255,255,0.06), transparent)',
  },
  {
    name: 'Data & Cloud',
    blurb: '50 GB a week through PySpark and pandas.',
    items: ['SQL', 'PySpark', 'PostgreSQL', 'MongoDB', 'AWS', 'GCP Cloud Run', 'Docker', 'GitHub Actions', 'CI/CD', 'Power BI'],
    span: 'lg:col-span-5',
    glow: 'radial-gradient(ellipse 80% 60% at 20% 100%, rgba(255,255,255,0.06), transparent)',
  },
  {
    name: 'Cybersecurity',
    blurb: 'TRAs at bank scale, threat hunting in the lab.',
    items: ['NIST CSF', 'ISO 27001', 'Threat Risk Assessments', 'Penetration Testing', 'ICS/OT Security', 'Anomalous Access Detection'],
    span: 'lg:col-span-7',
    glow: 'radial-gradient(ellipse 80% 60% at 80% 100%, rgba(52,211,153,0.12), transparent)',
  },
];

const EXPERIENCE = [
  {
    company: 'FDM Group', role: 'Software Engineering Consultant',
    period: 'Jan 2026 - Present', location: 'Toronto, ON',
    bullets: [
      'Built and deployed Java / Spring Boot microservices in a cross-functional team of BAs, QA, DevOps, and SREs, owning features from design through production deployment with a focus on availability and observability',
      'Engineered REST APIs and service integrations for Cryptochain, a financial services platform, using Spring Data JPA, JWT auth, and PostgreSQL, supporting 100% uptime across sprint releases',
      'Containerized services with Docker and contributed to CI/CD pipelines via GitHub Actions and GCP Cloud Run, cutting deployment time by ~35% and eliminating manual environment inconsistencies',
      'Applied JUnit/Mockito TDD, Java concurrency, and SOLID principles across all services, achieving 85%+ test coverage and reducing production defects between sprint cycles',
    ],
  },
  {
    company: 'Tomatoes Bazar', role: 'AI Engineer & Operations Lead',
    period: 'Jul 2025 - Present', location: 'Milton, ON',
    bullets: [
      'Built an end-to-end demand forecasting pipeline in Python using scikit-learn across 200+ SKUs',
      'Automated data quality checks with pandas to profile inventory datasets and detect anomalous stock movements',
      'Implemented and validated a SKU classification model, iterating on encoding and normalization strategies',
    ],
  },
  {
    company: 'Ministry of Transportation of Ontario', role: 'Data & AI Engineering Intern',
    period: 'May 2023 - Sep 2024', location: 'Toronto, ON',
    bullets: [
      'Engineered PySpark and pandas pipelines handling 50+ GB weekly, improving analytics throughput by 60%',
      'Integrated Python-based ML models into production reporting pipelines across 5+ enterprise teams',
      'Built data profiling and anomaly detection scripts to remediate inconsistencies in pipeline outputs',
      'Automated operational dashboards, eliminating 3+ hours of daily manual analysis for 4 internal teams',
    ],
  },
  {
    company: 'CIBC', role: 'Information Security Coordinator',
    period: 'May 2022 - Sep 2022', location: 'Toronto, ON',
    bullets: [
      'Conducted Threat Risk Assessments aligned with NIST and ISO 27001, covering 11M+ clients across 3 business units',
      'Investigated anomalous access patterns, identifying 15+ indicators of potential account abuse',
    ],
  },
  {
    company: "Raf's Web Solutions", role: 'Freelance Full-Stack Developer',
    period: 'Sep 2021 - Present', location: 'Remote',
    bullets: [
      'Delivered 20+ client web applications using React, Next.js, and Tailwind CSS',
      'Built responsive, performance-optimized frontends with REST API integrations',
    ],
  },
];

const PROJECTS = [
  {
    title: 'DrivingMan.ca', domain: 'Full-Stack',
    period: '2024 - Present', status: 'live',
    tech: ['React.js', 'Tailwind CSS', 'AWS Lambda', 'Spring Boot'],
    description: 'Founded and built a mobile-first driving lesson booking platform with scheduling, payments, and notifications. Reached 1,000+ users within 2 months of launch.',
    github: null, live: 'https://drivingman.ca',
    featured: true,
  },
  {
    title: 'F1 Race Outcome Predictor', domain: 'AI/ML',
    period: '2026 - Present', status: 'active',
    tech: ['Python', 'scikit-learn', 'OpenF1 API', 'React.js'],
    description: 'End-to-end ML pipeline ingesting historical F1 race data via the OpenF1 API. Random Forest classifier with feature engineering, hyperparameter tuning, and a data ingestion layer that profiles and cleans raw API responses.',
    github: null, live: null,
    featured: false,
  },
  {
    title: 'Network Security Monitor', domain: 'Security',
    period: '2025', status: 'complete',
    tech: ['Python', 'Wireshark', 'ML'],
    description: 'Real-time packet capture and analysis tool with ML-based anomaly detection and a web interface for network traffic monitoring.',
    github: 'https://github.com/rafiksalam/network-monitor', live: null,
    featured: false,
  },
  {
    title: 'Motive App', domain: 'Full-Stack',
    period: '2024', status: 'complete',
    tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'WebSocket'],
    description: 'Full-stack event coordination platform with real-time WebSocket features, ticket payments, an admin analytics dashboard, and role-based access control.',
    github: null, live: null,
    featured: false,
  },
  {
    title: 'Enterprise Security Framework', domain: 'Security',
    period: '2025', status: 'complete',
    tech: ['NIST CSF', 'ISO 27001', 'Python'],
    description: 'NIST CSF-aligned risk assessment framework with automated TRA templates, vendor risk workflows, and a compliance dashboard.',
    github: 'https://github.com/rafiksalam/enterprise-risk-framework', live: null,
    featured: false,
  },
  {
    title: 'Smart Fire Detection System', domain: 'Data',
    period: '2024', status: 'complete',
    tech: ['Next.js', 'React.js', 'IoT Sensors'],
    description: 'IoT-based fire detection system with real-time sensor data visualization and automated email and mobile alerts. Built as a capstone project.',
    github: null, live: null,
    featured: false,
  },
];

const EDUCATION = [
  {
    school: 'University of Guelph',
    degree: "Master's in Cybersecurity & Threat Intelligence",
    period: 'Sep 2025 - Aug 2026 (expected)', gpa: '3.7 / 4.0',
    focus: ['Threat Hunting & Penetration Testing', 'Risk Management & Governance', 'Incident Response & Digital Forensics', 'AI-Driven Threat Detection'],
  },
  {
    school: 'McMaster University',
    degree: 'Bachelor of Software Engineering',
    period: 'Sep 2020 - Apr 2025', gpa: '3.3 / 4.0',
    focus: ['Full-Stack Development', 'Algorithms & Data Structures', 'Software Design Patterns', 'Capstone: Full-Stack Web Application'],
  },
];

const STATS = [
  { value: '20+',    label: 'client apps shipped' },
  { value: '50 GB',  label: 'weekly data pipelines' },
  { value: '11M+',   label: 'accounts covered in TRAs' },
  { value: '1,000+', label: 'users on DrivingMan.ca' },
];

const TICKER_SKILLS = [
  'Python', 'React.js', 'scikit-learn', 'PySpark', 'Node.js', 'TypeScript',
  'Java', 'Spring Boot', 'AWS', 'GCP', 'Docker', 'SQL', 'MongoDB', 'FastAPI',
  'pandas', 'NumPy', 'Power BI', 'NIST CSF', 'GitHub Actions', 'PostgreSQL',
  'Next.js', 'Tailwind CSS', 'Wireshark', 'ISO 27001',
];

const NAV_LINKS = ['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'];
const PROJECT_FILTERS = ['All', 'AI/ML', 'Full-Stack', 'Data', 'Security'];

/* ── Shared helpers ───────────────────────────────────────────────────────── */

const EASE = [0.32, 0.72, 0, 1];

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Heavy fade-up on viewport entry, shared by every section
function Reveal({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

function SectionTitle({ children, className = '' }) {
  return (
    <h2 className={`font-display font-semibold text-4xl md:text-6xl tracking-tight text-zinc-100 ${className}`}
      style={{ textWrap: 'balance' }}>
      {children}
    </h2>
  );
}

// Primary CTA: pill with the arrow nested in its own circular island
function IslandButton({ children, onClick, href }) {
  const cls = 'group inline-flex items-center gap-3 rounded-full bg-emerald-400 pl-6 pr-2 py-2 text-sm font-bold text-zinc-950 transition-transform duration-300 ease-out-expo hover:scale-[1.02] active:scale-[0.98]';
  const inner = (
    <>
      <span>{children}</span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950/15 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <ArrowUpRight size={15} strokeWidth={2} />
      </span>
    </>
  );
  return href
    ? <a href={href} className={cls}>{inner}</a>
    : <button onClick={onClick} className={cls}>{inner}</button>;
}

// Card with a cursor-tracking spotlight border. Writes CSS vars directly on the
// node (no React state) so hover tracking never re-renders the tree.
function SpotlightCard({ children, className = '' }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={onMove}
      className={`group relative rounded-[1.5rem] border border-white/10 bg-white/[0.03] ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[1.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(52,211,153,0.08), transparent 60%)' }} />
      {children}
    </div>
  );
}

/* ── Ambient backdrop ─────────────────────────────────────────────────────── */

function GlowBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute -top-40 left-1/4 h-[36rem] w-[36rem] rounded-full opacity-25"
        style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.16), transparent 65%)' }} />
      <div className="absolute top-[60%] -right-40 h-[30rem] w-[30rem] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 65%)' }} />
    </div>
  );
}

/* ── Navbar: floating glass pill ──────────────────────────────────────────── */

function Navbar({ onChatOpen }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const reduce = useReducedMotion();

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.getElementById(l.toLowerCase())).filter(Boolean);
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <header className="fixed left-1/2 top-5 z-40 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-zinc-950/70 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          <button onClick={() => scrollTo('hero')}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400 font-display text-sm font-bold text-zinc-950">
            R
          </button>

          <nav className="hidden items-center md:flex">
            {NAV_LINKS.map(link => {
              const isActive = active === link.toLowerCase();
              return (
                <button key={link} onClick={() => scrollTo(link.toLowerCase())}
                  className={`rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors duration-300 ${
                    isActive ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white'
                  }`}>
                  {link}
                </button>
              );
            })}
          </nav>

          <button onClick={onChatOpen}
            className="ml-1 hidden rounded-full bg-emerald-400 px-4 py-2 text-[13px] font-bold text-zinc-950 transition-transform duration-300 ease-out-expo hover:scale-[1.03] active:scale-[0.97] md:block">
            Chat with my resume
          </button>

          {/* Hamburger that morphs into an X */}
          <button onClick={() => setOpen(v => !v)} aria-label="Menu"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-zinc-300 md:hidden">
            <span className={`absolute h-[1.5px] w-4 bg-current transition-transform duration-300 ease-out-expo ${open ? 'rotate-45' : '-translate-y-1'}`} />
            <span className={`absolute h-[1.5px] w-4 bg-current transition-transform duration-300 ease-out-expo ${open ? '-rotate-45' : 'translate-y-1'}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 flex flex-col justify-center bg-zinc-950/90 px-8 backdrop-blur-2xl md:hidden">
            {NAV_LINKS.map((link, i) => (
              <motion.button key={link}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.5, ease: EASE }}
                onClick={() => { scrollTo(link.toLowerCase()); setOpen(false); }}
                className="py-3 text-left font-display text-4xl font-semibold tracking-tight text-zinc-200">
                {link}
              </motion.button>
            ))}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + NAV_LINKS.length * 0.06, duration: 0.5, ease: EASE }}
              className="mt-8">
              <IslandButton onClick={() => { onChatOpen(); setOpen(false); }}>
                Chat with my resume
              </IslandButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */

function Hero({ onChatOpen }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setRoleIndex(i => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, []);

  const stagger = { visible: { transition: { staggerChildren: 0.09 } } };
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <section id="hero" className="relative flex min-h-[100dvh] items-center pt-24">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid items-center gap-14 lg:grid-cols-12">

          <motion.div className="lg:col-span-7" initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={item}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span className="font-mono text-[11px] font-medium tracking-wide text-zinc-400">
                Open to full-time roles, Toronto
              </span>
            </motion.div>

            <motion.h1 variants={item}
              className="font-display text-6xl font-semibold leading-[0.95] tracking-tight text-zinc-100 md:text-7xl lg:text-8xl">
              Rafik<br />Manla Hassan
            </motion.h1>

            <motion.div variants={item} className="mt-6 flex h-8 items-center">
              <AnimatePresence mode="wait">
                <motion.span key={roleIndex}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? {} : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="font-mono text-base text-emerald-400 md:text-lg">
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.p variants={item} className="mt-5 max-w-md text-base leading-relaxed text-zinc-400">
              I build ML pipelines, full-stack products, and security systems that hold up in production.
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-5">
              <IslandButton onClick={onChatOpen}>Chat with my resume</IslandButton>
              <button onClick={() => scrollTo('projects')}
                className="text-sm font-semibold text-zinc-300 underline decoration-zinc-600 underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-emerald-400">
                View projects
              </button>
            </motion.div>
          </motion.div>

          {/* Portrait in a double-bezel shell */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.94, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            className="justify-self-center lg:col-span-5 lg:justify-self-end">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
              <div className="overflow-hidden rounded-[calc(2rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                <img src={rafikImage} alt="Rafik Manla Hassan"
                  className="h-72 w-72 object-cover md:h-96 md:w-80" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Stats strip ──────────────────────────────────────────────────────────── */

function StatsStrip() {
  return (
    <section className="relative border-y border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 divide-white/5 md:grid-cols-4 md:divide-x">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="px-2 py-10 md:px-8">
              <p className="font-mono text-3xl text-zinc-100 md:text-4xl" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {s.value}
              </p>
              <p className="mt-2 text-[13px] font-medium text-zinc-500">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Skill ticker (the page's single marquee) ─────────────────────────────── */

function SkillTicker() {
  const items = [...TICKER_SKILLS, ...TICKER_SKILLS];
  return (
    <div className="group overflow-hidden border-b border-white/5 py-6">
      <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {items.map((skill, i) => (
          <span key={i} className="px-6 font-mono text-sm text-zinc-600 transition-colors duration-300 hover:text-emerald-400">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── About: editorial split ───────────────────────────────────────────────── */

function About() {
  const pillars = [
    {
      title: 'Software Engineering',
      desc: 'McMaster BSE graduate with 4+ years building production web apps and APIs using React, Node.js, Java, and Spring Boot.',
    },
    {
      title: 'AI & Data Engineering',
      desc: 'Shipped ML pipelines with scikit-learn and PySpark at scale, from feature engineering through production deployment.',
    },
    {
      title: 'Cybersecurity',
      desc: "Master's candidate at the University of Guelph with real-world TRA experience at CIBC covering 11M+ client accounts.",
    },
  ];

  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionTitle>Three domains, one engineer.</SectionTitle>
            <p className="mt-6 max-w-sm leading-relaxed text-zinc-400">
              I bridge software engineering, machine learning, and cybersecurity.
              The common thread: things that work in production, not just in notebooks.
            </p>
          </Reveal>

          <div className="lg:col-span-7">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="border-t border-white/10 py-8 transition-colors duration-500 hover:border-emerald-400/40">
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-zinc-100">{p.title}</h3>
                  <p className="mt-3 max-w-lg leading-relaxed text-zinc-400">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Skills: asymmetric bento ─────────────────────────────────────────────── */

function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionTitle className="mb-14">The toolkit.</SectionTitle>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-12">
          {SKILL_CATEGORIES.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 0.08} className={cat.span}>
              <SpotlightCard className="h-full overflow-hidden">
                <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[1.5rem]" style={{ background: cat.glow }} />
                <div className="relative p-7 md:p-9">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-zinc-100 md:text-2xl">{cat.name}</h3>
                  <p className="mt-1.5 text-sm text-zinc-500">{cat.blurb}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {cat.items.map(skill => (
                      <span key={skill}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-zinc-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Experience: timeline rows ────────────────────────────────────────────── */

function Experience() {
  const [expanded, setExpanded] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionTitle className="mb-14">Where I've worked.</SectionTitle>
        </Reveal>

        <div>
          {EXPERIENCE.map((job, i) => {
            const isOpen = expanded === i;
            return (
              <Reveal key={job.company} delay={i * 0.06}>
                <div className={`border-t border-white/10 transition-colors duration-500 ${isOpen ? 'border-emerald-400/40' : ''}`}>
                  <button onClick={() => setExpanded(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-baseline justify-between gap-6 py-7 text-left">
                    <div className="min-w-0">
                      <h3 className="font-display text-xl font-semibold tracking-tight text-zinc-100 md:text-2xl">
                        {job.company}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-zinc-400">{job.role}</p>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-4">
                      <span className="hidden font-mono text-xs text-zinc-500 sm:block">{job.period}</span>
                      <ChevronDown size={16} strokeWidth={1.5}
                        className={`text-zinc-500 transition-transform duration-500 ease-out-expo ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduce ? {} : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden">
                        <div className="pb-8">
                          <p className="mb-4 font-mono text-xs text-zinc-500 sm:hidden">{job.period}, {job.location}</p>
                          <ul className="max-w-3xl space-y-3">
                            {job.bullets.map(b => (
                              <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-zinc-400">
                                <span className="mt-[9px] h-px w-4 flex-shrink-0 bg-emerald-400/60" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}

/* ── Projects: featured asymmetric grid ───────────────────────────────────── */

function Projects() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.domain === filter);

  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <SectionTitle>Things I've built.</SectionTitle>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-1.5">
              {PROJECT_FILTERS.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`rounded-full px-4 py-2 font-mono text-xs transition-colors duration-300 ${
                    filter === f
                      ? 'bg-emerald-400 font-medium text-zinc-950'
                      : 'border border-white/10 text-zinc-400 hover:border-white/25 hover:text-white'
                  }`}>
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="grid gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((proj, i) => (
              <motion.div key={proj.title} layout
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4, ease: EASE }}
                className={proj.featured && filter === 'All' ? 'md:col-span-2' : ''}>
                <SpotlightCard className="h-full">
                  <div className="relative flex h-full flex-col p-7 md:p-9">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <span className="font-mono text-xs text-zinc-500">{proj.domain}</span>
                      <div className="flex items-center gap-3">
                        {proj.status === 'live' && (
                          <span className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />live
                          </span>
                        )}
                        {proj.status === 'active' && (
                          <span className="font-mono text-xs text-zinc-400">in progress</span>
                        )}
                        {proj.github && (
                          <a href={proj.github} target="_blank" rel="noreferrer" aria-label={`${proj.title} on GitHub`}
                            className="text-zinc-500 transition-colors duration-300 hover:text-white">
                            <Github size={16} strokeWidth={1.5} />
                          </a>
                        )}
                        {proj.live && (
                          <a href={proj.live} target="_blank" rel="noreferrer" aria-label={`Open ${proj.title}`}
                            className="text-zinc-500 transition-colors duration-300 hover:text-emerald-400">
                            <ArrowUpRight size={16} strokeWidth={1.5} />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className={`font-display font-semibold tracking-tight text-zinc-100 ${proj.featured && filter === 'All' ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
                      {proj.title}
                    </h3>
                    <p className="mt-3 max-w-2xl flex-1 leading-relaxed text-zinc-400">{proj.description}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {proj.tech.map(t => (
                        <span key={t} className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-zinc-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Education ────────────────────────────────────────────────────────────── */

function Education() {
  return (
    <section id="education" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionTitle className="mb-14">Academic background.</SectionTitle>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {EDUCATION.map((edu, i) => (
            <Reveal key={edu.school} delay={i * 0.1}>
              <div className="h-full rounded-[2rem] border border-white/10 bg-white/[0.04] p-2">
                <div className="h-full rounded-[calc(2rem-0.5rem)] bg-zinc-950/60 p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] md:p-8">
                  <p className="font-mono text-xs text-zinc-500">{edu.period}</p>
                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-zinc-100">{edu.school}</h3>
                  <p className="mt-1.5 font-medium text-zinc-300">{edu.degree}</p>
                  <p className="mt-3 font-mono text-sm text-emerald-400" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    GPA {edu.gpa}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {edu.focus.map(f => (
                      <span key={f} className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-400">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact + footer ─────────────────────────────────────────────────────── */

function Contact() {
  return (
    <section id="contact" className="relative pb-16 pt-28 md:pt-40">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <SectionTitle className="md:text-7xl">Let's build something real.</SectionTitle>
          <p className="mx-auto mt-6 max-w-md leading-relaxed text-zinc-400">
            Hiring, collaborating, or just want to talk AI, data, or security? My inbox is open.
          </p>
          <div className="mt-10 flex justify-center">
            <IslandButton href="mailto:rafiksalam81@gmail.com">rafiksalam81@gmail.com</IslandButton>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8">
            <a href="https://github.com/rafiksalam" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-sm font-semibold text-zinc-500 transition-colors duration-300 hover:text-white">
              <Github size={15} strokeWidth={1.5} /> GitHub
            </a>
            <a href="https://linkedin.com/in/manlahar" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-sm font-semibold text-zinc-500 transition-colors duration-300 hover:text-white">
              <Linkedin size={15} strokeWidth={1.5} /> LinkedIn
            </a>
            <a href="mailto:rafiksalam81@gmail.com"
              className="flex items-center gap-2 text-sm font-semibold text-zinc-500 transition-colors duration-300 hover:text-white">
              <Mail size={15} strokeWidth={1.5} /> Email
            </a>
          </div>
        </Reveal>

        <div className="mt-24 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Rafik Manla Hassan. Built with React and Tailwind CSS.
          </p>
          <p className="font-mono text-[11px] text-zinc-700">
            psst: ↑ ↑ ↓ ↓ ← → ← → B A
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Export ───────────────────────────────────────────────────────────────── */

export default function MainPortfolio({ onChatOpen }) {
  return (
    <div className="grain relative min-h-[100dvh] bg-zinc-950 text-zinc-100">
      <GlowBackdrop />
      <Navbar onChatOpen={onChatOpen} />
      <main className="relative z-10">
        <Hero onChatOpen={onChatOpen} />
        <StatsStrip />
        <SkillTicker />
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
