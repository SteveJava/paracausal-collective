'use client';

import Link from 'next/link';
import Script from 'next/script';

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

        {/* XCEED Widget — renders automatically when live on paracausal.world */}
        <div id="xceed-widget" />

        {/* Fallback CTA — shown while domain isn't yet paracausal.world */}
        <noscript>
          <a href="https://xceed.me/en/cape-town/event/afterlight/229773/channel/paracausal" target="_blank" rel="noopener noreferrer">
            Buy Tickets on XCEED
          </a>
        </noscript>

        {/* Direct link fallback shown until widget loads */}
        <div id="xceed-fallback" className="py-16 flex flex-col items-center gap-6 text-center">
          <p className="text-[10px] tracking-[0.4em] text-white/30 uppercase">Tickets available via</p>
          <a
            href="https://xceed.me/en/cape-town/event/afterlight/229773/channel/paracausal"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 text-sm tracking-widest uppercase text-white transition-opacity hover:opacity-80 flex items-center gap-3"
            style={{
              background: 'linear-gradient(135deg, rgba(2,0,121,0.95), rgba(55,31,118,0.8))',
              clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
            }}
          >
            Buy on XCEED
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
          <p className="text-[9px] text-white/20 tracking-widest">
            Secure checkout · Payments handled by XCEED
          </p>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-[9px] text-white/15 tracking-widest">
          Payments processed securely by XCEED · All sales final
        </p>
      </div>

      {/* Inject brand colors before the widget loads */}
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

      {/* XCEED widget loader — hides fallback when widget mounts successfully */}
      <Script
        src="https://widget.xceed.me/v2/loader.js"
        strategy="afterInteractive"
        onLoad={() => {
          // If XCEED widget actually populated the div, hide the fallback
          setTimeout(() => {
            const widget = document.getElementById('xceed-widget');
            const fallback = document.getElementById('xceed-fallback');
            if (widget && widget.children.length > 0 && fallback) {
              fallback.style.display = 'none';
            }
          }, 2000);
        }}
      />
    </div>
  );
}
