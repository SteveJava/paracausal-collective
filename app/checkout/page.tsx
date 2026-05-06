'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';

export default function CheckoutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-[#FFFDFA]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(55,31,118,0.10) 0%, transparent 70%)' }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="text-white/40 hover:text-white transition-colors text-xs tracking-widest uppercase">
            ← Back
          </Link>
          <span className="text-[9px] tracking-[0.4em] text-white/30 uppercase">Secure Checkout</span>
        </div>

        <div className="mb-8">
          <p className="text-[10px] tracking-[0.5em] mb-3" style={{ color: '#4a3896' }}>XCEED × Paracausal</p>
          <h1
            className="text-4xl sm:text-6xl text-white leading-none"
            style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.05em' }}
          >
            AFTERLIGHT V<br />
            <span className="text-white/20">31 JULY 2026</span>
          </h1>
        </div>

        <div className="mb-8 h-px" style={{ background: 'linear-gradient(to right, rgba(74,56,150,0.4), transparent)' }} />

        <div id="xceed-widget" />

        <p className="mt-10 text-center text-[9px] text-white/10 tracking-widest">
          Payments processed securely by XCEED · All sales final
        </p>
      </div>

      <Script src="https://widget.xceed.me/v2/loader.js" strategy="afterInteractive" />
    </div>
  );
}
