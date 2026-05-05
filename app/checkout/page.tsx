'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0);

    const injectWidget = () => {
      const script = document.createElement('script');
      script.src = 'https://widget.xceed.me/v2/loader.js';
      script.async = true;
      // After widget initialises (and its forced reflow runs), snap back to top
      script.onload = () => window.scrollTo(0, 0);
      document.body.appendChild(script);
    };

    // Wait for full page load before injecting — prevents widget reflow
    // from fighting the initial render and jumping the scroll position
    if (document.readyState === 'complete') {
      injectWidget();
    } else {
      window.addEventListener('load', injectWidget, { once: true });
    }

    return () => {
      window.removeEventListener('load', injectWidget);
      // Remove script so next visit starts fresh
      const existing = document.querySelector('script[src*="xceed.me/v2/loader"]');
      if (existing) existing.remove();
      const widget = document.getElementById('xceed-widget');
      if (widget) widget.innerHTML = '';
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

        {/* XCEED Widget */}
        <div id="xceed-widget" />

        <p className="mt-10 text-center text-[9px] text-white/10 tracking-widest">
          Payments processed securely by XCEED · All sales final
        </p>
      </div>

    </div>
  );
}
