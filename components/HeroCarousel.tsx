'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ShopifyProduct } from '@/lib/shopify';

interface Props {
  merchProduct: ShopifyProduct | null;
}

export default function HeroCarousel({ merchProduct }: Props) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const slides = [
    { id: 'event' },
    { id: 'merch' },
  ];

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), [slides.length]);

  // Auto-advance every 6s
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, 6000);
    return () => clearTimeout(t);
  }, [current, paused, next]);

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        {current === 0 ? (
          <EventSlide key="event" />
        ) : (
          <MerchSlide key="merch" product={merchProduct} />
        )}
      </AnimatePresence>

      {/* Dot navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="transition-all duration-300"
            style={{
              width: i === current ? 24 : 6,
              height: 6,
              borderRadius: 3,
              background: i === current ? '#9b7fd4' : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>

      {/* Arrow controls */}
      <button
        onClick={() => setCurrent(c => (c - 1 + slides.length) % slides.length)}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/15 text-white/40 hover:text-white hover:border-white/40 transition-all duration-200"
        style={{ background: 'rgba(0,0,0,0.4)', clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)' }}
        aria-label="Previous slide"
      >
        <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 4L6 8l4 4" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/15 text-white/40 hover:text-white hover:border-white/40 transition-all duration-200"
        style={{ background: 'rgba(0,0,0,0.4)', clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)' }}
        aria-label="Next slide"
      >
        <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 4l4 4-4 4" />
        </svg>
      </button>
    </section>
  );
}

// ── Slide 1: Afterlight V ──────────────────────────────────────────────────

function EventSlide() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 flex flex-col justify-end"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 60% 30%, rgba(74,56,150,0.35) 0%, rgba(20,0,60,0.5) 40%, rgba(3,3,5,1) 100%)',
        }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px',
        }}
      />

      {/* Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" preserveAspectRatio="none">
        <defs>
          <pattern id="cg" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cg)" />
      </svg>

      {/* Bottom fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(3,3,5,1) 0%, rgba(3,3,5,0.5) 35%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 sm:px-8 pb-20 sm:pb-24">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#9b7fd4' }} />
          <span className="text-[9px] tracking-[0.5em] uppercase" style={{ color: '#9b7fd4' }}>Next Event</span>
        </div>

        <h1
          className="text-white leading-none mb-4"
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            letterSpacing: '0.03em',
            fontSize: 'clamp(3.5rem, 14vw, 11rem)',
          }}
        >
          Afterlight
          <br />
          <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent' }}>V</span>
        </h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 mb-10">
          <span className="text-white/60 text-sm tracking-widest">31 July 2026</span>
          <span className="hidden sm:block w-px h-4 bg-white/20" />
          <span className="text-white/35 text-sm tracking-widest">Cape Town, South Africa</span>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/checkout"
            className="inline-flex items-center gap-3 px-8 py-4 text-xs tracking-widest uppercase text-white transition-opacity hover:opacity-80"
            style={{
              background: 'linear-gradient(135deg, rgba(2,0,121,0.95), rgba(74,56,150,0.85))',
              clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
              border: '1px solid rgba(74,56,150,0.4)',
            }}
          >
            Get Tickets
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center gap-3 px-8 py-4 text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors"
            style={{
              border: '1px solid rgba(255,255,255,0.1)',
              clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
            }}
          >
            All Events
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 right-8 flex items-center gap-2 opacity-30 z-10">
        <span className="text-[8px] tracking-[0.4em] uppercase text-white">Scroll</span>
        <svg viewBox="0 0 16 24" className="w-3 h-4" fill="none" stroke="white" strokeWidth="1.5">
          <rect x="1" y="1" width="14" height="22" rx="7" />
          <circle cx="8" cy="7" r="2" fill="white" />
        </svg>
      </div>
    </motion.div>
  );
}

// ── Slide 2: Merch ─────────────────────────────────────────────────────────

function MerchSlide({ product }: { product: ShopifyProduct | null }) {
  const image   = product?.images.edges[0]?.node;
  const variant = product?.variants.edges[0]?.node;
  const price   = variant?.price ?? product?.priceRange.minVariantPrice;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 flex flex-col justify-end"
      style={{ background: '#080808' }}
    >
      {/* Product image as background */}
      {image && (
        <img
          src={image.url}
          alt={image.altText ?? 'Merchandise'}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.35 }}
        />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(3,3,5,0.98) 0%, rgba(3,3,5,0.6) 45%, rgba(3,3,5,0.2) 100%)' }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 sm:px-8 pb-20 sm:pb-24">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#9b7fd4' }} />
          <span className="text-[9px] tracking-[0.5em] uppercase" style={{ color: '#9b7fd4' }}>Store</span>
        </div>

        <h2
          className="text-white leading-none mb-4"
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            letterSpacing: '0.03em',
            fontSize: 'clamp(3rem, 12vw, 9rem)',
          }}
        >
          {product?.title ?? 'Merchandise'}
          <br />
          <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent' }}>
            {price ? `${price.currencyCode} ${parseFloat(price.amount).toFixed(2)}` : ''}
          </span>
        </h2>

        <div className="flex flex-wrap gap-3 mt-10">
          <Link
            href="/merchandise"
            className="inline-flex items-center gap-3 px-8 py-4 text-xs tracking-widest uppercase text-white transition-opacity hover:opacity-80"
            style={{
              background: 'linear-gradient(135deg, rgba(2,0,121,0.95), rgba(74,56,150,0.85))',
              clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
              border: '1px solid rgba(74,56,150,0.4)',
            }}
          >
            Shop Now
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
          <Link
            href="/merchandise"
            className="inline-flex items-center gap-3 px-8 py-4 text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors"
            style={{
              border: '1px solid rgba(255,255,255,0.1)',
              clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
            }}
          >
            All Merch
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
