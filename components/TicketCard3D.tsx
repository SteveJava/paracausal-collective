'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';

const CIRCUIT_PATHS = [
  'M 20 40 L 60 40 L 60 20 L 80 20',
  'M 160 30 L 160 50 L 140 50 L 140 70',
  'M 30 120 L 50 120 L 50 140 L 70 140',
  'M 150 110 L 170 110 L 170 130',
  'M 80 160 L 80 145 L 100 145',
  'M 110 20 L 110 35 L 125 35',
  'M 35 80 L 55 80 L 55 95',
  'M 145 80 L 130 80 L 130 95 L 115 95',
];

const CIRCUIT_DOTS: [number, number][] = [
  [60, 20], [80, 20], [160, 30], [140, 70], [50, 140], [70, 140],
  [170, 130], [100, 145], [110, 35], [125, 35], [55, 95], [115, 95],
];

function CardFace({ back = false }: { back?: boolean }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: back ? 'rotateY(180deg)' : undefined,
        background: 'linear-gradient(135deg, #0d0020 0%, #0a001a 40%, #050014 100%)',
        clipPath:
          'polygon(18px 0%, calc(100% - 18px) 0%, 100% 18px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0% calc(100% - 18px), 0% 18px)',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 40% 45%, rgba(74,56,150,0.30) 0%, rgba(55,31,118,0.16) 40%, rgba(2,0,121,0.08) 70%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(118deg, transparent 30%, rgba(255,253,250,0.03) 48%, rgba(255,253,250,0.09) 50%, rgba(255,253,250,0.03) 52%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
      />
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 100"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.18 }}
      >
        {CIRCUIT_PATHS.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#7b5fc0" strokeWidth="0.6" strokeLinecap="square" />
        ))}
        {CIRCUIT_DOTS.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.2" fill="#9b7fd4" />
        ))}
        <rect x="154" y="6" width="12" height="1" fill="#6040a0" opacity="0.6" />
        <rect x="168" y="6" width="6" height="1" fill="#6040a0" opacity="0.6" />
        <rect x="30" y="88" width="12" height="1" fill="#6040a0" opacity="0.6" />
        <rect x="16" y="88" width="6" height="1" fill="#6040a0" opacity="0.6" />
      </svg>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          clipPath:
            'polygon(18px 0%, calc(100% - 18px) 0%, 100% 18px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0% calc(100% - 18px), 0% 18px)',
          boxShadow: 'inset 0 0 0 1px rgba(120,80,200,0.45)',
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-between p-[6%]" style={back ? { transform: 'scaleX(-1)' } : undefined}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white/40 uppercase" style={{ fontSize: 'clamp(5px, 1.2vw, 9px)', letterSpacing: '0.35em' }}>
              Paracausal Collective
            </p>
            <p className="text-white/20 uppercase mt-0.5" style={{ fontSize: 'clamp(4px, 0.9vw, 7px)', letterSpacing: '0.3em' }}>
              Chapter II
            </p>
          </div>
          <div
            className="flex items-center gap-1 px-2 py-0.5 border"
            style={{ borderColor: 'rgba(74,56,150,0.5)', background: 'rgba(74,56,150,0.12)', fontSize: 'clamp(4px, 0.9vw, 7px)', letterSpacing: '0.3em', color: '#9b7fd4' }}
          >
            <span className="rounded-full animate-pulse" style={{ width: 4, height: 4, background: '#7b5fc0', display: 'inline-block' }} />
            UPCOMING
          </div>
        </div>
        <p
          className="text-white leading-none"
          style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 'clamp(22px, 7vw, 54px)', letterSpacing: '0.08em', textShadow: '0 0 20px rgba(120,80,200,0.8), 0 0 40px rgba(55,31,118,0.5)' }}
        >
          AFTERLIGHT
        </p>
        <div className="flex items-end justify-between">
          <div className="flex gap-4">
            {[{ label: 'Date', value: '14 JUN' }, { label: 'Venue', value: 'EVOL' }, { label: 'Doors', value: '22:00' }].map(({ label, value }) => (
              <div key={label}>
                <p className="text-white/25 uppercase" style={{ fontSize: 'clamp(4px, 0.8vw, 6px)', letterSpacing: '0.3em' }}>{label}</p>
                <p className="text-white/70 uppercase mt-0.5" style={{ fontSize: 'clamp(6px, 1.3vw, 10px)', letterSpacing: '0.2em' }}>{value}</p>
              </div>
            ))}
          </div>
          <div style={{ width: 'clamp(24px, 5vw, 36px)', height: 'clamp(24px, 5vw, 36px)', border: '1px solid rgba(74,56,150,0.4)', background: 'rgba(2,0,121,0.2)', clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 16 16" style={{ width: '45%' }} fill="none" stroke="#9b7fd4" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpandedTicket({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [tier, setTier] = useState<'ga' | 'vip'>('ga');
  const [added, setAdded] = useState(false);

  const tiers = {
    ga: { label: 'General Admission', price: 350 },
    vip: { label: 'VIP Access', price: 650 },
  };

  return (
    <motion.div
      key="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 overflow-y-auto"
      style={{ zIndex: 100, background: 'rgba(3,3,5,0.88)', backdropFilter: 'blur(18px)' }}
      onClick={onClose}
    >
      <div className="min-h-full flex items-center justify-center p-4 sm:p-8">
        <motion.div
          key="card"
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #0e0022 0%, #080016 50%, #040010 100%)',
            clipPath: 'polygon(16px 0%, calc(100% - 16px) 0%, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0% calc(100% - 16px), 0% 16px)',
            boxShadow: '0 0 80px rgba(55,31,118,0.5), 0 0 160px rgba(2,0,121,0.25), 0 40px 120px rgba(0,0,0,0.8)',
          }}
        >
          {/* Iridescent overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 90% 60% at 30% 40%, rgba(74,56,150,0.22) 0%, rgba(2,0,121,0.08) 60%, transparent 100%)' }} />

          {/* Circuit SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.10 }}>
            {CIRCUIT_PATHS.map((d, i) => <path key={i} d={d} fill="none" stroke="#7b5fc0" strokeWidth="0.8" strokeLinecap="square" />)}
            {CIRCUIT_DOTS.map(([cx, cy], i) => <circle key={i} cx={cx * 2} cy={cy * 3} r="2" fill="#9b7fd4" />)}
            <line x1="0" y1="120" x2="400" y2="120" stroke="#4a3896" strokeWidth="0.4" strokeOpacity="0.4" strokeDasharray="4,8" />
            <line x1="0" y1="200" x2="400" y2="200" stroke="#4a3896" strokeWidth="0.4" strokeOpacity="0.3" strokeDasharray="4,8" />
          </svg>

          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)' }} />

          {/* Inner border */}
          <div className="absolute inset-0 pointer-events-none" style={{ clipPath: 'polygon(16px 0%, calc(100% - 16px) 0%, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0% calc(100% - 16px), 0% 16px)', boxShadow: 'inset 0 0 0 1px rgba(120,80,200,0.4)' }} />

          <div className="relative z-10 p-5 sm:p-10">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
              style={{ clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)' }}
            >
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>

            {/* Header */}
            <div className="flex items-start justify-between mb-6 pr-10">
              <div>
                <p className="text-[9px] tracking-[0.4em] text-white/30 uppercase mb-1">Paracausal Collective · Chapter II</p>
                <h2
                  className="text-3xl sm:text-6xl text-white leading-none"
                  style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.05em', textShadow: '0 0 30px rgba(120,80,200,0.7)' }}
                >
                  AFTERLIGHT
                </h2>
              </div>
              <div
                className="hidden sm:flex items-center gap-1.5 px-3 py-1 border shrink-0 mt-1"
                style={{ borderColor: 'rgba(74,56,150,0.5)', background: 'rgba(74,56,150,0.12)', color: '#9b7fd4' }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#7b5fc0' }} />
                <span className="text-[9px] tracking-[0.35em] uppercase">Upcoming</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px mb-5 sm:mb-7" style={{ background: 'linear-gradient(to right, rgba(74,56,150,0.5), transparent)' }} />

            {/* Event details grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 mb-5 sm:mb-7">
              {[
                { label: 'Date', value: 'SAT 14 JUNE', sub: '2025' },
                { label: 'Venue', value: 'EVOL', sub: 'Cape Town' },
                { label: 'Doors', value: '22:00', sub: 'Until 06:00' },
                { label: 'Genre', value: 'Dark Psy', sub: 'Techno' },
              ].map(({ label, value, sub }) => (
                <div key={label}>
                  <p className="text-[8px] tracking-[0.35em] text-white/25 uppercase mb-1">{label}</p>
                  <p className="text-xs sm:text-sm text-white/80 tracking-wider uppercase">{value}</p>
                  <p className="text-[10px] text-white/35 tracking-wider mt-0.5">{sub}</p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px mb-5 sm:mb-7" style={{ background: 'linear-gradient(to right, rgba(74,56,150,0.4), transparent)' }} />

            {/* About */}
            <div className="mb-5 sm:mb-7">
              <p className="text-[8px] tracking-[0.35em] text-white/25 uppercase mb-3">About This Event</p>
              <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                Chapter II of the Afterlight series. A night of dark psychedelic sounds in the depths of Cape Town's underground. Expect relentless energy, immersive visuals, and a carefully curated sonic journey from dusk until dawn.
              </p>
            </div>

            {/* Lineup */}
            <div className="mb-5 sm:mb-8">
              <p className="text-[8px] tracking-[0.35em] text-white/25 uppercase mb-3">Lineup</p>
              <div className="flex flex-wrap gap-2">
                {['MØRK', 'QLIPHOTH', 'VANTA', 'NULL/VOID'].map((name) => (
                  <span
                    key={name}
                    className="px-3 py-1 text-[10px] tracking-widest uppercase text-white/60 border border-white/10"
                    style={{ clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)' }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px mb-5 sm:mb-7" style={{ background: 'linear-gradient(to right, rgba(74,56,150,0.4), transparent)' }} />

            {/* Ticket selection */}
            <div className="mb-5 sm:mb-7">
              <p className="text-[8px] tracking-[0.35em] text-white/25 uppercase mb-3 sm:mb-4">Select Ticket</p>
              <div className="flex flex-col sm:flex-row gap-3">
                {(Object.entries(tiers) as [typeof tier, typeof tiers.ga][]).map(([key, { label, price }]) => (
                  <button
                    key={key}
                    onClick={() => setTier(key)}
                    className="flex-1 flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border transition-all duration-200"
                    style={{
                      borderColor: tier === key ? 'rgba(74,56,150,0.8)' : 'rgba(255,255,255,0.08)',
                      background: tier === key ? 'rgba(74,56,150,0.15)' : 'transparent',
                      clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
                    }}
                  >
                    <p className="text-xs tracking-widest uppercase text-white/70">{label}</p>
                    <p className="text-sm tracking-wider" style={{ color: tier === key ? '#9b7fd4' : 'rgba(255,255,255,0.4)' }}>
                      R{price}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + CTA */}
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-white/10 shrink-0" style={{ clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)' }}>
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-9 h-10 sm:w-10 sm:h-11 text-white/50 hover:text-white transition-colors text-lg leading-none"
                >
                  −
                </button>
                <span className="w-7 text-center text-sm text-white/80 tracking-widest">{qty}</span>
                <button
                  onClick={() => setQty(q => Math.min(10, q + 1))}
                  className="w-9 h-10 sm:w-10 sm:h-11 text-white/50 hover:text-white transition-colors text-lg leading-none"
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={() => {
                  if (added) { router.push(`/checkout`); return; }
                  addToCart({ tier, qty, price: tiers[tier].price, name: `Afterlight ${tiers[tier].label}` });
                  setAdded(true);
                  setTimeout(() => setAdded(false), 3000);
                }}
                className="flex-1 h-10 sm:h-11 flex items-center justify-between px-4 sm:px-6 text-xs tracking-widest uppercase text-white transition-all duration-300 hover:opacity-90 min-w-0"
                style={{
                  background: added
                    ? 'linear-gradient(135deg, rgba(2,0,121,0.6), rgba(55,31,118,0.5))'
                    : 'linear-gradient(135deg, rgba(2,0,121,0.95), rgba(55,31,118,0.8))',
                  clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                }}
              >
                {added ? (
                  <>
                    <span className="flex items-center gap-2 truncate">
                      <svg viewBox="0 0 20 20" className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="4 10 8 14 16 6" />
                      </svg>
                      <span className="truncate">Added</span>
                    </span>
                    <span className="text-white/50 text-[10px] shrink-0 ml-2">Checkout →</span>
                  </>
                ) : (
                  <>
                    <span>Add to Cart</span>
                    <span className="text-white/60 text-[10px]">R{tiers[tier].price * qty}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function TicketCard3D({ hero = false }: { hero?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: hero ? '0px' : '-100px' });

  const [expanded, setExpanded] = useState(false);

  const angleRef = useRef(0);
  const lastTsRef = useRef(0);
  const hoveredRef = useRef(false);
  const expandedRef = useRef(false);
  const mouseTiltRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  // Keep expandedRef in sync
  useEffect(() => {
    expandedRef.current = expanded;
    if (expanded) {
      hoveredRef.current = false;
      mouseTiltRef.current = { x: 0, y: 0 };
    }
  }, [expanded]);

  useEffect(() => {
    const animate = (ts: number) => {
      if (lastTsRef.current) {
        const delta = ts - lastTsRef.current;
        if (!hoveredRef.current && !expandedRef.current) {
          angleRef.current -= (delta / 10000) * 360;
        }
      }
      lastTsRef.current = ts;

      if (innerRef.current) {
        if (expandedRef.current) {
          innerRef.current.style.transform = 'rotateY(0deg)';
        } else if (hoveredRef.current) {
          innerRef.current.style.transform = `rotateX(${mouseTiltRef.current.x}deg) rotateY(${mouseTiltRef.current.y}deg)`;
        } else {
          innerRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
        }
      }

      if (shadowRef.current && !expandedRef.current) {
        const n = Math.abs(Math.cos((angleRef.current * Math.PI) / 180));
        shadowRef.current.style.transform = `translateX(-50%) scaleX(${0.5 + n * 0.5})`;
        shadowRef.current.style.opacity = String(0.2 + n * 0.25);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (expandedRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    mouseTiltRef.current = {
      x: ((e.clientY - r.top) / r.height - 0.5) * -22,
      y: ((e.clientX - r.left) / r.width - 0.5) * 28,
    };
  }, []);

  const onMouseEnter = useCallback(() => { if (!expandedRef.current) hoveredRef.current = true; }, []);
  const onMouseLeave = useCallback(() => {
    hoveredRef.current = false;
    mouseTiltRef.current = { x: 0, y: 0 };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className={`relative flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 ${
          hero ? 'min-h-screen' : 'py-24 sm:py-32'
        }`}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(55,31,118,0.14) 0%, transparent 70%)' }}
        />

        {/* Header / glitch title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`text-center relative z-10 ${hero ? 'mb-10 sm:mb-14' : 'mb-14'}`}
        >
          <p className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: '#4a3896' }}>
            Next Event
          </p>
          <div className="relative select-none inline-block">
            <h1
              className="text-white leading-none"
              style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.05em', fontSize: hero ? 'clamp(2.4rem, 13vw, 9rem)' : 'clamp(2rem, 11vw, 5rem)' }}
            >
              AFTERLIGHT
            </h1>
            <h1
              aria-hidden
              className="absolute inset-0 leading-none"
              style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.05em', fontSize: hero ? 'clamp(2.4rem, 13vw, 9rem)' : 'clamp(2rem, 11vw, 5rem)', color: '#371F76', animation: 'glitch-1 4s infinite steps(1)', clipPath: 'inset(0 0 90% 0)', opacity: 0.8 }}
            >
              AFTERLIGHT
            </h1>
            <h1
              aria-hidden
              className="absolute inset-0 leading-none"
              style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.05em', fontSize: hero ? 'clamp(2.4rem, 13vw, 9rem)' : 'clamp(2rem, 11vw, 5rem)', color: '#020079', animation: 'glitch-2 5s infinite steps(1)', opacity: 0.6 }}
            >
              AFTERLIGHT
            </h1>
          </div>
          <p className="mt-4 text-sm text-white/40 tracking-widest">Chapter II · 14 June 2025</p>
        </motion.div>

        {/* 3D stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 40 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
          style={{ perspective: '1100px' }}
          onMouseMove={onMouseMove}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div
            ref={innerRef}
            className="relative select-none"
            style={{
              width: hero ? 'clamp(320px, 88vw, 700px)' : 'clamp(300px, 80vw, 520px)',
              aspectRatio: '520 / 220',
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              cursor: expanded ? 'default' : 'pointer',
            }}
            onClick={() => !expanded && setExpanded(true)}
          >
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ boxShadow: '0 0 80px rgba(55,31,118,0.55), 0 0 160px rgba(2,0,121,0.3), 0 40px 100px rgba(0,0,0,0.7)', transform: 'translateZ(-1px)' }}
            />
            <CardFace />
            <CardFace back />
          </div>

          <div
            ref={shadowRef}
            className="absolute left-1/2 pointer-events-none"
            style={{ bottom: '-28px', width: '75%', height: '20px', background: 'radial-gradient(ellipse, rgba(55,31,118,0.4) 0%, transparent 70%)', filter: 'blur(10px)', transform: 'translateX(-50%)' }}
          />
        </motion.div>

        {hero && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.4 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          >
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-[#371F76]/60 to-transparent animate-pulse" />
            <p className="text-[9px] tracking-[0.5em] text-white/25 uppercase">Scroll</p>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: hero ? 1.2 : 1 }}
          className={`text-[10px] tracking-[0.4em] text-white/20 uppercase relative z-10 ${hero ? 'mt-14' : 'mt-12'}`}
        >
          Click to expand · Hover to control
        </motion.p>
      </section>

      <AnimatePresence>
        {expanded && <ExpandedTicket onClose={() => setExpanded(false)} />}
      </AnimatePresence>
    </>
  );
}
