'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { createPortal } from 'react-dom';

type MediaItem = {
  id: number;
  type: 'video' | 'image';
  event: string;
  date: string;
  thumb: string;
  loop?: string;
  src: string;
  cols?: 1 | 2;
  rows?: 1 | 2;
};

const mediaItems: MediaItem[] = [
  {
    id: 1,
    type: 'video',
    event: 'ZDLCK B2B Skorgen',
    date: 'Apr 2026',
    thumb: '/gallery/skorgen-thumb.jpg',
    loop: '/gallery/skorgen-loop.mp4',
    src: '/gallery/skorgen.mp4',
    cols: 2,
    rows: 2,
  },
  // Placeholder slots — replace src/thumb with real images as they become available
  {
    id: 2,
    type: 'image',
    event: 'Afterlight I',
    date: 'Oct 2024',
    thumb: '',
    src: '',
  },
  {
    id: 3,
    type: 'image',
    event: 'Voidwalker',
    date: 'Dec 2024',
    thumb: '',
    src: '',
  },
  {
    id: 4,
    type: 'image',
    event: 'Threshold',
    date: 'Feb 2025',
    thumb: '',
    src: '',
  },
  {
    id: 5,
    type: 'image',
    event: 'Afterlight I',
    date: 'Oct 2024',
    thumb: '',
    src: '',
    rows: 2,
  },
  {
    id: 6,
    type: 'image',
    event: 'Voidwalker',
    date: 'Dec 2024',
    thumb: '',
    src: '',
  },
];

function MediaTile({ item, onClick }: { item: MediaItem; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (isInView && item.loop && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isInView, item.loop]);

  const colSpan = item.cols === 2 ? 'md:col-span-2' : 'md:col-span-1';
  const rowSpan = item.rows === 2 ? 'md:row-span-2' : 'md:row-span-1';
  const mobileH = item.rows === 2 ? 'h-64' : 'h-48';
  const hasMedia = !!item.thumb || !!item.src;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden cursor-pointer col-span-1 ${colSpan} ${rowSpan} ${mobileH} md:h-auto`}
      style={{ border: '1px solid rgba(255,255,255,0.05)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={hasMedia ? onClick : undefined}
    >
      {/* Media or placeholder */}
      {hasMedia ? (
        <>
          {item.thumb && (
            <img src={item.thumb} alt={item.event} className="absolute inset-0 w-full h-full object-cover" />
          )}
          {item.loop && (
            <video
              ref={videoRef}
              src={item.loop}
              className="absolute inset-0 w-full h-full object-cover"
              muted loop playsInline preload="auto"
            />
          )}
          {item.type === 'image' && item.src && (
            <img src={item.src} alt={item.event} className="absolute inset-0 w-full h-full object-cover" />
          )}
        </>
      ) : (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, rgba(74,56,150,0.06) 0%, rgba(2,0,121,0.03) 100%)' }}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white/10" fill="none" stroke="currentColor" strokeWidth="1">
            {item.type === 'video'
              ? <><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></>
              : <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></>
            }
          </svg>
          <p className="text-[9px] tracking-widest uppercase text-white/15">{item.event}</p>
          <p className="text-[8px] tracking-wider text-white/10">{item.date}</p>
        </div>
      )}

      {/* Gradient + label */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-4"
        style={{ background: hasMedia ? 'linear-gradient(to top, rgba(3,3,5,0.9) 0%, transparent 55%)' : 'none' }}
      >
        {hasMedia && (
          <>
            <p className="text-[9px] tracking-widest uppercase mb-0.5 text-white/40">{item.date}</p>
            <p className="text-sm text-white tracking-wider" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              {item.event}
            </p>
          </>
        )}
      </div>

      {/* Expand icon for media items */}
      {hasMedia && (
        <motion.div
          animate={{ opacity: hovered ? 1 : 0.5, scale: hovered ? 1 : 0.95 }}
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full border border-white/20"
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          {item.type === 'video' ? (
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="white" strokeWidth="1.5">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          )}
        </motion.div>
      )}

      <div
        className="absolute inset-0 border transition-all duration-300 pointer-events-none"
        style={{ borderColor: hovered && hasMedia ? 'rgba(74,56,150,0.5)' : 'transparent' }}
      />
    </motion.div>
  );
}

function Lightbox({ item, onClose }: { item: MediaItem; onClose: () => void }) {
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
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-5xl overflow-hidden"
        style={{ aspectRatio: '16/9' }}
      >
        {item.type === 'video' ? (
          <video src={item.src} className="w-full h-full object-cover" autoPlay controls playsInline />
        ) : (
          <img src={item.src} alt={item.event} className="w-full h-full object-contain" />
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center border border-white/20 text-white/60 hover:text-white transition-colors"
          style={{ background: 'rgba(0,0,0,0.7)', clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)' }}
        >
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function GalleryPage() {
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-[#080808] text-[#FFFDFA]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 80% 20%, rgba(55,31,118,0.07) 0%, transparent 60%)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-24" ref={ref}>
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
          className="mb-12"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: '#4a3896' }}>Archive</p>
          <h1
            className="text-white leading-none"
            style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.05em', fontSize: 'clamp(3rem, 10vw, 7rem)' }}
          >
            Gallery
            <br />
            <span className="text-white/20">& Media</span>
          </h1>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 md:auto-rows-[200px]">
          {mediaItems.map(item => (
            <MediaTile
              key={item.id}
              item={item}
              onClick={() => item.src && setSelected(item)}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-[9px] tracking-[0.4em] text-white/15 uppercase mt-12"
        >
          More content coming soon
        </motion.p>
      </div>

      {mounted && (
        <AnimatePresence>
          {selected && createPortal(
            <Lightbox item={selected} onClose={() => setSelected(null)} />,
            document.body
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
