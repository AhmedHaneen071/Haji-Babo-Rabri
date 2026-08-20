'use client';

import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { CartItem, CartState, Product } from '@/types';
import { Coupon, calculateDiscount, couponExpired, getCoupon } from '@/lib/coupons';

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'APPLY_COUPON'; payload: string }
  | { type: 'REMOVE_COUPON' };

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  cartTotal: number;
  cartCount: number;
  deliveryCharge: number;
  coupon: Coupon | null;
  discount: number;
  orderTotal: number;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const DELIVERY_CHARGE = 200;

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.id
      );
      if (existingIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1,
        };
        return { ...state, items: updatedItems };
      }
      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload),
      };
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => item.product.id !== action.payload.productId
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'SET_CART':
      return { ...state, items: action.payload };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'APPLY_COUPON':
      return { ...state, coupon: action.payload };
    case 'REMOVE_COUPON':
      return { ...state, coupon: null };
    default:
      return state;
  }
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  coupon: null,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('hbr-cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          dispatch({ type: 'SET_CART', payload: parsed });
        } else if (parsed && typeof parsed === 'object') {
          if (Array.isArray(parsed.items)) {
            dispatch({ type: 'SET_CART', payload: parsed.items });
          }
          if (typeof parsed.coupon === 'string') {
            dispatch({ type: 'APPLY_COUPON', payload: parsed.coupon });
          }
        }
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(
        'hbr-cart',
        JSON.stringify({ items: state.items, coupon: state.coupon })
      );
    }
  }, [state.items, state.coupon, mounted]);

  const cartTotal = state.items.reduce((sum, item) => {
    if (item.product.price === null) return sum;
    return sum + item.product.price * item.quantity;
  }, 0);

  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryCharge = cartCount > 0 ? DELIVERY_CHARGE : 0;
  const coupon = state.coupon ? getCoupon(state.coupon) : null;
  const discount = coupon ? calculateDiscount(coupon, cartTotal) : 0;
  const orderTotal = Math.max(0, cartTotal + deliveryCharge - discount);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    dispatch({ type: 'OPEN_CART' });
  };

  const removeFromCart = (productId: string) =>
    dispatch({ type: 'REMOVE_ITEM', payload: productId });

  const updateQuantity = (productId: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const openCart = () => dispatch({ type: 'OPEN_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });

  const applyCoupon = (code: string): { ok: boolean; message: string } => {
    const couponToApply = getCoupon(code);
    if (!couponToApply) return { ok: false, message: 'Invalid coupon code' };
    if (couponExpired(couponToApply))
      return { ok: false, message: 'This coupon has expired' };
    if (couponToApply.minOrder && cartTotal < couponToApply.minOrder)
      return {
        ok: false,
        message: `Minimum order PKR ${couponToApply.minOrder.toLocaleString()} required`,
      };
    dispatch({ type: 'APPLY_COUPON', payload: couponToApply.code });
    return { ok: true, message: `${couponToApply.code} applied — enjoy your discount!` };
  };

  const removeCoupon = () => dispatch({ type: 'REMOVE_COUPON' });

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        cartTotal,
        cartCount,
        deliveryCharge,
        coupon,
        discount,
        orderTotal,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
