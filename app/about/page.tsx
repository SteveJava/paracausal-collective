'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const stats = [
  { value: '2022', label: 'Founded' },
  { value: '12+', label: 'Events' },
  { value: '3K+', label: 'Attendees' },
  { value: 'CPT', label: 'Based In' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#FFFDFA]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 30% 20%, rgba(55,31,118,0.10) 0%, transparent 60%)' }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-24">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link href="/" className="text-white/40 hover:text-white transition-colors text-xs tracking-widest uppercase">
            ← Home
          </Link>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: '#4a3896' }}>Who We Are</p>
          <h1
            className="text-white leading-none mb-6"
            style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.05em', fontSize: 'clamp(3rem, 10vw, 7rem)' }}
          >
            About
            <br />
            <span className="text-white/20">Paracausal</span>
          </h1>
          <div className="h-px w-24" style={{ background: 'linear-gradient(to right, #4a3896, transparent)' }} />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px mb-16"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center justify-center py-8 px-4 bg-[#080808]">
              <p
                className="text-3xl sm:text-4xl text-white mb-1"
                style={{ fontFamily: "'Archivo Black', sans-serif" }}
              >
                {value}
              </p>
              <p className="text-[9px] tracking-[0.4em] text-white/30 uppercase">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Body text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid sm:grid-cols-2 gap-12 mb-16"
        >
          <div className="space-y-5 text-white/50 text-sm leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
          <div className="space-y-5 text-white/50 text-sm leading-relaxed">
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
            </p>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
            </p>
            <p>
              Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px mb-12" style={{ background: 'linear-gradient(to right, transparent, rgba(74,56,150,0.3), transparent)' }} />

        {/* Manifesto-style pull quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <p
            className="text-2xl sm:text-4xl text-white/70 leading-snug"
            style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.04em' }}
          >
            "Existing at the edge of perception."
          </p>
          <p className="mt-4 text-[10px] tracking-[0.5em] text-white/25 uppercase">Paracausal Collective · Cape Town</p>
        </motion.blockquote>
      </div>
    </div>
  );
}
