'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';

function Field({
  label, type = 'text', placeholder, value, onChange, half = false,
}: {
  label: string; type?: string; placeholder: string; value: string;
  onChange: (v: string) => void; half?: boolean;
}) {
  return (
    <div className={half ? 'flex-1 min-w-0' : 'w-full'}>
      <label className="block text-[9px] tracking-[0.35em] text-white/30 uppercase mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border border-white/10 text-white placeholder-white/20 px-4 py-3 text-xs tracking-wider focus:outline-none transition-colors duration-200"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        onFocus={e => (e.target.style.borderColor = 'rgba(74,56,150,0.7)')}
        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
      />
    </div>
  );
}

function QtyControl({ qty, onDec, onInc }: { qty: number; onDec: () => void; onInc: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onDec}
        className="w-6 h-6 flex items-center justify-center border border-white/15 text-white/50 hover:border-white/40 hover:text-white transition-colors text-xs"
      >
        −
      </button>
      <span className="text-xs text-white/80 w-4 text-center">{qty}</span>
      <button
        type="button"
        onClick={onInc}
        className="w-6 h-6 flex items-center justify-center border border-white/15 text-white/50 hover:border-white/40 hover:text-white transition-colors text-xs"
      >
        +
      </button>
    </div>
  );
}

export default function CheckoutPage() {
  const { items, removeFromCart, updateQty, clearCart } = useCart();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const fee = Math.round(subtotal * 0.05);
  const total = subtotal + fee;

  const [form, setForm] = useState({ name: '', email: '', phone: '', card: '', expiry: '', cvv: '' });
  const [step, setStep] = useState<'form' | 'processing' | 'confirmed'>('form');

  const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      clearCart();
      setStep('confirmed');
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#FFFDFA]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Bg glow */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(55,31,118,0.10) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-white/40 hover:text-white transition-colors text-xs tracking-widest uppercase">← Back</Link>
          <span className="text-[9px] tracking-[0.4em] text-white/30 uppercase">Checkout</span>
        </div>
        <AnimatePresence mode="wait">
          {step === 'confirmed' ? (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-20"
            >
              <div
                className="w-16 h-16 flex items-center justify-center border border-[#4a3896]/50 mb-8"
                style={{ background: 'rgba(74,56,150,0.12)', clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#9b7fd4" strokeWidth="1.5">
                  <polyline points="4 12 9 17 20 6" />
                </svg>
              </div>
              <p className="text-[10px] tracking-[0.5em] text-[#4a3896] uppercase mb-4">Order Confirmed</p>
              <h1 className="text-5xl sm:text-7xl text-white leading-none mb-4" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                YOU'RE IN
              </h1>
              <p className="text-sm text-white/40 max-w-sm leading-relaxed mb-3">
                Your ticket for <span className="text-white/70">AFTERLIGHT — Chapter II</span> has been confirmed. Check your email for details.
              </p>
              <p className="text-xs text-white/25 tracking-widest mb-10">Ref: PCL-{Math.random().toString(36).slice(2,8).toUpperCase()}</p>
              <div className="flex gap-3">
                <Link
                  href="/account"
                  className="px-7 py-3 text-xs tracking-widest uppercase text-white border border-white/15 hover:border-white/30 transition-colors"
                  style={{ clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}
                >
                  View Tickets
                </Link>
                <Link
                  href="/"
                  className="px-7 py-3 text-xs tracking-widest uppercase text-white transition-opacity hover:opacity-80"
                  style={{ background: 'linear-gradient(135deg, rgba(2,0,121,0.9), rgba(55,31,118,0.7))', clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}
                >
                  Back Home
                </Link>
              </div>
            </motion.div>

          ) : items.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center text-center py-32"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 mb-6">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p className="text-[10px] tracking-[0.5em] text-white/30 uppercase mb-4">Your cart is empty</p>
              <h2 className="text-3xl text-white mb-6" style={{ fontFamily: "'Archivo Black', sans-serif" }}>NOTHING HERE YET</h2>
              <Link
                href="/"
                className="px-8 py-3 text-xs tracking-widest uppercase text-white transition-opacity hover:opacity-80"
                style={{ background: 'linear-gradient(135deg, rgba(2,0,121,0.9), rgba(55,31,118,0.7))', clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
              >
                Get Tickets
              </Link>
            </motion.div>

          ) : (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

              {/* Order summary */}
              <div className="lg:col-span-2 order-1 lg:order-2">
                <div
                  className="sticky top-28 border border-white/8 p-6"
                  style={{ background: 'rgba(13,13,26,0.7)', clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)' }}
                >
                  {/* Mini ticket */}
                  <div
                    className="relative overflow-hidden mb-6 p-5"
                    style={{ background: 'linear-gradient(135deg, #0d0020 0%, #050014 100%)', clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)', boxShadow: '0 0 30px rgba(55,31,118,0.3)' }}
                  >
                    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 50%, rgba(74,56,150,0.25) 0%, transparent 70%)' }} />
                    <div className="relative">
                      <p className="text-2xl text-white leading-none mb-3" style={{ fontFamily: "'Archivo Black', sans-serif", textShadow: '0 0 20px rgba(120,80,200,0.6)' }}>AFTERLIGHT</p>
                      <div className="flex gap-5">
                        {[['Date', 'SAT 14 JUN'], ['Venue', 'EVOL'], ['Doors', '22:00']].map(([l, v]) => (
                          <div key={l}>
                            <p className="text-[7px] tracking-widest text-white/25 uppercase">{l}</p>
                            <p className="text-[10px] text-white/60 tracking-wider mt-0.5">{v}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-[9px] tracking-[0.4em] text-white/25 uppercase mb-4">Order Summary</p>

                  <div className="space-y-3 mb-5">
                    <AnimatePresence>
                      {items.map(item => (
                        <motion.div
                          key={item.tier}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="flex items-center justify-between gap-2 py-1">
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] text-white/70 truncate">{item.name}</p>
                              <p className="text-[9px] text-white/30 mt-0.5">R{item.price} each</p>
                            </div>
                            <QtyControl
                              qty={item.qty}
                              onDec={() => item.qty > 1 ? updateQty(item.tier, item.qty - 1) : removeFromCart(item.tier)}
                              onInc={() => updateQty(item.tier, item.qty + 1)}
                            />
                            <div className="text-right ml-1">
                              <p className="text-xs text-white/80">R{item.price * item.qty}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.tier)}
                              className="ml-1 text-white/20 hover:text-red-400 transition-colors"
                              aria-label="Remove item"
                            >
                              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    <div className="h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />

                    <div className="flex justify-between text-xs text-white/30">
                      <span>Booking fee (5%)</span>
                      <span>R{fee}</span>
                    </div>
                  </div>

                  <div className="h-px mb-5" style={{ background: 'linear-gradient(to right, rgba(74,56,150,0.4), transparent)' }} />

                  <div className="flex justify-between items-baseline">
                    <span className="text-xs tracking-widest text-white/40 uppercase">Total</span>
                    <span className="text-2xl text-white" style={{ fontFamily: "'Archivo Black', sans-serif" }}>R{total}</span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="lg:col-span-3 order-2 lg:order-1 space-y-8">
                <div>
                  <p className="text-[10px] tracking-[0.5em] text-[#4a3896] uppercase mb-2">Secure Checkout</p>
                  <h1 className="text-4xl sm:text-5xl text-white leading-none" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                    YOUR DETAILS
                  </h1>
                </div>

                {/* Personal */}
                <div>
                  <p className="text-[9px] tracking-[0.35em] text-white/25 uppercase mb-4">Personal Information</p>
                  <div className="space-y-3">
                    <Field label="Full Name" placeholder="Your full name" value={form.name} onChange={set('name')} />
                    <Field label="Email Address" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} />
                    <Field label="Phone Number" type="tel" placeholder="+27 82 000 0000" value={form.phone} onChange={set('phone')} />
                  </div>
                </div>

                <div className="h-px" style={{ background: 'linear-gradient(to right, rgba(74,56,150,0.3), transparent)' }} />

                {/* Payment */}
                <div>
                  <p className="text-[9px] tracking-[0.35em] text-white/25 uppercase mb-4">Payment</p>
                  <div className="space-y-3">
                    <Field label="Card Number" placeholder="0000 0000 0000 0000" value={form.card} onChange={set('card')} />
                    <div className="flex gap-3">
                      <Field label="Expiry" placeholder="MM / YY" value={form.expiry} onChange={set('expiry')} half />
                      <Field label="CVV" placeholder="•••" value={form.cvv} onChange={set('cvv')} half />
                    </div>
                  </div>
                  <p className="mt-3 text-[9px] text-white/20 tracking-wider flex items-center gap-1.5">
                    <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="14" height="10" rx="1" /><path d="M1 7h14" /></svg>
                    256-bit SSL encrypted · Payments processed securely
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={step === 'processing'}
                  className="w-full py-4 text-sm tracking-widest uppercase text-white flex items-center justify-center gap-3 transition-opacity hover:opacity-85 disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, rgba(2,0,121,0.95), rgba(55,31,118,0.8))', clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)' }}
                >
                  {step === 'processing' ? (
                    <>
                      <span className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />
                      Processing
                    </>
                  ) : (
                    <>Pay R{total} · Confirm Order</>
                  )}
                </button>

                <p className="text-center text-[9px] text-white/15 tracking-widest">
                  By completing this purchase you agree to our terms. All sales final.
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
