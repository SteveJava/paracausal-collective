'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    ShopifyBuy?: {
      UI?: {
        onReady: (client: unknown) => Promise<{ createComponent: (type: string, opts: unknown) => void }>;
      };
      buildClient?: (config: { domain: string; storefrontAccessToken: string }) => unknown;
    };
  }
}

export default function ShopifyBuyButton() {
  useEffect(() => {
    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

    function ShopifyBuyInit() {
      const client = window.ShopifyBuy!.buildClient!({
        domain: 'rf9fpy-48.myshopify.com',
        storefrontAccessToken: 'af7f813a822316f04d7b068940181abc',
      });

      window.ShopifyBuy!.UI!.onReady(client).then(function (ui) {
        ui.createComponent('product', {
          id: '15105738408304',
          node: document.getElementById('product-component-1778322350022'),
          moneyFormat: 'R%20%7B%7Bamount%7D%7D',
          options: {
            product: {
              styles: {
                product: {
                  '@media (min-width: 601px)': {
                    'max-width': 'calc(25% - 20px)',
                    'margin-left': '20px',
                    'margin-bottom': '50px',
                  },
                },
                button: {
                  'font-family': 'Roboto, sans-serif',
                  ':hover': { 'background-color': '#0300ce' },
                  'background-color': '#020079',
                  ':focus': { 'background-color': '#0300ce' },
                },
              },
              text: { button: 'Add to cart' },
              googleFonts: ['Roboto'],
            },
            productSet: {
              styles: {
                products: {
                  '@media (min-width: 601px)': { 'margin-left': '-20px' },
                },
              },
            },
            modalProduct: {
              contents: {
                img: false,
                imgWithCarousel: true,
                button: false,
                buttonWithQuantity: true,
              },
              styles: {
                product: {
                  '@media (min-width: 601px)': {
                    'max-width': '100%',
                    'margin-left': '0px',
                    'margin-bottom': '0px',
                  },
                },
                button: {
                  'font-family': 'Roboto, sans-serif',
                  ':hover': { 'background-color': '#0300ce' },
                  'background-color': '#020079',
                  ':focus': { 'background-color': '#0300ce' },
                },
              },
              googleFonts: ['Roboto'],
              text: { button: 'Add to cart' },
            },
            option: {},
            cart: {
              styles: {
                button: {
                  'font-family': 'Roboto, sans-serif',
                  ':hover': { 'background-color': '#0300ce' },
                  'background-color': '#020079',
                  ':focus': { 'background-color': '#0300ce' },
                },
              },
              text: { total: 'Subtotal', button: 'Checkout' },
              googleFonts: ['Roboto'],
            },
            toggle: {
              styles: {
                toggle: {
                  'font-family': 'Roboto, sans-serif',
                  'background-color': '#020079',
                  ':hover': { 'background-color': '#0300ce' },
                  ':focus': { 'background-color': '#0300ce' },
                },
              },
              googleFonts: ['Roboto'],
            },
          },
        });
      });
    }

    function loadScript() {
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
      script.onload = ShopifyBuyInit;
    }

    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        ShopifyBuyInit();
      } else {
        loadScript();
      }
    } else {
      loadScript();
    }
  }, []);

  return (
    <section className="relative py-20 sm:py-28 px-6 sm:px-8" style={{ background: '#060606' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(55,31,118,0.07) 0%, transparent 70%)' }}
      />
      <div className="max-w-6xl mx-auto relative">
        <p className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: '#4a3896' }}>Store</p>
        <div id="product-component-1778322350022" />
      </div>
    </section>
  );
}
