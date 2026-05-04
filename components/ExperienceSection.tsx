'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const pillars = [
  {
    number: '01',
    title: 'Visual Architecture',
    body: 'Every event is a choreographed visual journey. From projection-mapped walls to reactive light systems, we engineer environments that respond to sound and motion.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <polygon points="20,2 38,32 2,32" stroke="#371F76" strokeWidth="1" fill="none" />
        <polygon points="20,10 30,28 10,28" stroke="#371F76" strokeWidth="0.5" fill="rgba(55,31,118,0.1)" />
        <circle cx="20" cy="20" r="2" fill="#371F76" />
      </svg>
    ),
    color: '#371F76',
  },
  {
    number: '02',
    title: 'Underground Venues',
    body: 'We exist in the spaces between worlds. Warehouses, bunkers, forests — locations chosen for their capacity to hold sonic weight and psychic charge.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="4" y="20" width="32" height="16" stroke="#020079" strokeWidth="1" fill="none" />
        <path d="M4 20 L20 6 L36 20" stroke="#020079" strokeWidth="1" fill="none" />
        <line x1="20" y1="20" x2="20" y2="36" stroke="#020079" strokeWidth="0.5" strokeDasharray="2,2" />
      </svg>
    ),
    color: '#020079',
  },
  {
    number: '03',
    title: 'Psychedelic Atmosphere',
    body: 'The air itself transforms. Smoke, fog, fragrance, and bass pressure combine into a multisensory field. You don\'t attend a Paracausal event — you enter one.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="20" cy="20" r="14" stroke="#4a3896" strokeWidth="1" fill="none" />
        <circle cx="20" cy="20" r="8" stroke="#4a3896" strokeWidth="0.5" fill="rgba(74,56,150,0.08)" />
        <circle cx="20" cy="20" r="3" fill="#4a3896" opacity="0.8" />
        <path d="M20 6 Q26 13 20 20 Q14 27 20 34" stroke="#4a3896" strokeWidth="0.5" fill="none" />
      </svg>
    ),
    color: '#4a3896',
  },
];

function PillarCard({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="group relative p-8 border border-white/5 hover:border-white/10 transition-colors duration-500"
      style={{
        background: 'rgba(7,7,16,0.8)',
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 20% 20%, ${pillar.color}08 0%, transparent 60%)` }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-8">
          <div style={{ filter: `drop-shadow(0 0 8px ${pillar.color}60)` }}>
            {pillar.icon}
          </div>
          <span
            className="text-6xl font-light leading-none"
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              color: `${pillar.color}15`,
              letterSpacing: '0.05em',
            }}
          >
            {pillar.number}
          </span>
        </div>

        <h3
          className="text-2xl text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
        >
          {pillar.title}
        </h3>

        <p className="text-sm text-white/40 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {pillar.body}
        </p>

        <div
          className="mt-8 h-px w-0 group-hover:w-full transition-all duration-700"
          style={{ background: `linear-gradient(to right, ${pillar.color}60, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(123,47,190,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="absolute left-6 top-0 bottom-0 w-px hidden lg:block" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <motion.div
          className="absolute top-0 left-0 w-full"
          style={{ height: lineHeight, background: 'linear-gradient(to bottom, rgba(123,47,190,0.6), rgba(57,255,20,0.3))' }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-20 lg:pl-12"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: '#4a3896' }}>The Paracausal Method</p>
          <h2
            className="text-6xl md:text-8xl text-white leading-none"
            style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.05em' }}
          >
            What We
            <br />
            <span className="text-white/20">Create</span>
          </h2>
          <p className="mt-6 text-sm text-white/40 max-w-md leading-relaxed">
            Paracausal exists at the intersection of sound, space, and altered perception. We don&apos;t throw parties. We construct portals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:pl-12">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.number} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
