'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const upcomingEvent = {
  title: 'Afterlight V',
  date: '31 July 2026',
  venue: 'Cape Town, South Africa',
  status: 'Tickets Available',
  banner: '/events/afterlight-v-banner.jpg',
  href: '/checkout',
};

const pastEvents = [
  {
    id: 1,
    title: 'Afterlight IV',
    date: 'Nov 2025',
    venue: 'Cape Town, South Africa',
    banner: '/events/afterlight-iv-banner.webp',
  },
  {
    id: 2,
    title: 'Afterlight III',
    date: 'Jun 2025',
    venue: 'Cape Town, South Africa',
    banner: '/events/afterlight-iii-banner.jpeg',
  },
  {
    id: 3,
    title: 'Afterlight II',
    date: 'Feb 2025',
    venue: 'Cape Town, South Africa',
    banner: '/events/afterlight-ii-banner.jpeg',
  },
  {
    id: 4,
    title: 'Afterlight I',
    date: 'Oct 2024',
    venue: 'Cape Town, South Africa',
    banner: '/events/afterlight-i-banner.png',
  },
  {
    id: 5,
    title: 'Boilah Room',
    date: '2024',
    venue: 'Cape Town, South Africa',
    banner: '/events/boilah-room-banner.jpeg',
  },
];

// Gradient palettes per event — bottom-heavy so text stays readable, top stays open
const gradients: Record<string, string> = {
  'Afterlight V':   'linear-gradient(to top, rgba(3,3,5,0.92) 0%, rgba(3,3,5,0.4) 50%, rgba(3,3,5,0.1) 100%)',
  'Afterlight IV':  'linear-gradient(to top, rgba(3,3,5,0.92) 0%, rgba(3,3,5,0.35) 50%, rgba(3,3,5,0.05) 100%)',
  'Afterlight III': 'linear-gradient(to top, rgba(3,3,5,0.92) 0%, rgba(3,3,5,0.35) 50%, rgba(3,3,5,0.05) 100%)',
  'Afterlight II':  'linear-gradient(to top, rgba(3,3,5,0.92) 0%, rgba(3,3,5,0.35) 50%, rgba(3,3,5,0.05) 100%)',
  'Afterlight I':   'linear-gradient(to top, rgba(3,3,5,0.92) 0%, rgba(3,3,5,0.35) 50%, rgba(3,3,5,0.05) 100%)',
  'Boilah Room':    'linear-gradient(to top, rgba(3,3,5,0.92) 0%, rgba(3,3,5,0.35) 50%, rgba(3,3,5,0.05) 100%)',
};

function UpcomingBanner() {
  const hasImage = false; // flip to true once /public/events/afterlight-v-banner.jpg exists

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden w-full"
      style={{
        aspectRatio: '21/9',
        border: '1px solid rgba(74,56,150,0.3)',
        minHeight: 280,
      }}
    >
      {/* Banner image — hidden until file exists */}
      {hasImage && (
        <img
          src={upcomingEvent.banner}
          alt={upcomingEvent.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Gradient fill / overlay — bottom-heavy for readability */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(3,3,5,0.95) 0%, rgba(3,3,5,0.45) 45%, rgba(3,3,5,0.12) 100%)' }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '160px',
        }}
      />

      {/* Decorative grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" preserveAspectRatio="none">
        <defs>
          <pattern id="grid-up" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-up)" />
      </svg>

      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 80% at 80% 40%, rgba(74,56,150,0.25) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14">
        {/* Status badge */}
        <div className="mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#9b7fd4' }} />
          <span className="text-[9px] tracking-[0.5em] uppercase" style={{ color: '#9b7fd4' }}>
            {upcomingEvent.status}
          </span>
        </div>

        {/* Title */}
        <h2
          className="text-white leading-none mb-3"
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            letterSpacing: '0.05em',
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
          }}
        >
          {upcomingEvent.title}
        </h2>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 mb-8">
          <span className="text-white/50 text-sm tracking-wider">{upcomingEvent.date}</span>
          <span className="hidden sm:block w-px h-4 bg-white/15" />
          <span className="text-white/35 text-sm tracking-wider">{upcomingEvent.venue}</span>
        </div>

        {/* CTA */}
        <div>
          <a
            href="/checkout"
            className="inline-flex items-center gap-3 px-8 py-4 text-xs tracking-widest uppercase text-white transition-opacity hover:opacity-80"
            style={{
              background: 'linear-gradient(135deg, rgba(2,0,121,0.95), rgba(74,56,150,0.85))',
              clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
              border: '1px solid rgba(74,56,150,0.5)',
            }}
          >
            Get Tickets
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </div>
      </div>

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
        style={{ background: 'radial-gradient(circle at top right, rgba(74,56,150,0.3) 0%, transparent 70%)' }}
      />
    </motion.div>
  );
}

