import Link from 'next/link';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/HeroCarousel';
import MerchProduct from '@/components/MerchProduct';
import { getProducts } from '@/lib/shopify';

// ── About ──────────────────────────────────────────────────────────────────

function About() {
  return (
    <section className="relative py-28 sm:py-36 px-6 sm:px-8 overflow-hidden" style={{ background: '#050505' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(55,31,118,0.08) 0%, transparent 65%)' }}
      />

      <div className="max-w-6xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — label + quote */}
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase mb-8" style={{ color: '#4a3896' }}>Who We Are</p>
            <blockquote
              className="text-white leading-tight mb-8"
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                letterSpacing: '0.03em',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              }}
            >
              "Existing at the edge of perception."
            </blockquote>
            <div className="h-px w-16 mb-8" style={{ background: 'linear-gradient(to right, #4a3896, transparent)' }} />
            <Link
              href="/about"
              className="text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors flex items-center gap-2"
            >
              Our Story
              <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>

          {/* Right — stats */}
          <div className="grid grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {[
              { value: '2022', label: 'Founded' },
              { value: '12+',  label: 'Events' },
              { value: '3K+',  label: 'Attendees' },
              { value: 'CPT',  label: 'Based In' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center justify-center py-10 px-6 bg-[#050505]">
                <p className="text-3xl sm:text-4xl text-white mb-1" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                  {value}
                </p>
                <p className="text-[9px] tracking-[0.4em] text-white/30 uppercase">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default async function Home() {
  const allProducts = await getProducts(6);
  const merchProduct = allProducts.find(p => p.handle !== 'afterlight-v') ?? null;

  return (
    <main>
      <HeroCarousel merchProduct={merchProduct} />
      <About />
      <MerchProduct productId="15105243349360" />
      <MerchProduct productId="15105738408304" />
      <Footer />
    </main>
  );
}
