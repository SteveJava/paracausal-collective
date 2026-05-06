'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const placeholders = [
  { label: 'Tee', hint: 'Crewneck' },
  { label: 'Hoodie', hint: 'Pullover' },
  { label: 'Cap', hint: 'Structured' },
  { label: 'Tote', hint: 'Canvas' },
  { label: 'Long Sleeve', hint: 'Oversize' },
  { label: 'Vinyl', hint: 'Limited Run' },
];

export default function MerchandisePage() {
  const [email, setEmail] = useState('');
  const [notified, setNotified] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    setNotified(true);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#FFFDFA]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(55,31,118,0.08) 0%, transparent 60%)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-24">
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
          className="mb-16 text-center"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: '#4a3896' }}>Store</p>
          <h1
            className="text-white leading-none mb-4"
            style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.05em', fontSize: 'clamp(3rem, 10vw, 7rem)' }}
          >
            Merchandise
          </h1>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 border text-[10px] tracking-widest uppercase"
            style={{ borderColor: 'rgba(74,56,150,0.4)', color: '#9b7fd4', background: 'rgba(74,56,150,0.08)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#7b5fc0' }} />
            Coming Soon
          </div>
        </motion.div>

        {/* Blurred placeholder grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-16"
        >
          {placeholders.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className="relative overflow-hidden aspect-square"
              style={{ border: '1px solid rgba(255,255,255,0.05)' }}
            >
              {/* Blurred placeholder */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, rgba(74,56,150,${0.06 + i * 0.02}) 0%, rgba(2,0,121,0.04) 100%)`,
                }}
              />

              {/* Grid lines decoration */}
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="50" y1="0" x2="50" y2="100" stroke="#4a3896" strokeWidth="0.5" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="#4a3896" strokeWidth="0.5" />
              </svg>

              {/* Lock icon */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white/15" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <div className="text-center">
                  <p className="text-[10px] tracking-widest uppercase text-white/30">{item.label}</p>
                  <p className="text-[9px] text-white/15 tracking-wider mt-0.5">{item.hint}</p>
                </div>
              </div>

              {/* Blur overlay */}
              <div className="absolute inset-0" style={{ backdropFilter: 'blur(2px)' }} />
            </motion.div>
          ))}
        </motion.div>

        {/* Notify form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="max-w-md mx-auto text-center"
        >
          <p className="text-white/40 text-sm mb-6 leading-relaxed">
            Be the first to know when the Paracausal store drops. Limited runs, no restocks.
          </p>

          {notified ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="#9b7fd4" strokeWidth="1.5">
                <polyline points="4 12 9 17 20 6" />
              </svg>
              <p className="text-[10px] tracking-[0.4em] text-[#4a3896] uppercase">You're on the list</p>
            </motion.div>
          ) : (
            <form onSubmit={handleNotify} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 bg-transparent border border-white/10 text-white placeholder-white/25 px-4 py-3 text-xs tracking-wider focus:outline-none focus:border-[rgba(74,56,150,0.7)] transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              />
              <button
                type="submit"
                className="px-6 py-3 text-xs tracking-widest uppercase text-white transition-opacity hover:opacity-80 shrink-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(2,0,121,0.95), rgba(55,31,118,0.8))',
                  clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                }}
              >
                Notify Me
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
