'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { Product } from '../types/product';
import type { CartItem, CartState } from '../types/cart';

interface CartContextType extends CartState {
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
    | { type: 'ADD_TO_CART'; payload: Product }
    | { type: 'REMOVE_FROM_CART'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'LOAD_CART'; payload: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItem = state.items.find(
                (item) => item.product.id === action.payload.id
            );

            let newItems: CartItem[];
            if (existingItem) {
                newItems = state.items.map((item) =>
                    item.product.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                newItems = [...state.items, { product: action.payload, quantity: 1 }];
            }

            return calculateTotals(newItems);
        }

        case 'REMOVE_FROM_CART': {
            const newItems = state.items.filter(
                (item) => item.product.id !== action.payload
            );
            return calculateTotals(newItems);
        }

        case 'UPDATE_QUANTITY': {
            const newItems = state.items
                .map((item) =>
                    item.product.id === action.payload.productId
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                )
                .filter((item) => item.quantity > 0);
            return calculateTotals(newItems);
        }

        case 'CLEAR_CART': {
            return { items: [], totalItems: 0, totalPrice: 0 };
        }

        case 'LOAD_CART': {
            return calculateTotals(action.payload);
        }

        default:
            return state;
    }
}

function calculateTotals(items: CartItem[]): CartState {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    return { items, totalItems, totalPrice };
}

const CART_STORAGE_KEY = 'shopping-cart';

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, {
        items: [],
        totalItems: 0,
        totalPrice: 0,
    });

    useEffect(() => {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
            try {
                const items = JSON.parse(savedCart);
                dispatch({ type: 'LOAD_CART', payload: items });
            } catch (error) {
                console.error('Failed to load cart:', error);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    }, [state.items]);

    const addToCart = (product: Product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const removeFromCart = (productId: string) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };

    const updateQuantity = (productId: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider
            value={{
                ...state,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}