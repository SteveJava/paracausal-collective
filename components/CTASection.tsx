'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1200);
  };

  return (
    <section ref={ref} className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 50%, rgba(123,47,190,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 50% 50%, rgba(57,255,20,0.05) 0%, transparent 60%)
          `,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(2,0,121,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(2,0,121,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 70%)',
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] tracking-[0.5em] uppercase mb-6" style={{ color: '#4a3896' }}>The Movement</p>
          <h2
            className="text-6xl md:text-[100px] text-white leading-none mb-6"
            style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.05em' }}
          >
            JOIN THE
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #020079, #371F76, #4a3896)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'energy-flow 4s ease infinite',
                backgroundSize: '200% 200%',
              }}
            >
              SIGNAL
            </span>
          </h2>

          <p className="text-sm text-white/40 max-w-lg mx-auto mb-12 leading-relaxed">
            First access to events. Artist announcements. Transmissions from the underground. We reach you directly — no algorithms, no noise.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex items-center justify-center gap-3 py-4 border"
              style={{ borderColor: 'rgba(74,56,150,0.4)', color: '#4a3896', background: 'rgba(2,0,121,0.08)' }}
            >
              <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="4 10 8 14 16 6" />
              </svg>
              <span className="text-xs tracking-widest uppercase">Signal received</span>
            </motion.div>
          ) : (
            <>
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@signal.com"
                  className="w-full border border-white/10 text-white placeholder-white/25 px-5 py-4 text-xs tracking-widest focus:outline-none transition-colors duration-300"
                  style={{ background: 'rgba(255,253,250,0.03)', outline: 'none', fontFamily: "'Space Grotesk', sans-serif" }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(2,0,121,0.6)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                  disabled={status === 'loading'}
                />
                <div
                  className="absolute bottom-0 left-0 h-px transition-all duration-500"
                  style={{
                    width: email ? '100%' : '0%',
                    background: 'linear-gradient(to right, #020079, #371F76)',
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-4 text-xs tracking-widest uppercase text-white transition-all duration-300 disabled:opacity-50"
                style={{
                  background: status === 'loading'
                    ? 'rgba(2,0,121,0.4)'
                    : 'linear-gradient(135deg, rgba(2,0,121,0.9), rgba(55,31,118,0.7))',
                  clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                }}
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
                    Sending
                  </span>
                ) : 'Tune In'}
              </button>
            </>
          )}
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-5 text-[10px] text-white/20 tracking-widest"
        >
          No spam. Transmissions only. Unsubscribe at any time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 pt-16 border-t border-white/5 flex justify-center gap-8"
        >
          {[
            { label: 'Events hosted', value: '24+' },
            { label: 'Hours of music', value: '500+' },
            { label: 'Minds altered', value: '∞' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-4xl text-white mb-1"
                style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.05em' }}
              >
                {stat.value}
              </p>
              <p className="text-[9px] tracking-widest text-white/30 uppercase">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
