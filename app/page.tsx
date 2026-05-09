import Link from 'next/link';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/HeroCarousel';
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

// ── Merch Preview ──────────────────────────────────────────────────────────

async function MerchPreview() {
  const allProducts = await getProducts(6);
  const products = allProducts.filter(p => p.handle !== 'afterlight-v').slice(0, 3);

  if (products.length === 0) return null;

  return (
    <section className="relative py-28 sm:py-36 px-6 sm:px-8" style={{ background: '#080808' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 50% at 80% 50%, rgba(55,31,118,0.06) 0%, transparent 65%)' }}
      />

      <div className="max-w-6xl mx-auto relative">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase mb-3" style={{ color: '#4a3896' }}>Store</p>
            <h2
              className="text-white leading-none"
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                letterSpacing: '0.05em',
                fontSize: 'clamp(2rem, 6vw, 4rem)',
              }}
            >
              Merchandise
            </h2>
          </div>
          <Link
            href="/merchandise"
            className="text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors flex items-center gap-2 pb-1"
          >
            View All
            <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.map(product => {
            const image   = product.images.edges[0]?.node;
            const variant = product.variants.edges[0]?.node;
            const price   = variant?.price ?? product.priceRange.minVariantPrice;

            return (
              <a
                key={product.id}
                href={`https://paracausal-2.myshopify.com/products/${product.handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden group block"
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="relative aspect-square overflow-hidden bg-[#0d0d0d]">
                  {image ? (
                    <img
                      src={image.url}
                      alt={image.altText ?? product.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(74,56,150,0.08) 0%, rgba(2,0,40,0.05) 100%)' }} />
                  )}
                  <div className="absolute inset-0 border opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ borderColor: 'rgba(74,56,150,0.5)' }} />
                </div>
                <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="text-sm text-white tracking-wide mb-1" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                    {product.title}
                  </p>
                  <p className="text-xs text-white/40 tracking-wider">
                    {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                  </p>
                </div>
              </a>
            );
          })}
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
      <MerchPreview />
      <Footer />
    </main>
  );
}
