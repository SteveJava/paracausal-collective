'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const navLinks = [
  { label: 'Home',    href: '/' },
  { label: 'Events',  href: '/events' },
  { label: 'Merch',   href: '/merchandise' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About',   href: '/about' },
  { label: 'Contact', href: '/contact' },
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

  // Lock body scroll when mobile menu open
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
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center">

          {/* Wordmark — left, all breakpoints */}
          <a
            href="/"
            className="text-white hover:opacity-70 transition-opacity duration-300 flex-shrink-0"
            style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.12em', fontSize: '1.05rem' }}
          >
            PARACAUSAL
          </a>

          {/* Desktop nav — centred absolutely so it doesn't shift with cart */}
          <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map(link => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[11px] tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side: cart (always) + hamburger (mobile only) */}
          <div className="ml-auto flex items-center gap-4">

            {/* Cart icon */}
            <a
              href="https://paracausal-2.myshopify.com/cart"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cart"
              className="text-white/50 hover:text-white transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setOpen(o => !o)}
              className="flex md:hidden flex-col justify-center gap-[5px] w-8 h-8 group relative"
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
          </div>
        </div>
      </motion.nav>

      {/* Full-screen mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col md:hidden overflow-y-auto"
            style={{ background: '#0a0a0c' }}
          >
            {/* Subtle top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(74,56,150,0.6), transparent)' }} />

            <div className="flex flex-col min-h-full px-8 pt-24 pb-10">

              {/* ── Navigation links ── */}
              <nav className="flex-1">
                <p className="text-[9px] tracking-[0.45em] text-white/25 uppercase mb-6">Explore</p>
                <ul>
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      className="border-b"
                      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                    >
                      <button
                        onClick={() => handleLink(link.href)}
                        className="group flex items-center justify-between w-full py-4 text-left"
                      >
                        <span
                          className="text-[1.6rem] leading-none text-white/75 group-hover:text-white transition-colors duration-200"
                          style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.02em' }}
                        >
                          {link.label}
                        </span>
                        <svg
                          viewBox="0 0 16 16"
                          className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 transition-colors duration-200 flex-shrink-0"
                          fill="none" stroke="currentColor" strokeWidth="1.5"
                        >
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* ── Bottom section ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-10 space-y-8"
              >
                {/* Socials */}
                <div>
                  <p className="text-[9px] tracking-[0.45em] text-white/25 uppercase mb-4">Connect</p>
                  <div className="flex flex-col gap-2.5">
                    {[
                      { label: 'Instagram', href: 'https://instagram.com/paracausal' },
                      { label: 'Facebook',  href: 'https://facebook.com/paracausal' },
                    ].map(({ label, href }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between group"
                      >
                        <span className="text-sm tracking-widest uppercase text-white/50 group-hover:text-white transition-colors duration-200">
                          {label}
                        </span>
                        <svg viewBox="0 0 16 16" className="w-3 h-3 text-white/15 group-hover:text-white/50 transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M3 3h10v10M3 13L13 3" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Location tag */}
                <div className="pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <p className="text-[9px] tracking-[0.4em] text-white/20 uppercase">Cape Town, South Africa · Est. 2022</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
