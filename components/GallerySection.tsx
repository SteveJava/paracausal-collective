'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const galleryItems = [
  {
    id: 1,
    event: 'AFTERLIGHT I',
    date: 'Oct 2024',
    cols: 2,
    rows: 2,
    bg: 'linear-gradient(135deg, #1a0030 0%, #0d001f 40%, #030010 100%)',
    accent: '#371F76',
    svg: (
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-40">
        <defs>
          <radialGradient id="g1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4a3896" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7b2fbe" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="80" fill="url(#g1)" />
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1="100" y1="100"
            x2={100 + 90 * Math.cos((i * Math.PI) / 4)}
            y2={100 + 90 * Math.sin((i * Math.PI) / 4)}
            stroke="#4a3896" strokeWidth="0.5" strokeOpacity="0.4"
          />
        ))}
        <circle cx="100" cy="100" r="30" fill="none" stroke="#4a3896" strokeWidth="0.5" strokeOpacity="0.5" />
        <circle cx="100" cy="100" r="55" fill="none" stroke="#7b2fbe" strokeWidth="0.3" strokeOpacity="0.3" />
      </svg>
    ),
  },
  {
    id: 2,
    event: 'VOIDWALKER',
    date: 'Dec 2024',
    cols: 1,
    rows: 1,
    bg: 'linear-gradient(135deg, #001a10 0%, #000d08 100%)',
    accent: '#020079',
    svg: (
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-30">
        {[...Array(10)].map((_, i) => (
          <polygon
            key={i}
            points="100,20 180,160 20,160"
            fill="none"
            stroke="#020079"
            strokeWidth="0.5"
            strokeOpacity={0.5 - i * 0.04}
            transform={`rotate(${i * 8}, 100, 100) scale(${1 - i * 0.08}, ${1 - i * 0.08})`}
            style={{ transformOrigin: '100px 100px' }}
          />
        ))}
      </svg>
    ),
  },
  {
    id: 3,
    event: 'THRESHOLD',
    date: 'Feb 2025',
    cols: 1,
    rows: 1,
    bg: 'linear-gradient(135deg, #001a1a 0%, #000d0d 100%)',
    accent: '#4a3896',
    svg: (
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-30">
        <defs>
          <radialGradient id="g3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4a3896" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4a3896" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="70" fill="url(#g3)" />
        {[20, 40, 60, 80].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#4a3896" strokeWidth="0.5" strokeOpacity="0.4" />
        ))}
      </svg>
    ),
  },
  {
    id: 4,
    event: 'AFTERLIGHT I',
    date: 'Oct 2024',
    cols: 1,
    rows: 2,
    bg: 'linear-gradient(135deg, #100020 0%, #060010 100%)',
    accent: '#2d1f6e',
    svg: (
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-25">
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1="100" y1="0" x2="100" y2="200"
            stroke="#2d1f6e"
            strokeWidth="0.5"
            strokeOpacity="0.3"
            transform={`rotate(${i * 15}, 100, 100)`}
          />
        ))}
        <circle cx="100" cy="100" r="40" fill="none" stroke="#2d1f6e" strokeWidth="1" strokeOpacity="0.4" />
      </svg>
    ),
  },
  {
    id: 5,
    event: 'VOIDWALKER',
    date: 'Dec 2024',
    cols: 1,
    rows: 1,
    bg: 'linear-gradient(135deg, #001020 0%, #000810 100%)',
    accent: '#371F76',
    svg: (
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-30">
        <defs>
          <linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7b2fbe" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4a3896" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <rect x="30" y="30" width="140" height="140" fill="none" stroke="url(#g5)" strokeWidth="0.5" />
        <rect x="50" y="50" width="100" height="100" fill="none" stroke="url(#g5)" strokeWidth="0.5" transform="rotate(20, 100, 100)" />
        <rect x="70" y="70" width="60" height="60" fill="none" stroke="url(#g5)" strokeWidth="0.5" transform="rotate(40, 100, 100)" />
      </svg>
    ),
  },
];

function GalleryItem({ item, onClick }: { item: typeof galleryItems[0]; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const colSpan = item.cols === 2 ? 'md:col-span-2' : 'md:col-span-1';
  const rowSpan = item.rows === 2 ? 'md:row-span-2' : 'md:row-span-1';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden cursor-pointer ${colSpan} ${rowSpan}`}
      style={{ minHeight: item.rows === 2 ? 360 : 180 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className="absolute inset-0" style={{ background: item.bg }}>
        {item.svg}
      </div>

      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${item.accent}20 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex flex-col justify-end p-6"
        style={{ background: 'linear-gradient(to top, rgba(3,3,5,0.9) 0%, transparent 60%)' }}
      >
        <p className="text-[9px] tracking-widest uppercase mb-1" style={{ color: item.accent }}>{item.date}</p>
        <p className="text-lg text-white tracking-widest" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
          {item.event}
        </p>
      </motion.div>

      <div
        className="absolute inset-0 border transition-all duration-400"
        style={{ borderColor: hovered ? `${item.accent}40` : 'transparent' }}
      />

      <motion.div
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.6 }}
        className="absolute top-4 right-4"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="white" strokeWidth="1.5">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function GallerySection() {
  const [selected, setSelected] = useState<typeof galleryItems[0] | null>(null);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="gallery" ref={ref} className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 50% at 20% 80%, rgba(57,255,20,0.04) 0%, transparent 60%)' }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: '#4a3896' }}>Archive</p>
          <h2
            className="text-6xl md:text-8xl text-white leading-none"
            style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.05em' }}
          >
            Past
            <br />
            <span className="text-white/20">Portals</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 auto-rows-[180px]">
          {galleryItems.map((item) => (
            <GalleryItem key={item.id} item={item} onClick={() => setSelected(item)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: 'rgba(3,3,5,0.95)', backdropFilter: 'blur(20px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl aspect-video overflow-hidden"
              style={{ background: selected.bg }}
            >
              {selected.svg}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[10px] tracking-[0.5em] uppercase mb-2" style={{ color: selected.accent }}>
                  {selected.date}
                </p>
                <p
                  className="text-6xl text-white"
                  style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.1em' }}
                >
                  {selected.event}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
