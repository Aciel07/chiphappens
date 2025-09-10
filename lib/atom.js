"use client";

import { atom } from "jotai";

// --- Cart Atom (with localStorage persistence) ---
export const cartAtom = atom(
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("cart") || "[]")
    : []
);

// --- Cart count (derived atom) ---
export const cartCountAtom = atom((get) => {
  return get(cartAtom).reduce((sum, item) => sum + (item.qty || 1), 0);
});

cartAtom.onMount = (set) => {
  const update = () => {
    const stored = localStorage.getItem("cart");
    if (stored) set(JSON.parse(stored));
  };
  update();
  const handler = () => update();
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
};

// --- Add to cart ---
export const addToCartAtom = atom(null, (get, set, newItem) => {
  const updated = [...get(cartAtom), { ...newItem, qty: 1 }];
  set(cartAtom, updated);
  localStorage.setItem("cart", JSON.stringify(updated));
});

// --- Remove from cart ---
export const removeFromCartAtom = atom(null, (get, set, index) => {
  const updated = get(cartAtom).filter((_, i) => i !== index);
  set(cartAtom, updated);
  localStorage.setItem("cart", JSON.stringify(updated));
});

// --- Update quantity ---
export const updateQtyAtom = atom(null, (get, set, { index, qty }) => {
  if (qty < 1) return;
  const updated = [...get(cartAtom)];
  updated[index].qty = qty;
  set(cartAtom, updated);
  localStorage.setItem("cart", JSON.stringify(updated));
});

// --- Cart total (derived atom) ---
export const cartTotalAtom = atom((get) => {
  return get(cartAtom).reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );
});
