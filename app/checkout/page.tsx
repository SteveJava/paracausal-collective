'use client';

import { useEffect } from 'react';
import Link from 'next/link';

declare global {
  interface Window {
    ShopifyBuy?: {
      UI?: {
        onReady: (client: unknown) => Promise<{
          createComponent: (type: string, opts: unknown) => void;
        }>;
      };
      buildClient?: (config: {
        domain: string;
        storefrontAccessToken: string;
      }) => unknown;
    };
  }
}

const BTN = {
  'font-family':    "'Archivo Black', sans-serif",
  'font-size':      '11px',
  'letter-spacing': '0.12em',
  'text-transform': 'uppercase',
  'padding-top':    '14px',
  'padding-bottom': '14px',
  'padding-left':   '28px',
  'padding-right':  '28px',
  'background-color': '#020079',
  ':hover': { 'background-color': '#0300ce' },
  ':focus': { 'background-color': '#0300ce' },
  'border-radius': '0',
};

function initShopify() {
  const client = window.ShopifyBuy!.buildClient!({
    domain: 'rf9fpy-48.myshopify.com',
    storefrontAccessToken: 'af7f813a822316f04d7b068940181abc',
  });

  window.ShopifyBuy!.UI!.onReady(client).then((ui) => {
    const node = document.getElementById('ticket-product');
    if (!node) return;

    ui.createComponent('product', {
      id: '15105243349360',
      node,
      moneyFormat: 'R%20%7B%7Bamount%7D%7D',
      options: {
        product: {
          styles: {
            product: {
              'background-color': 'transparent',
              'max-width': '100%',
              'text-align': 'left',
            },
            title: {
              'font-family': "'Archivo Black', sans-serif",
              color: '#ffffff',
              'font-size': '1.4rem',
              'font-weight': 'normal',
              'letter-spacing': '0.03em',
            },
            price: {
              color: 'rgba(255,255,255,0.4)',
              'font-size': '0.85rem',
              'letter-spacing': '0.1em',
            },
            compareAt: { color: 'rgba(255,255,255,0.2)' },
            button: BTN,
          },
          contents: {
            img:                true,
            imgWithCarousel:    false,
            title:              true,
            variantTitle:       false,
            price:              true,
            options:            true,
            quantity:           false,
            quantityIncrement:  false,
            quantityDecrement:  false,
            quantityInput:      false,
            button:             false,
            buttonWithQuantity: true,
            description:        false,
          },
          text: { button: 'Add to cart' },
        },
        modalProduct: {
          contents: {
            img:                false,
            imgWithCarousel:    true,
            button:             false,
            buttonWithQuantity: true,
          },
          styles: {
            product: {
              '@media (min-width: 601px)': {
                'max-width':     '100%',
                'margin-left':   '0px',
                'margin-bottom': '0px',
              },
            },
            button: BTN,
          },
          text: { button: 'Add to cart' },
        },
        option: {},
        cart: {
          styles: {
            button: BTN,
            footer: { 'background-color': '#f9f9f9' },
          },
          text: { total: 'Subtotal', button: 'Checkout' },
          popup: false,
        },
        toggle: {
          styles: {
            toggle: {
              'background-color': '#020079',
              ':hover': { 'background-color': '#0300ce' },
              ':focus': { 'background-color': '#0300ce' },
            },
            count:    { color: '#ffffff' },
            iconPath: { fill: '#ffffff' },
          },
        },
      },
    });
  });
}

export default function CheckoutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const scriptURL =
      'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) window.location.reload();
    };
    window.addEventListener('pageshow', handlePageShow);

    if (window.ShopifyBuy?.UI) {
      initShopify();
    } else {
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      document.head.appendChild(script);
      script.onload = initShopify;
    }

    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-[#FFFDFA]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(55,31,118,0.10) 0%, transparent 70%)' }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        <div className="mb-10">
          <Link href="/events" className="text-white/40 hover:text-white transition-colors text-xs tracking-widest uppercase">
            ← Events
          </Link>
        </div>

        <div className="mb-10">
          <p className="text-[10px] tracking-[0.5em] mb-3" style={{ color: '#4a3896' }}>Paracausal</p>
          <h1
            className="text-4xl sm:text-6xl text-white leading-none"
            style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.05em' }}
          >
            AFTERLIGHT V<br />
            <span className="text-white/20">31 JULY 2026</span>
          </h1>
        </div>

        <div className="mb-10 h-px" style={{ background: 'linear-gradient(to right, rgba(74,56,150,0.4), transparent)' }} />

        <div id="ticket-product" />

        <p className="mt-10 text-center text-[9px] text-white/10 tracking-widest">
          Payments processed securely by Shopify · All sales final
        </p>
      </div>
    </div>
  );
}
