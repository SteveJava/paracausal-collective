'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const artists = [
  {
    name: 'MØRK',
    origin: 'Cape Town, ZA',
    genre: 'Dark Psytrance',
    sets: 12,
    color: '#371F76',
    bio: 'Architect of sonic rituals. Known for 3-hour sets that dissolve the boundary between dancer and sound.',
    initials: 'MK',
  },
  {
    name: 'QLIPHOTH',
    origin: 'Berlin, DE',
    genre: 'Industrial Techno',
    sets: 6,
    color: '#020079',
    bio: 'Machine-precise yet deeply human. Draws from Thelemic philosophy and modular synthesis.',
    initials: 'QL',
  },
  {
    name: 'VANTA',
    origin: 'Cape Town, ZA',
    genre: 'Forest Psy',
    sets: 9,
    color: '#4a3896',
    bio: 'Weaver of organic frequencies. Her sets feel like descending into a bioluminescent cave.',
    initials: 'VT',
  },
  {
    name: 'SIGIL',
    origin: 'Johannesburg, ZA',
    genre: 'Dark Progressive',
    sets: 7,
    color: '#1a1050',
    bio: 'Former architect turned sound designer. Builds sets with structural precision and emotional devastation.',
    initials: 'SG',
  },
  {
    name: 'OUROBOROS',
    origin: 'Amsterdam, NL',
    genre: 'Full-On Dark',
    sets: 4,
    color: '#2d1f6e',
    bio: 'Cyclical, hypnotic, relentless. Loops that evolve over hours without you noticing the shift.',
    initials: 'OB',
  },
  {
    name: 'NULL/VOID',
    origin: 'Cape Town, ZA',
    genre: 'Noise / Techno',
    sets: 11,
    color: '#020079',
    bio: 'The resident provocateur. Builds peaks through restraint, then erases them without warning.',
    initials: 'NV',
  },
];

function ArtistCard({ artist, index }: { artist: typeof artists[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex items-center gap-6 p-6 border border-white/5 hover:border-white/10 transition-all duration-500 cursor-pointer overflow-hidden"
      style={{ background: 'rgba(7,7,16,0.6)' }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 0% 50%, ${artist.color}08, transparent 60%)` }}
      />

      <div
        className="relative flex-shrink-0 w-14 h-14 flex items-center justify-center text-lg font-bold tracking-wider"
        style={{
          fontFamily: "'Archivo Black', sans-serif",
          background: `${artist.color}15`,
          border: `1px solid ${artist.color}30`,
          color: artist.color,
          letterSpacing: '0.1em',
        }}
      >
        {artist.initials}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: `inset 0 0 20px ${artist.color}20` }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-3 mb-1">
          <h3
            className="text-xl text-white tracking-wider"
            style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.1em' }}
          >
            {artist.name}
          </h3>
          <span
            className="text-[9px] tracking-widest uppercase px-2 py-0.5"
            style={{ color: artist.color, background: `${artist.color}12`, border: `1px solid ${artist.color}25` }}
          >
            {artist.genre}
          </span>
        </div>
        <p className="text-xs text-white/30 mb-2">{artist.origin}</p>
        <p className="text-xs text-white/40 leading-relaxed hidden group-hover:block transition-all duration-300">
          {artist.bio}
        </p>
        <p className="text-xs text-white/20 group-hover:hidden">{artist.sets} sets with Paracausal</p>
      </div>

      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5"
          style={{ color: artist.color }}>
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </div>

      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-600"
        style={{ background: `linear-gradient(to right, ${artist.color}60, transparent)` }}
      />
    </motion.div>
  );
}

export default function ArtistsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="artists" ref={ref} className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 40% 60% at 70% 30%, rgba(123,47,190,0.06) 0%, transparent 60%)' }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-16"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: '#4a3896' }}>The Collective</p>
          <h2
            className="text-6xl md:text-8xl text-white leading-none"
            style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.05em' }}
          >
            Artists &
            <br />
            <span className="text-white/20">Architects</span>
          </h2>
          <p className="mt-6 text-sm text-white/40 max-w-md leading-relaxed">
            A rotating cast of sonic architects, hand-selected for their ability to hold a crowd in liminal space — that place between trance and lucidity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
          {artists.map((artist, i) => (
            <ArtistCard key={artist.name} artist={artist} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
