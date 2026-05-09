'use client';

import { useState, useEffect } from 'react';

interface Variant {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  available: boolean;
}

interface ProductData {
  title: string;
  image: { url: string; altText: string } | null;
  variants: Variant[];
}

interface Props {
  productId: string;
}

export default function MerchProduct({ productId }: Props) {
  const [product,         setProduct]         = useState<ProductData | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity,        setQuantity]        = useState(1);
  const [loading,         setLoading]         = useState(true);
  const [checkingOut,     setCheckingOut]     = useState(false);
  const [error,           setError]           = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/checkout?productId=${productId}`)
      .then(r => r.json())
      .then((data: ProductData) => {
        setProduct(data);
        const first = data.variants?.find(v => v.available) ?? data.variants?.[0] ?? null;
        setSelectedVariant(first);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCheckout = async () => {
    if (!selectedVariant) return;
    setCheckingOut(true);
    setError(null);

    try {
      const res  = await fetch('/api/checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ variantId: selectedVariant.id, quantity }),
      });
      const data = await res.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setError('Could not start checkout — please try again.');
        setCheckingOut(false);
      }
    } catch {
      setError('Something went wrong — please try again.');
      setCheckingOut(false);
    }
  };

  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <section className="py-20 sm:py-28 px-6 sm:px-8" style={{ background: '#060606' }}>
        <div className="max-w-6xl mx-auto">
          <div className="h-3 w-24 bg-white/5 animate-pulse mb-10 rounded-sm" />
          <div className="grid md:grid-cols-2 gap-12">
            <div className="aspect-square bg-white/5 animate-pulse" />
            <div className="space-y-4 pt-4">
              <div className="h-8 w-3/4 bg-white/5 animate-pulse rounded-sm" />
              <div className="h-4 w-1/4 bg-white/5 animate-pulse rounded-sm" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!product) return null;

  const price              = selectedVariant?.price;
  const showVariants       = product.variants.some(v => v.title !== 'Default Title');
  const isSoldOut          = selectedVariant && !selectedVariant.available;

  return (
    <section className="relative py-20 sm:py-28 px-6 sm:px-8" style={{ background: '#060606' }}>
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(55,31,118,0.07) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative">
        <p className="text-[10px] tracking-[0.5em] uppercase mb-10" style={{ color: '#4a3896' }}>Store</p>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Product image ── */}
          {product.image && (
            <div
              className="aspect-square overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <img
                src={product.image.url}
                alt={product.image.altText ?? product.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* ── Product details ── */}
          <div>
            <h2
              className="text-white leading-none mb-3"
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                letterSpacing: '0.03em',
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              }}
            >
              {product.title}
            </h2>

            {price && (
              <p className="text-white/40 text-sm tracking-widest mb-10">
                {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
              </p>
            )}

            {/* Variant / size selector */}
            {showVariants && (
              <div className="mb-8">
                <p className="text-[9px] tracking-[0.4em] text-white/25 uppercase mb-3">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(v => (
                    <button
                      key={v.id}
                      onClick={() => v.available && setSelectedVariant(v)}
                      disabled={!v.available}
                      className="px-4 py-2 text-xs tracking-widest uppercase transition-all duration-200"
                      style={{
                        border:     selectedVariant?.id === v.id
                          ? '1px solid rgba(74,56,150,0.9)'
                          : '1px solid rgba(255,255,255,0.1)',
                        background: selectedVariant?.id === v.id
                          ? 'rgba(74,56,150,0.2)'
                          : 'transparent',
                        color:      v.available ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.2)',
                        cursor:     v.available ? 'pointer' : 'not-allowed',
                        textDecoration: v.available ? 'none' : 'line-through',
                      }}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-10">
              <p className="text-[9px] tracking-[0.4em] text-white/25 uppercase mb-3">Quantity</p>
              <div
                className="inline-flex items-center"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors text-xl leading-none"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm text-white tabular-nums">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors text-xl leading-none"
                >
                  +
                </button>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handleCheckout}
              disabled={checkingOut || !!isSoldOut}
              className="inline-flex items-center gap-3 px-10 py-4 text-xs tracking-widest uppercase text-white transition-opacity hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background:  'linear-gradient(135deg, rgba(2,0,121,0.95), rgba(74,56,150,0.85))',
                clipPath:    'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
                border:      '1px solid rgba(74,56,150,0.4)',
              }}
            >
              {checkingOut ? 'Redirecting…' : isSoldOut ? 'Sold Out' : 'Checkout'}
              {!checkingOut && !isSoldOut && (
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              )}
            </button>

            {error && (
              <p className="mt-4 text-[11px] tracking-wide" style={{ color: 'rgba(255,100,100,0.7)' }}>
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
