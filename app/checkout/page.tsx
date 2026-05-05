'use client';

import Link from 'next/link';
import Script from 'next/script';

const XCEED_URL = 'https://xceed.me/en/cape-town/event/afterlight/229773/channel/paracausal';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#FFFDFA]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Bg glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(55,31,118,0.10) 0%, transparent 70%)' }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Nav */}
        <div className="flex items-center justify-between mb-10">
          <Link
            href="/"
            className="text-white/40 hover:text-white transition-colors text-xs tracking-widest uppercase"
          >
            ← Back
          </Link>
          <span className="text-[9px] tracking-[0.4em] text-white/30 uppercase">Secure Checkout</span>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.5em] mb-3" style={{ color: '#4a3896' }}>XCEED × Paracausal</p>
          <h1
            className="text-4xl sm:text-6xl text-white leading-none"
            style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.05em' }}
          >
            GET YOUR<br />
            <span className="text-white/20">TICKETS</span>
          </h1>
        </div>

        {/* Divider */}
        <div className="mb-8 h-px" style={{ background: 'linear-gradient(to right, rgba(74,56,150,0.4), transparent)' }} />

        {/* XCEED Widget — auto-activates when running on paracausal.world */}
        <div id="xceed-widget" className="min-h-[200px]" />

        {/* Divider */}
        <div className="mt-10 mb-6 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(74,56,150,0.2), transparent)' }} />

        {/* Always-visible direct link — secondary option */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] tracking-[0.35em] text-white/20 uppercase">
            Prefer to buy directly?
          </p>
          <a
            href={XCEED_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs tracking-widest uppercase text-white/40 hover:text-white/80 transition-colors duration-200"
          >
            Open on XCEED
            <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </div>

        <p className="mt-8 text-center text-[9px] text-white/10 tracking-widest">
          Payments processed securely by XCEED · All sales final
        </p>
      </div>

      {/* Inject brand colors before widget loads */}
      <Script id="xceed-config" strategy="beforeInteractive">
        {`
          window.XCEED_WIDGET_CONFIG = {
            backgroundColor: '#080808',
            primaryTextColor: '#FFFDFA',
            buttonColor: '#371F76',
            buttonTextColor: '#FFFDFA',
            accentColor: '#4a3896',
            tagsColor: '#4a3896'
          };
        `}
      </Script>

      {/* XCEED widget loader */}
      <Script src="https://widget.xceed.me/v2/loader.js" strategy="afterInteractive" />
    </div>
  );
}
