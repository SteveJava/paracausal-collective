'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  useEffect(() => {
    // Set brand colors before the widget reads them
    (window as any).XCEED_WIDGET_CONFIG = {
      backgroundColor: '#080808',
      primaryTextColor: '#FFFDFA',
      buttonColor: '#371F76',
      buttonTextColor: '#FFFDFA',
      accentColor: '#4a3896',
      tagsColor: '#4a3896',
    };

    // Clear any leftover widget content from a previous mount
    const widgetEl = document.getElementById('xceed-widget');
    if (widgetEl) widgetEl.innerHTML = '';

    // Dynamically inject the script so it re-runs on every page mount
    const script = document.createElement('script');
    script.src = 'https://widget.xceed.me/v2/loader.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up on unmount so the next mount starts fresh
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (widgetEl) widgetEl.innerHTML = '';
    };
  }, []);

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

        {/* XCEED Widget mounts here */}
        <div id="xceed-widget" />

        <p className="mt-10 text-center text-[9px] text-white/10 tracking-widest">
          Payments processed securely by XCEED · All sales final
        </p>
      </div>
    </div>
  );
}
