'use client';

import Link from 'next/link';

const socials = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/paracausal',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/paracausal',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

const navLinks = [
  { label: 'Home',        href: '/' },
  { label: 'Tickets',     href: '/events' },
  { label: 'Merchandise', href: '/merchandise' },
  { label: 'Gallery',     href: '/gallery' },
  { label: 'Contact',     href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(55,31,118,0.06) 0%, transparent 60%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-10 sm:mb-14">

          {/* Brand */}
          <div className="sm:col-span-1">
            <p
              className="text-2xl text-white mb-3"
              style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.15em' }}
            >
              PARACAUSAL
            </p>
            <p className="text-xs text-white/30 leading-relaxed mb-6">
              Underground electronic music experiences. Cape Town, South Africa. Existing at the edge of perception.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all duration-300"
                  style={{ clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)' }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="sm:col-span-1">
            <p className="text-[9px] tracking-[0.4em] text-white/30 uppercase mb-5">Navigation</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-white/20 tracking-widest">
            © 2026 Paracausal Collective · Cape Town
          </p>
          <p className="text-[10px] text-white/10 tracking-widest">
            All experiences are at your own risk.
          </p>
        </div>
      </div>
    </footer>
  );
}
