'use client';

import { useEffect } from 'react';

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

const PRODUCTS = [
  { id: '15105243349360', nodeId: 'shopify-product-a' },
  { id: '15105738408304', nodeId: 'shopify-product-b' },
];

const BTN = {
  'font-family': "'Archivo Black', sans-serif",
  'font-size':   '11px',
  'letter-spacing': '0.12em',
  'text-transform': 'uppercase',
  'padding-top':    '14px',
  'padding-bottom': '14px',
  'padding-left':   '28px',
  'padding-right':  '28px',
  'background-color': '#020079',
  ':hover':  { 'background-color': '#0300ce' },
  ':focus':  { 'background-color': '#0300ce' },
  'border-radius': '0',
};

function ShopifyBuyInit() {
  const client = window.ShopifyBuy!.buildClient!({
    domain: 'rf9fpy-48.myshopify.com',
    storefrontAccessToken: 'af7f813a822316f04d7b068940181abc',
  });

  window.ShopifyBuy!.UI!.onReady(client).then((ui) => {
    PRODUCTS.forEach(({ id, nodeId }) => {
      const node = document.getElementById(nodeId);
      if (!node) return;

      ui.createComponent('product', {
        id,
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
                'font-size': '1.1rem',
                'font-weight': 'normal',
                'letter-spacing': '0.03em',
              },
              price: {
                color: 'rgba(255,255,255,0.4)',
                'font-size': '0.8rem',
                'letter-spacing': '0.1em',
              },
              compareAt: {
                color: 'rgba(255,255,255,0.2)',
              },
              button: BTN,
              quantityInput: {
                'font-size': '13px',
              },
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
              footer: {
                'background-color': '#f9f9f9',
              },
            },
            text: {
              total:  'Subtotal',
              button: 'Checkout',
            },
            popup: false,
          },

          toggle: {
            styles: {
              toggle: {
                'background-color': '#020079',
                ':hover': { 'background-color': '#0300ce' },
                ':focus': { 'background-color': '#0300ce' },
              },
              count: { color: '#ffffff' },
              iconPath: { fill: '#ffffff' },
            },
          },
        },
      });
    });
  });
}

export default function ShopifyStore() {
  useEffect(() => {
    const scriptURL =
      'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

    if (window.ShopifyBuy?.UI) {
      ShopifyBuyInit();
    } else if (window.ShopifyBuy) {
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      document.head.appendChild(script);
      script.onload = ShopifyBuyInit;
    } else {
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      document.head.appendChild(script);
      script.onload = ShopifyBuyInit;
    }
  }, []);

  return (
    <section
      className="relative py-20 sm:py-28 px-6 sm:px-8"
      style={{ background: '#060606' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(55,31,118,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <p
          className="text-[10px] tracking-[0.5em] uppercase mb-10"
          style={{ color: '#4a3896' }}
        >
          Store
        </p>

        {/* Two products side by side */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-10">
          <div id="shopify-product-a" />
          <div id="shopify-product-b" />
        </div>
      </div>
    </section>
  );
}
