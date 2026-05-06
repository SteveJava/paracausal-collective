'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

type GalleryItem = {
  id: number;
  event: string;
  date: string;
  cols: 1 | 2;
  rows: 1 | 2;
  // Video item
  thumb?: string;
  loop?: string;
  video?: string;
  // Placeholder item
  bg?: string;
  accent?: string;
  svg?: React.ReactNode;
};

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    event: 'ZDLCK B2B Skorgen',
    date: 'Apr 2026',
    cols: 2,
    rows: 2,
    thumb: '/gallery/skorgen-thumb.jpg',
    loop: '/gallery/skorgen-loop.mp4',
    video: '/gallery/skorgen.mp4',
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

function VideoTile({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  // Autoplay loop when tile enters view
  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isInView]);

  const colSpan = item.cols === 2 ? 'md:col-span-2' : 'md:col-span-1';
  const rowSpan = item.rows === 2 ? 'md:row-span-2' : 'md:row-span-1';
  const mobileHeight = item.rows === 2 ? 'h-64' : 'h-48';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden cursor-pointer col-span-1 ${colSpan} ${rowSpan} ${mobileHeight} md:h-auto`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Thumbnail shown until video is ready */}
      {item.thumb && (
        <img src={item.thumb} alt={item.event} className="absolute inset-0 w-full h-full object-cover" />
      )}

      {/* Loop video — autoplays muted when in view */}
      {item.loop && (
        <video
          ref={videoRef}
          src={item.loop}
          className="absolute inset-0 w-full h-full object-cover"
          muted loop playsInline preload="auto"
        />
      )}

      {/* Gradient + label — always visible */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-4 md:p-6"
        style={{ background: 'linear-gradient(to top, rgba(3,3,5,0.92) 0%, rgba(3,3,5,0.2) 50%, transparent 100%)' }}
      >
        <p className="text-[9px] tracking-widest uppercase mb-1 text-white/50">{item.date}</p>
        <p className="text-base text-white tracking-widest" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
          {item.event}
        </p>
      </div>

      {/* Persistent expand cue — pulsing in top-right */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <span className="text-[8px] tracking-widest uppercase text-white/50 hidden sm:block">Tap to watch</span>
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-7 h-7 flex items-center justify-center rounded-full border border-white/30"
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </motion.div>
      </div>

      <div
        className="absolute inset-0 border transition-all duration-300"
        style={{ borderColor: hovered ? 'rgba(74,56,150,0.6)' : 'rgba(255,255,255,0.05)' }}
      />
    </motion.div>
  );
}

function PlaceholderTile({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const colSpan = item.cols === 2 ? 'md:col-span-2' : 'md:col-span-1';
  const rowSpan = item.rows === 2 ? 'md:row-span-2' : 'md:row-span-1';
  const mobileHeight = item.rows === 2 ? 'h-64' : 'h-48';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden cursor-pointer col-span-1 ${colSpan} ${rowSpan} ${mobileHeight} md:h-auto`}
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

      {/* Label — always visible on mobile */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-4 md:p-6"
        style={{ background: 'linear-gradient(to top, rgba(3,3,5,0.9) 0%, transparent 60%)' }}
      >
        <p className="text-[9px] tracking-widest uppercase mb-1" style={{ color: item.accent }}>{item.date}</p>
        <p className="text-base text-white tracking-widest" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
          {item.event}
        </p>
      </div>

      <div
        className="absolute inset-0 border transition-all duration-300"
        style={{ borderColor: hovered ? `${item.accent}40` : 'transparent' }}
      />
    </motion.div>
  );
}

function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center p-4 sm:p-8"
      style={{ zIndex: 100, background: 'rgba(3,3,5,0.97)', backdropFilter: 'blur(20px)' }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl overflow-hidden"
        style={{ aspectRatio: '16/9' }}
      >
        {item.video ? (
          <video
            src={item.video}
            className="w-full h-full object-cover"
            autoPlay
            controls
            playsInline
          />
        ) : (
          <div className="w-full h-full" style={{ background: item.bg }}>
            {item.svg}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-[10px] tracking-[0.5em] uppercase mb-2 text-white/40">{item.date}</p>
              <p className="text-6xl text-white" style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.1em' }}>
                {item.event}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors"
          style={{ background: 'rgba(0,0,0,0.6)', clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)' }}
        >
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function GallerySection() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => setMounted(true), []);

  return (
    <section id="gallery" ref={ref} className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 80% 20%, rgba(55,31,118,0.07) 0%, transparent 60%)' }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: '#4a3896' }}>Archive</p>
          <h2
            className="text-white leading-none"
            style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.05em', fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
          >
            Past
            <br />
            <span className="text-white/20">Portals</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 md:auto-rows-[180px]">
          {galleryItems.map((item) =>
            item.thumb ? (
              <VideoTile key={item.id} item={item} onClick={() => setSelected(item)} />
            ) : (
              <PlaceholderTile key={item.id} item={item} onClick={() => setSelected(item)} />
            )
          )}
        </div>
      </div>

      {mounted && (
        <AnimatePresence>
          {selected && <Lightbox item={selected} onClose={() => setSelected(null)} />}
        </AnimatePresence>
      )}
    </section>
  );
}
