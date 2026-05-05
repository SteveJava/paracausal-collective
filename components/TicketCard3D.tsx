'use client';

import { useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRouter } from 'next/navigation';

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

export default function TicketCard3D({ hero = false }: { hero?: boolean }) {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: hero ? '0px' : '-100px' });

  const angleRef = useRef(0);
  const lastTsRef = useRef(0);
  const hoveredRef = useRef(false);
  const mouseTiltRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const animate = (ts: number) => {
      if (lastTsRef.current) {
        const delta = ts - lastTsRef.current;
        if (!hoveredRef.current) {
          angleRef.current -= (delta / 10000) * 360;
        }
      }
      lastTsRef.current = ts;

      if (innerRef.current) {
        if (hoveredRef.current) {
          innerRef.current.style.transform = `rotateX(${mouseTiltRef.current.x}deg) rotateY(${mouseTiltRef.current.y}deg)`;
        } else {
          innerRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
        }
      }

      if (shadowRef.current) {
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
    const r = e.currentTarget.getBoundingClientRect();
    mouseTiltRef.current = {
      x: ((e.clientY - r.top) / r.height - 0.5) * -22,
      y: ((e.clientX - r.left) / r.width - 0.5) * 28,
    };
  }, []);

  const onMouseEnter = useCallback(() => { hoveredRef.current = true; }, []);
  const onMouseLeave = useCallback(() => {
    hoveredRef.current = false;
    mouseTiltRef.current = { x: 0, y: 0 };
  }, []);

  return (
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
            cursor: 'pointer',
          }}
          onClick={() => router.push('/checkout')}
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
        Click to buy tickets · Hover to control
      </motion.p>
    </section>
  );
}
