'use client';

const socials = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'SoundCloud',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M11.576 8.719c-.187 0-.37.04-.538.118V18.4h8.532c1.59 0 2.88-1.29 2.88-2.88s-1.29-2.88-2.88-2.88c-.16 0-.315.014-.466.041-.177-2.455-2.21-4.39-4.694-4.39-.278 0-.555.028-.834.078zM3.52 12.434c-.293 0-.546.126-.73.324v5.646h6.016v-5.646a1.007 1.007 0 00-1.007-1.007c-.554 0-1.007.453-1.007 1.007 0-.554-.453-1.007-1.007-1.007-.557 0-1.007.453-1.007 1.007 0-.554-.45-1.007-1.008-1.007zM1.487 13.04c-.174 0-.338.048-.48.13v5.234h1.984v-4.41a1.008 1.008 0 00-1.008-1.007z" />
      </svg>
    ),
  },
  {
    name: 'ResidentAdvisor',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.45 14.5H8.5v-9h3.5c2.2 0 3.5 1.1 3.5 2.8 0 1.1-.6 2-1.5 2.4l2 3.8h-2.1l-1.8-3.4h-1v3.4zm0-5h1c.9 0 1.5-.5 1.5-1.4S12.4 8.9 11.5 8.9h-1v2.6z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(55,31,118,0.06) 0%, transparent 60%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8 mb-10 sm:mb-14">
          {/* Brand */}
          <div className="max-w-xs">
            <p
              className="text-2xl text-white mb-3"
              style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.15em' }}
            >
              PARACAUSAL
            </p>
            <p className="text-xs text-white/30 leading-relaxed">
              Underground electronic music experiences. Cape Town, South Africa. Existing at the edge of perception.
            </p>
          </div>

          {/* Socials + contact */}
          <div>
            <p className="text-[9px] tracking-[0.4em] text-white/30 uppercase mb-4">Find Us</p>
            <div className="flex gap-3 mb-5">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all duration-300"
                  style={{ clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)' }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <a
              href="mailto:bookings@paracausal.co.za"
              className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200 tracking-wider"
            >
              bookings@paracausal.co.za
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-white/20 tracking-widest">
            © 2025 Paracausal Collective · Cape Town
          </p>
          <p className="text-[10px] text-white/10 tracking-widest">
            All experiences are at your own risk.
          </p>
        </div>
      </div>
    </footer>
  );
}
