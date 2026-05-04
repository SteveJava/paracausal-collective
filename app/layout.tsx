import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import { CartProvider } from '@/lib/CartContext';

export const metadata: Metadata = {
  title: 'Paracausal — Transcend Reality',
  description: 'Underground dark psychedelic techno and psytrance experiences. Cape Town, South Africa.',
  openGraph: {
    title: 'Paracausal',
    description: 'Enter the Paracausal Experience. Underground electronic music. Cape Town.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body className="bg-[#080808] overflow-x-hidden" style={{ color: '#FFFDFA' }}>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
