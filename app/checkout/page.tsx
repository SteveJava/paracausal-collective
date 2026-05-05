'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready'>('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadWidget = () => {
    if (status !== 'idle') return;
    setStatus('loading');

    const script = document.createElement('script');
    script.src = 'https://widget.xceed.me/v2/loader.js';
    script.async = true;
    script.onload = () => {
      setStatus('ready');
      window.scrollTo(0, 0);
    };
    document.body.appendChild(script);
  };

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
          <Link href="/" className="text-white/40 hover:text-white transition-colors text-xs tracking-widest uppercase">
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

        {/* Idle — prompt user to load */}
        {status === 'idle' && (
          <div
            className="flex flex-col items-center justify-center gap-6 py-20 border border-dashed"
            style={{ borderColor: 'rgba(74,56,150,0.25)' }}
          >
            <p className="text-[10px] tracking-[0.5em] text-white/25 uppercase">Afterlight · Volume V</p>
            <button
              onClick={loadWidget}
              className="px-10 py-4 text-sm tracking-widest uppercase text-white transition-opacity hover:opacity-80 flex items-center gap-3"
              style={{
                background: 'linear-gradient(135deg, rgba(2,0,121,0.95), rgba(55,31,118,0.8))',
                clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
              }}
            >
              View Tickets
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>
            <p className="text-[9px] text-white/20 tracking-widest">Powered by XCEED · Secure checkout</p>
          </div>
        )}

        {/* Loading spinner */}
        {status === 'loading' && (
          <div className="flex flex-col items-center justify-center gap-4 py-24">
            <div
              className="w-8 h-8 rounded-full border-2 animate-spin"
              style={{ borderColor: 'rgba(74,56,150,0.2)', borderTopColor: '#4a3896' }}
            />
            <p className="text-[10px] tracking-[0.4em] text-white/30 uppercase">Loading tickets</p>
          </div>
        )}

        {/* XCEED Widget renders here once ready */}
        <div id="xceed-widget" className={status === 'ready' ? '' : 'hidden'} />

        <p className="mt-10 text-center text-[9px] text-white/10 tracking-widest">
          Payments processed securely by XCEED · All sales final
        </p>
      </div>
    </div>
  );
}
