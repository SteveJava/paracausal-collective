'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const navLinks = [
  { label: 'About',       href: '/about' },
  { label: 'Events',      href: '/events' },
  { label: 'Merchandise', href: '/merchandise' },
  { label: 'Gallery',     href: '/gallery' },
  { label: 'Contact',     href: '/contact' },
];

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleLink = (href: string) => {
    setOpen(false);
    setTimeout(() => router.push(href), 150);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled || open
            ? 'bg-[rgba(3,3,5,0.95)] backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Hamburger — left */}
          <button
            onClick={() => setOpen(o => !o)}
            className="flex flex-col justify-center gap-[5px] w-8 h-8 group z-60 relative"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block h-px w-6 bg-white origin-center"
            />
            <motion.span
              animate={open ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="block h-px w-6 bg-white"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block h-px w-6 bg-white origin-center"
            />
          </button>

          {/* Logo — right */}
          <a href="/" className="relative group flex items-center">
            <Image
              src="/logo.png"
              alt="Paracausal"
              width={140}
              height={24}
              className="object-contain transition-opacity duration-300 group-hover:opacity-70"
              priority
            />
          </a>
        </div>
      </motion.nav>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center px-8 sm:px-16"
            style={{ background: 'rgba(3,3,5,0.97)', backdropFilter: 'blur(24px)' }}
            onClick={() => setOpen(false)}
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(55,31,118,0.12) 0%, transparent 70%)' }}
            />

            <nav className="relative" onClick={e => e.stopPropagation()}>
              <p className="text-[9px] tracking-[0.5em] text-white/25 uppercase mb-8">Navigation</p>

              <ul className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      onClick={() => handleLink(link.href)}
                      className="group flex items-center gap-4 py-3 w-full text-left"
                    >
                      <span
                        className="text-[10px] tracking-widest text-white/20 w-5 text-right group-hover:text-white/40 transition-colors"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="text-4xl sm:text-6xl text-white/80 group-hover:text-white transition-colors duration-200 leading-none"
                        style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.03em' }}
                      >
                        {link.label}
                      </span>
                      <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg viewBox="0 0 16 16" className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </span>
                    </button>
                    <div className="h-px ml-9" style={{ background: 'rgba(255,255,255,0.05)' }} />
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-12 ml-9"
              >
                <p className="text-[9px] tracking-[0.4em] text-white/20 uppercase">Cape Town, South Africa</p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
