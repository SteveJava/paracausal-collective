'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const TOTAL_FRAMES = 100;
const frameSrc = (i: number) => `/shirt-frames/frame_${String(i).padStart(4, '0')}.jpg`;

const ANNOTATIONS = [
  {
    at: 0.18, end: 0.36,
    label: 'HEAVYWEIGHT COTTON',
    desc: '380gsm stonewashed cotton. Builds character with every wash.',
    stat: '380gsm',
    side: 'left' as const,
  },
  {
    at: 0.46, end: 0.63,
    label: 'DROPPED SHOULDER',
    desc: 'Oversized structured silhouette. One size fits the collective.',
    stat: 'OS cut',
    side: 'right' as const,
  },
  {
    at: 0.72, end: 0.88,
    label: 'ACID TREATED',
    desc: 'Each piece is hand-treated. No two are identical.',
    stat: 'Unique',
    side: 'left' as const,
  },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ShirtDisplay() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const frameIdxRef = useRef(0);
  const rafRef = useRef<number>(0);

  const [loadPct, setLoadPct] = useState(0);
  const [scrollProg, setScrollProg] = useState(0);
  const [inView, setInView] = useState(false);
  const [activeAnn, setActiveAnn] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [size, setSize] = useState('M');
  const [cartState, setCartState] = useState<'idle' | 'added'>('idle');

  const router = useRouter();

  // Ref callback — resizes canvas the moment it mounts into the DOM
  const setCanvasRef = useCallback((el: HTMLCanvasElement | null) => {
    (canvasRef as React.MutableRefObject<HTMLCanvasElement | null>).current = el;
    if (el) {
      const dpr = window.devicePixelRatio || 1;
      el.width = window.innerWidth * dpr;
      el.height = window.innerHeight * dpr;
      el.style.width = window.innerWidth + 'px';
      el.style.height = window.innerHeight + 'px';
      // Draw current frame immediately
      const img = framesRef.current[frameIdxRef.current];
      if (img?.complete) {
        const ctx = el.getContext('2d');
        if (ctx) {
          const W = el.width / dpr;
          const H = el.height / dpr;
          ctx.fillStyle = '#080808';
          ctx.fillRect(0, 0, el.width, el.height);
          const scale = Math.min((W * 0.62) / img.naturalWidth, (H * 0.78) / img.naturalHeight);
          const iw = img.naturalWidth * scale;
          const ih = img.naturalHeight * scale;
          ctx.save();
          ctx.scale(dpr, dpr);
          ctx.drawImage(img, (W - iw) / 2, (H - ih) / 2, iw, ih);
          ctx.restore();
        }
      }
    }
  }, []);

  // Preload all frames
  useEffect(() => {
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameSrc(i + 1);
      img.onload = () => {
        loaded++;
        setLoadPct(Math.round((loaded / TOTAL_FRAMES) * 100));
      };
      imgs[i] = img;
    }
    framesRef.current = imgs;
  }, []);

  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[idx];
    if (!canvas || !img?.complete) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    // Fill bg first so no transparency
    ctx.fillStyle = '#080808';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const scale = Math.min((W * 0.62) / img.naturalWidth, (H * 0.78) / img.naturalHeight);
    const iw = img.naturalWidth * scale;
    const ih = img.naturalHeight * scale;
    const ix = (W - iw) / 2;
    const iy = (H - ih) / 2;
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.drawImage(img, ix, iy, iw, ih);
    ctx.restore();
  }, []);

  // Size canvas to viewport
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    drawFrame(frameIdxRef.current);
  }, [drawFrame]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  // Scroll handler — uses position: fixed viewport shown/hidden based on section bounds
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollH = section.offsetHeight - window.innerHeight;
      const prog = Math.max(0, Math.min(1, -rect.top / scrollH));

      // Section is in view when its top is above viewport bottom and bottom is below viewport top
      const visible = rect.top < window.innerHeight && rect.bottom > 0 && rect.top < 0;
      setInView(visible);
      setScrollProg(prog);

      let ann: number | null = null;
      ANNOTATIONS.forEach((a, i) => {
        if (prog >= a.at && prog <= a.end) ann = i;
      });
      setActiveAnn(ann);

      const newIdx = Math.min(TOTAL_FRAMES - 1, Math.floor(prog * TOTAL_FRAMES));
      if (newIdx !== frameIdxRef.current) {
        frameIdxRef.current = newIdx;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(newIdx));
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // init
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame]);

  const handleAddToCart = () => {
    setCartState('added');
    setTimeout(() => router.push('/checkout?item=shirt&size=' + size + '&tier=GA'), 1200);
  };

  return (
    <>
      {/* ─── Scroll spacer section ─── */}
      <section
        ref={sectionRef}
        style={{ height: '500vh', position: 'relative', background: 'transparent' }}
      >
        {/* Top anchor header — fades as user scrolls into section */}
        <motion.div
          animate={{ opacity: scrollProg > 0.04 ? 0 : 1, y: scrollProg > 0.04 ? -16 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', top: '8vh', left: 0, right: 0,
            textAlign: 'center', zIndex: 5, pointerEvents: 'none',
          }}
        >
          <p style={{ fontSize: '10px', letterSpacing: '0.5em', color: '#4a3896', marginBottom: '1rem', textTransform: 'uppercase' }}>
            Paracausal Merch
          </p>
          <h2
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 'clamp(2.5rem, 9vw, 6.5rem)',
              color: '#FFFDFA', letterSpacing: '0.05em', lineHeight: 1, marginBottom: '1.5rem',
            }}
          >
            WEAR THE
            <br />
            <span style={{ background: 'linear-gradient(90deg, #020079, #371F76, #4a3896)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              SIGNAL
            </span>
          </h2>
          <p style={{ color: 'rgba(255,253,250,0.3)', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
            Scroll to explore
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, rgba(55,31,118,0.8), transparent)' }}
            />
          </div>
        </motion.div>
      </section>

      {/* ─── Fixed viewport — shown when section is scrolling through ─── */}
      <AnimatePresence>
        {inView && (
          <motion.div
            ref={viewportRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 50,
              background: '#080808', overflow: 'hidden',
            }}
          >
            {/* Subtle tint */}
            <div
              style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(55,31,118,0.07) 0%, transparent 70%)',
              }}
            />

            {/* Canvas */}
            <canvas
              ref={setCanvasRef}
              style={{ position: 'relative', zIndex: 2, display: 'block', cursor: scrollProg > 0.9 ? 'pointer' : 'default' }}
              onClick={() => { if (scrollProg > 0.9) setExpanded(true); }}
            />

            {/* Scroll progress bar */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.04)', zIndex: 10 }}>
              <div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #020079, #371F76, #4a3896)',
                  width: `${scrollProg * 100}%`,
                  transition: 'width 0.08s linear',
                  boxShadow: '0 0 10px rgba(55,31,118,0.8)',
                }}
              />
            </div>

            {/* Loading overlay */}
            {loadPct < 100 && (
              <div
                style={{
                  position: 'absolute', inset: 0, background: '#080808', zIndex: 20,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem',
                }}
              >
                <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 'clamp(1.5rem, 5vw, 3rem)', color: '#FFFDFA', letterSpacing: '0.1em' }}>
                  PARACAUSAL
                </p>
                <div style={{ width: '220px' }}>
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '0.75rem' }}>
                    <div
                      style={{
                        height: '100%', background: 'linear-gradient(90deg, #020079, #371F76)',
                        width: `${loadPct}%`, transition: 'width 0.3s',
                        boxShadow: '0 0 8px rgba(55,31,118,0.8)',
                      }}
                    />
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '9px', letterSpacing: '0.45em', textAlign: 'center' }}>
                    LOADING {loadPct}%
                  </p>
                </div>
              </div>
            )}

            {/* Annotation cards */}
            <AnimatePresence>
              {activeAnn !== null && (() => {
                const ann = ANNOTATIONS[activeAnn];
                return (
                  <motion.div
                    key={activeAnn}
                    initial={{ opacity: 0, x: ann.side === 'left' ? -28 : 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: ann.side === 'left' ? -28 : 28 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: 'absolute', top: '50%', transform: 'translateY(-50%)',
                      [ann.side]: 'clamp(1rem, 5%, 4rem)', zIndex: 10,
                      maxWidth: '200px', padding: '1.25rem 1.5rem',
                      background: 'rgba(8,8,8,0.8)', backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(55,31,118,0.5)',
                    }}
                  >
                    <p style={{ color: '#371F76', fontSize: '9px', letterSpacing: '0.35em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                      {String(activeAnn + 1).padStart(2, '0')} —
                    </p>
                    <p style={{ color: '#FFFDFA', fontSize: '12px', fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.08em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                      {ann.label}
                    </p>
                    <p style={{ color: 'rgba(255,253,250,0.4)', fontSize: '11px', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                      {ann.desc}
                    </p>
                    <p style={{ color: '#4a3896', fontSize: '22px', fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.05em' }}>
                      {ann.stat}
                    </p>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

            {/* Shop CTA — at end of scroll */}
            <AnimatePresence>
              {scrollProg > 0.91 && activeAnn === null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute', bottom: '3.5rem', left: '50%', transform: 'translateX(-50%)',
                    zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
                  }}
                >
                  <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
                    Limited run · R 650
                  </p>
                  <button
                    onClick={() => setExpanded(true)}
                    style={{
                      padding: '1rem 3rem',
                      background: 'linear-gradient(135deg, rgba(2,0,121,0.9), rgba(55,31,118,0.7))',
                      border: '1px solid rgba(55,31,118,0.6)', color: '#FFFDFA',
                      fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase',
                      fontFamily: "'Archivo Black', sans-serif", cursor: 'pointer',
                      clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                      boxShadow: '0 0 40px rgba(55,31,118,0.35)', transition: 'all 0.3s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 60px rgba(55,31,118,0.6)')}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 40px rgba(55,31,118,0.35)')}
                  >
                    Shop Now
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Expanded modal ─── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
              background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
            onClick={(e) => { if (e.target === e.currentTarget) { setExpanded(false); setCartState('idle'); } }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: '#0b0b0e', border: '1px solid rgba(55,31,118,0.4)',
                maxWidth: '560px', width: '100%', padding: '2.5rem',
                position: 'relative', maxHeight: '92vh', overflowY: 'auto',
              }}
            >
              <button
                onClick={() => { setExpanded(false); setCartState('idle'); }}
                style={{
                  position: 'absolute', top: '1.25rem', right: '1.25rem',
                  background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)',
                  fontSize: '1.1rem', cursor: 'pointer', lineHeight: 1, padding: '0.25rem',
                }}
              >✕</button>

              <p style={{ fontSize: '9px', letterSpacing: '0.45em', color: '#4a3896', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Paracausal Merch
              </p>
              <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', color: '#FFFDFA', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                AFTERLIGHT TEE
              </h3>
              <p style={{ color: 'rgba(255,253,250,0.35)', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '2rem' }}>
                Limited edition · 380gsm stonewash · Hand-treated
              </p>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '2rem' }}>
                <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '2.25rem', color: '#FFFDFA' }}>R 650</span>
                <span style={{ fontSize: '9px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>Incl. VAT</span>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <p style={{ fontSize: '9px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  Select Size
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      style={{
                        width: '52px', height: '52px',
                        background: size === s ? 'linear-gradient(135deg, rgba(2,0,121,0.8), rgba(55,31,118,0.6))' : 'transparent',
                        border: `1px solid ${size === s ? 'rgba(55,31,118,0.8)' : 'rgba(255,255,255,0.1)'}`,
                        color: size === s ? '#FFFDFA' : 'rgba(255,255,255,0.35)',
                        fontSize: '11px', cursor: 'pointer', transition: 'all 0.2s',
                        fontFamily: "'Archivo Black', sans-serif",
                        boxShadow: size === s ? '0 0 18px rgba(55,31,118,0.5)' : 'none',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '2rem', padding: '1.25rem', background: 'rgba(55,31,118,0.05)', border: '1px solid rgba(55,31,118,0.18)' }}>
                {[
                  ['Material', '380gsm stonewashed cotton'],
                  ['Fit', 'Oversized dropped shoulder'],
                  ['Treatment', 'Hand acid-washed — unique per piece'],
                  ['Print', 'Screen printed in Cape Town'],
                  ['Edition', 'Afterlight limited run — no restock'],
                ].map(([k, v], idx, arr) => (
                  <div
                    key={k}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                      padding: '0.55rem 0',
                      borderBottom: idx < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    }}
                  >
                    <span style={{ fontSize: '9px', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', flexShrink: 0 }}>{k}</span>
                    <span style={{ fontSize: '11px', color: 'rgba(255,253,250,0.65)', textAlign: 'right', maxWidth: '60%', lineHeight: 1.4 }}>{v}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleAddToCart}
                disabled={cartState === 'added'}
                style={{
                  width: '100%', padding: '1.25rem',
                  background: cartState === 'added' ? 'rgba(2,0,121,0.3)' : 'linear-gradient(135deg, rgba(2,0,121,0.9), rgba(55,31,118,0.7))',
                  border: '1px solid rgba(55,31,118,0.6)', color: '#FFFDFA',
                  fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase',
                  fontFamily: "'Archivo Black', sans-serif",
                  cursor: cartState === 'added' ? 'default' : 'pointer',
                  clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                  transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                  boxShadow: cartState === 'added' ? 'none' : '0 0 30px rgba(55,31,118,0.3)',
                }}
              >
                {cartState === 'added' ? (
                  <>
                    <svg viewBox="0 0 20 20" style={{ width: '14px', height: '14px', flexShrink: 0 }} fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="4 10 8 14 16 6" />
                    </svg>
                    Heading to checkout…
                  </>
                ) : `Add to Cart — R 650`}
              </button>

              <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase' }}>
                Free delivery on orders over R 800
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
