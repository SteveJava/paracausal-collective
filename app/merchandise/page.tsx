import Link from 'next/link';
import { getProducts, ShopifyProduct } from '@/lib/shopify';

// ── Product card (server-rendered) ─────────────────────────────────────────

function ProductCard({ product }: { product: ShopifyProduct }) {
  const image   = product.images.edges[0]?.node;
  const variant = product.variants.edges[0]?.node;
  const price   = variant?.price ?? product.priceRange.minVariantPrice;
  const sold    = variant && !variant.availableForSale;

  return (
    <div
      className="relative overflow-hidden group"
      style={{ border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#0d0d0d]">
        {image ? (
          <img
            src={image.url}
            alt={image.altText ?? product.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(74,56,150,0.08) 0%, rgba(2,0,40,0.05) 100%)' }}
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-white/10" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}

        {/* Hover overlay with CTA */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
          style={{ background: 'linear-gradient(to top, rgba(3,3,5,0.85) 0%, transparent 60%)' }}
        >
          {!sold && (
            <a
              href={`https://${process.env.SHOPIFY_STORE_DOMAIN}/products/${product.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 text-xs tracking-widest uppercase text-white text-center transition-opacity hover:opacity-80"
              style={{
                background: 'linear-gradient(135deg, rgba(2,0,121,0.95), rgba(74,56,150,0.85))',
                clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
              }}
            >
              Shop Now
            </a>
          )}
        </div>

        {/* Sold out badge */}
        {sold && (
          <div
            className="absolute top-3 left-3 px-2.5 py-1 text-[8px] tracking-widest uppercase"
            style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
          >
            Sold Out
          </div>
        )}

        {/* Border glow */}
        <div
          className="absolute inset-0 border opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ borderColor: 'rgba(74,56,150,0.5)' }}
        />
      </div>

      {/* Info */}
      <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p
          className="text-sm text-white tracking-wide mb-1 leading-snug"
          style={{ fontFamily: "'Archivo Black', sans-serif" }}
        >
          {product.title}
        </p>
        <p className="text-xs text-white/40 tracking-wider">
          {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

// ── Coming soon fallback ────────────────────────────────────────────────────

function ComingSoon() {
  return (
    <div className="text-center py-24">
      <div
        className="inline-flex items-center gap-2 px-4 py-2 border text-[10px] tracking-widest uppercase mb-6"
        style={{ borderColor: 'rgba(74,56,150,0.4)', color: '#9b7fd4', background: 'rgba(74,56,150,0.08)' }}
      >
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#7b5fc0' }} />
        Coming Soon
      </div>
      <p className="text-white/30 text-sm max-w-xs mx-auto">
        No products listed yet — add items in your Shopify dashboard and they&apos;ll appear here automatically.
      </p>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default async function MerchandisePage() {
  const allProducts = await getProducts(12);
  // Tickets live on the Events page — exclude them here
  const products = allProducts.filter(p => p.handle !== 'afterlight-v');

  return (
    <div className="min-h-screen bg-[#080808] text-[#FFFDFA]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(55,31,118,0.08) 0%, transparent 60%)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-24">
        {/* Back */}
        <div className="mb-12">
          <Link href="/" className="text-white/40 hover:text-white transition-colors text-xs tracking-widest uppercase">
            ← Home
          </Link>
        </div>

        {/* Heading */}
        <div className="mb-14">
          <p className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: '#4a3896' }}>Store</p>
          <h1
            className="text-white leading-none"
            style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.05em', fontSize: 'clamp(3rem, 10vw, 7rem)' }}
          >
            Merchandise
          </h1>
        </div>

        {/* Products or placeholder */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <ComingSoon />
        )}

        <p className="text-center text-[9px] tracking-[0.4em] text-white/15 uppercase mt-16">
          Paracausal Collective · Cape Town, South Africa
        </p>
      </div>
    </div>
  );
}
