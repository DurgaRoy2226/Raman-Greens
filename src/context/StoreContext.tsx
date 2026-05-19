"use client";

import { createContext, useContext, useEffect, useReducer, type ReactNode } from "react";
import { PRODUCTS, type Product } from "../data/products";

export type CartItem = { product: Product; qty: number };

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: "Processing" | "Shipped" | "Delivered";
  address: string;
};

type State = {
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  coupon: string | null;
  user: { name: string; email: string } | null;
};

type Action =
  | { type: "ADD_TO_CART"; product: Product; qty?: number }
  | { type: "REMOVE_FROM_CART"; id: string }
  | { type: "UPDATE_QTY"; id: string; qty: number }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_WISHLIST"; id: string }
  | { type: "APPLY_COUPON"; code: string | null }
  | { type: "PLACE_ORDER"; order: Order }
  | { type: "UPDATE_ORDER_STATUS"; id: string; status: Order["status"] }
  | { type: "LOGIN"; user: { name: string; email: string } }
  | { type: "LOGOUT" };

const initialState: State = {
  cart: [],
  wishlist: [],
  orders: [
    {
      id: "ORD-1042",
      items: [{ product: PRODUCTS[0], qty: 2 }, { product: PRODUCTS[5], qty: 1 }],
      total: 500,
      date: "2026-01-12",
      status: "Delivered",
      address: "12 Padava Road, Khandwa",
    },
    {
      id: "ORD-1056",
      items: [{ product: PRODUCTS[4], qty: 1 }],
      total: 1499,
      date: "2026-02-03",
      status: "Shipped",
      address: "12 Padava Road, Khandwa",
    },
  ],
  coupon: null,
  user: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TO_CART": {
      const exist = state.cart.find((c) => c.product.id === action.product.id);
      if (exist) {
        return {
          ...state,
          cart: state.cart.map((c) =>
            c.product.id === action.product.id ? { ...c, qty: c.qty + (action.qty ?? 1) } : c
          ),
        };
      }
      return { ...state, cart: [...state.cart, { product: action.product, qty: action.qty ?? 1 }] };
    }
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((c) => c.product.id !== action.id) };
    case "UPDATE_QTY":
      return {
        ...state,
        cart: state.cart
          .map((c) => (c.product.id === action.id ? { ...c, qty: action.qty } : c))
          .filter((c) => c.qty > 0),
      };
    case "CLEAR_CART":
      return { ...state, cart: [], coupon: null };
    case "TOGGLE_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.includes(action.id)
          ? state.wishlist.filter((i) => i !== action.id)
          : [...state.wishlist, action.id],
      };
    case "APPLY_COUPON":
      return { ...state, coupon: action.code };
    case "PLACE_ORDER":
      return { ...state, orders: [action.order, ...state.orders], cart: [], coupon: null };
    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((o) => (o.id === action.id ? { ...o, status: action.status } : o)),
      };
    case "LOGIN":
      return { ...state, user: action.user };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
}

const StoreCtx = createContext<{ state: State; dispatch: React.Dispatch<Action> } | null>(null);

function init(initialState: State): State {
  if (typeof window === "undefined") return initialState;
  const raw = localStorage.getItem("rg-knw-store");
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      const cart: CartItem[] = (parsed.cart || [])
        .map((c: { id: string; qty: number }) => {
          const p = PRODUCTS.find((x) => x.id === c.id);
          return p ? { product: p, qty: c.qty } : null;
        })
        .filter(Boolean);
      return {
        ...initialState,
        cart,
        wishlist: parsed.wishlist || [],
        coupon: parsed.coupon || null,
      };
    } catch {}
  }
  return initialState;
}

<<<<<<< HEAD
export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, init);
=======
  // Hydrate from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("rg-knw-store");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        // re-attach product objects for cart
        const cart: CartItem[] = (parsed.cart || [])
          .map((c: { id: string; qty: number }) => {
            const p = PRODUCTS.find((x) => x.id === c.id);
            return p ? { product: p, qty: c.qty } : null;
          })
          .filter(Boolean);
        dispatch({
          type: "HYDRATE",
          state: { 
            cart, 
            wishlist: parsed.wishlist || [], 
            coupon: parsed.coupon || null,
            user: parsed.user || null,
            orders: parsed.orders || state.orders
          },
        });
      } catch {}
    }
  }, []);
>>>>>>> 752e61b34fc3dfa17f2d0b5db6457739b5bcef7c

  // Persist
  useEffect(() => {
    localStorage.setItem(
      "rg-knw-store",
      JSON.stringify({
        cart: state.cart.map((c) => ({ id: c.product.id, qty: c.qty })),
        wishlist: state.wishlist,
        coupon: state.coupon,
        user: state.user,
        orders: state.orders
      })
    );
  }, [state.cart, state.wishlist, state.coupon, state.user, state.orders]);

  return <StoreCtx.Provider value={{ state, dispatch }}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore must be inside StoreProvider");
  return ctx;
}

export const COUPONS: Record<string, number> = {
  NIMAR10: 0.1,
  KHANDWA15: 0.15,
  FRESH20: 0.2,
};
