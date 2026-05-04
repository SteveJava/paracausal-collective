'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';

function CartIcon() {
  const { cartCount, justAdded } = useCart();

  return (
    <Link
      href="/checkout"
      className="relative flex items-center gap-2 group"
      aria-label={`Cart (${cartCount} items)`}
    >
      <motion.div
        animate={justAdded ? { scale: [1, 1.25, 1] } : { scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 transition-colors duration-300"
          style={{ color: justAdded ? '#4a3896' : 'rgba(255,255,255,0.55)' }}
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>

        <AnimatePresence>
          {cartCount > 0 && (
            <motion.span
              key="badge"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className="absolute -top-2 -right-2 flex items-center justify-center rounded-full text-white text-[9px] font-bold leading-none"
              style={{
                width: '16px',
                height: '16px',
                background: justAdded
                  ? 'linear-gradient(135deg, #020079, #371F76)'
                  : 'linear-gradient(135deg, #371F76, #4a3896)',
                boxShadow: justAdded ? '0 0 10px rgba(55,31,118,0.8)' : '0 0 6px rgba(55,31,118,0.4)',
                fontFamily: "'Archivo Black', sans-serif",
              }}
            >
              {cartCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {justAdded && (
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.3 }}
            className="text-[9px] tracking-widest uppercase hidden sm:block"
            style={{ color: '#4a3896', fontFamily: "'Archivo Black', sans-serif" }}
          >
            Added
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(3,3,5,0.92)] backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#" className="relative group">
          <span
            className="font-display text-xl tracking-widest text-white"
            style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.2em' }}
          >
            PARACAUSAL
          </span>
          <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-[#020079] to-[#371F76] transition-all duration-300 group-hover:w-full" />
        </a>

        <CartIcon />
      </div>
    </motion.nav>
  );
}
