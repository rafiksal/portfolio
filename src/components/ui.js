import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const EASE = [0.32, 0.72, 0, 1];

export function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Heavy fade-up on viewport entry, shared by every section
export function Reveal({ children, delay = 0, className = '' }) {
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

export function SectionTitle({ children, className = '' }) {
  return (
    <h2 className={`font-display font-semibold text-4xl md:text-6xl tracking-tight text-zinc-100 ${className}`}
      style={{ textWrap: 'balance' }}>
      {children}
    </h2>
  );
}

// Primary CTA: pill with the arrow nested in its own circular island
export function IslandButton({ children, onClick, href, external = false }) {
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
    ? <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>{inner}</a>
    : <button onClick={onClick} className={cls}>{inner}</button>;
}

// Card with a cursor-tracking spotlight border. Writes CSS vars directly on the
// node (no React state) so hover tracking never re-renders the tree.
export function SpotlightCard({ children, className = '' }) {
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

export function GlowBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute -top-40 left-1/4 h-[36rem] w-[36rem] rounded-full opacity-25"
        style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.16), transparent 65%)' }} />
      <div className="absolute top-[60%] -right-40 h-[30rem] w-[30rem] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 65%)' }} />
    </div>
  );
}
