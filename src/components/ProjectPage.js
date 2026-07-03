import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { PROJECTS, getProject } from '../data/projects';
import { EASE, Reveal, IslandButton, GlowBackdrop } from './ui';

function StatusBadge({ status }) {
  if (status === 'live') {
    return (
      <span className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />live
      </span>
    );
  }
  if (status === 'active') {
    return <span className="font-mono text-xs text-zinc-400">in progress</span>;
  }
  return <span className="font-mono text-xs text-zinc-500">shipped</span>;
}

export default function ProjectPage({ onChatOpen }) {
  const { slug } = useParams();
  const project = getProject(slug);
  const reduce = useReducedMotion();

  if (!project) {
    return (
      <div className="grain relative flex min-h-[100dvh] flex-col items-center justify-center bg-zinc-950 px-6 text-center">
        <p className="font-mono text-sm text-emerald-400">404</p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-zinc-100">Project not found.</h1>
        <Link to="/" className="mt-8 text-sm font-semibold text-zinc-300 underline decoration-zinc-600 underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-emerald-400">
          Back to the portfolio
        </Link>
      </div>
    );
  }

  const idx = PROJECTS.indexOf(project);
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  const stagger = { visible: { transition: { staggerChildren: 0.09 } } };
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <div className="grain relative min-h-[100dvh] bg-zinc-950 text-zinc-100">
      <GlowBackdrop />

      {/* Floating nav pill */}
      <header className="fixed left-1/2 top-5 z-40 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-zinc-950/70 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          <Link to="/" aria-label="Back to portfolio"
            className="flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-zinc-300 transition-colors duration-300 hover:bg-white/10 hover:text-white">
            <ArrowLeft size={14} strokeWidth={1.5} /> All projects
          </Link>
          <button onClick={onChatOpen}
            className="rounded-full bg-emerald-400 px-4 py-2 text-[13px] font-bold text-zinc-950 transition-transform duration-300 ease-out-expo hover:scale-[1.03] active:scale-[0.97]">
            Chat with my resume
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6">

        {/* Hero */}
        <motion.section className="pt-36 md:pt-44" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={item} className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-xs text-zinc-500">{project.domain}</span>
            <span className="font-mono text-xs text-zinc-600">{project.period}</span>
            <StatusBadge status={project.status} />
          </motion.div>

          <motion.h1 variants={item}
            className="mt-6 font-display text-5xl font-semibold leading-[0.98] tracking-tight text-zinc-100 md:text-7xl"
            style={{ textWrap: 'balance' }}>
            {project.title}
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            {project.tagline}
          </motion.p>

          {project.org && (
            <motion.p variants={item} className="mt-3 font-mono text-xs text-zinc-500">
              {project.org}
            </motion.p>
          )}

          {(project.live || project.github) && (
            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-5">
              {project.live && (
                <IslandButton href={project.live} external>Visit live site</IslandButton>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-zinc-300 underline decoration-zinc-600 underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-emerald-400">
                  <Github size={15} strokeWidth={1.5} /> View source
                </a>
              )}
            </motion.div>
          )}
        </motion.section>

        {/* Facts strip */}
        <Reveal className="mt-16 md:mt-20">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 sm:grid-cols-3">
            {project.facts.map(f => (
              <div key={f.label} className="bg-zinc-950 px-6 py-6">
                <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">{f.label}</p>
                <p className="mt-2 text-sm font-semibold text-zinc-100">{f.value}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Overview */}
        <section className="mt-24 md:mt-32">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">
              What it is.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
              {project.overview}
            </p>
          </Reveal>
        </section>

        {/* Highlights */}
        <section className="mt-24 md:mt-32">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">
              The work.
            </h2>
          </Reveal>
          <div className="mt-10">
            {project.highlights.map((h, i) => (
              <Reveal key={h} delay={i * 0.08}>
                <div className="flex gap-5 border-t border-white/10 py-7 transition-colors duration-500 hover:border-emerald-400/40">
                  <span className="mt-[10px] h-px w-6 flex-shrink-0 bg-emerald-400/60" />
                  <p className="max-w-3xl leading-relaxed text-zinc-300">{h}</p>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </section>

        {/* Stack */}
        <section className="mt-24 md:mt-32">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">
              Built with.
            </h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-sm text-zinc-300">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Prev / next navigation */}
        <Reveal className="mt-28 md:mt-36">
          <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 sm:grid-cols-2">
            <Link to={`/projects/${prev.slug}`}
              className="group bg-zinc-950 p-7 transition-colors duration-500 hover:bg-zinc-900 md:p-9">
              <span className="flex items-center gap-2 font-mono text-xs text-zinc-500">
                <ArrowLeft size={13} strokeWidth={1.5} className="transition-transform duration-300 ease-out-expo group-hover:-translate-x-1" />
                Previous
              </span>
              <span className="mt-3 block font-display text-xl font-semibold tracking-tight text-zinc-200 group-hover:text-white md:text-2xl">
                {prev.title}
              </span>
            </Link>
            <Link to={`/projects/${next.slug}`}
              className="group bg-zinc-950 p-7 text-right transition-colors duration-500 hover:bg-zinc-900 md:p-9">
              <span className="flex items-center justify-end gap-2 font-mono text-xs text-zinc-500">
                Next
                <ArrowRight size={13} strokeWidth={1.5} className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
              </span>
              <span className="mt-3 block font-display text-xl font-semibold tracking-tight text-zinc-200 group-hover:text-white md:text-2xl">
                {next.title}
              </span>
            </Link>
          </div>
        </Reveal>

        {/* Footer */}
        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/5 py-8 sm:flex-row">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Rafik Manla Hassan
          </p>
          <a href="mailto:rafiksalam81@gmail.com"
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 transition-colors duration-300 hover:text-white">
            rafiksalam81@gmail.com <ArrowUpRight size={12} strokeWidth={1.5} />
          </a>
        </div>
      </main>
    </div>
  );
}
