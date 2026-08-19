'use client';

import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { CartItem, CartState, Product } from '@/types';

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' };

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
  orderTotal: number;
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
    default:
      return state;
  }
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('hbr-cart');
      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          dispatch({ type: 'SET_CART', payload: parsed });
        }
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('hbr-cart', JSON.stringify(state.items));
    }
  }, [state.items, mounted]);

  const cartTotal = state.items.reduce((sum, item) => {
    if (item.product.price === null) return sum;
    return sum + item.product.price * item.quantity;
  }, 0);

  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryCharge = cartCount > 0 ? DELIVERY_CHARGE : 0;
  const orderTotal = cartTotal + deliveryCharge;

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
        orderTotal,
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