function PastEventCard({ event, index }: { event: typeof pastEvents[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const hasImage = !!event.banner;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden group cursor-default"
      style={{
        aspectRatio: '16/7',
        border: '1px solid rgba(255,255,255,0.06)',
        minHeight: 160,
      }}
    >
      {hasImage && (
        <img
          src={event.banner}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-500"
        />
      )}

      {/* Gradient */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ background: gradients[event.title] ?? gradients['Afterlight I'] }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '140px',
        }}
      />

      {/* Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]" preserveAspectRatio="none">
        <defs>
          <pattern id={`grid-past-${event.id}`} width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-past-${event.id})`} />
      </svg>

      {/* Hover glow edge */}
      <div
        className="absolute inset-0 border opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ borderColor: 'rgba(74,56,150,0.45)' }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-7">
        <p className="text-[9px] tracking-[0.4em] uppercase text-white/30 mb-1.5">{event.date}</p>
        <h3
          className="text-white/75 group-hover:text-white transition-colors duration-300 leading-none"
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            letterSpacing: '0.05em',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)',
          }}
        >
          {event.title}
        </h3>
        <p className="text-white/25 text-xs tracking-wider mt-1.5">{event.venue}</p>
      </div>

      {/* Archive badge */}
      <div className="absolute top-4 right-4">
        <span
          className="text-[8px] tracking-[0.4em] uppercase px-2.5 py-1"
          style={{
            color: 'rgba(255,255,255,0.25)',
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(0,0,0,0.4)',
          }}
        >
          Archive
        </span>
      </div>
    </motion.div>
  );
}

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#FFFDFA]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 70% 10%, rgba(55,31,118,0.09) 0%, transparent 60%)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-28">
        {/* Back */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12">
          <Link href="/" className="text-white/40 hover:text-white transition-colors text-xs tracking-widest uppercase">
            ← Home
          </Link>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: '#4a3896' }}>Events</p>
          <h1
            className="text-white leading-none"
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              letterSpacing: '0.05em',
              fontSize: 'clamp(3rem, 10vw, 7rem)',
            }}
          >
            Nights &<br />
            <span className="text-white/20">History</span>
          </h1>
        </motion.div>

        {/* ── Upcoming ── */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <p className="text-[9px] tracking-[0.5em] uppercase text-white/40">Upcoming</p>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>
          <UpcomingBanner />
        </section>

        {/* ── Past Events ── */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <p className="text-[9px] tracking-[0.5em] uppercase text-white/40">Past Events</p>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>

          {/* First two: side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
            {pastEvents.slice(0, 2).map((event, i) => (
              <PastEventCard key={event.id} event={event} index={i} />
            ))}
          </div>

          {/* Remaining three: side by side on md+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {pastEvents.slice(2).map((event, i) => (
              <PastEventCard key={event.id} event={event} index={i + 2} />
            ))}
          </div>
        </section>

        {/* Footer label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center text-[9px] tracking-[0.4em] text-white/15 uppercase mt-16"
        >
          Paracausal Collective · Cape Town, South Africa
        </motion.p>
      </div>
    </div>
  );
}
