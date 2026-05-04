'use client';

import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';

export interface CartItem {
  tier: string;
  qty: number;
  price: number;
  name: string;
}

interface CartContextValue {
  items: CartItem[];
  cartCount: number;
  justAdded: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (tier: string) => void;
  updateQty: (tier: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [justAdded, setJustAdded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addToCart = useCallback((item: CartItem) => {
    setItems(prev => {
      const existing = prev.findIndex(i => i.tier === item.tier);
      if (existing >= 0) {
        const next = [...prev];
        next[existing] = { ...next[existing], qty: next[existing].qty + item.qty };
        return next;
      }
      return [...prev, item];
    });
    setJustAdded(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setJustAdded(false), 2500);
  }, []);

  const removeFromCart = useCallback((tier: string) => {
    setItems(prev => prev.filter(i => i.tier !== tier));
  }, []);

  const updateQty = useCallback((tier: string, qty: number) => {
    if (qty < 1) return;
    setItems(prev => prev.map(i => i.tier === tier ? { ...i, qty } : i));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const cartCount = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, cartCount, justAdded, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
