"use client";

import { atom } from "jotai";


export const cartCountAtom = atom((get) => {
  return get(cartAtom).reduce((sum, item) => sum + (item.qty || 1), 0);
});

export const cartAtom = atom([]);
cartAtom.onMount = (set) => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("cart");
    if (stored) {
      const parsed = JSON.parse(stored).map((item) => ({
        package: item.package || "Single",
        flavors: item.flavors || [],
        qty: item.qty || 1,
        price: item.price || 0,
      }));
      set(parsed);
      localStorage.setItem("cart", JSON.stringify(parsed)); 
    }

    const handler = () => {
      const updated = localStorage.getItem("cart");
      if (updated) set(JSON.parse(updated));
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }
};


export const addToCartAtom = atom(null, (get, set, newItem) => {
  const item = {
    package: newItem.package || "Single",
    flavors: newItem.flavors || [],
    qty: newItem.qty || 1,
    price: newItem.price || 0,
  };

  const updated = [...get(cartAtom), item];
  set(cartAtom, updated);
  localStorage.setItem("cart", JSON.stringify(updated));
});


export const removeFromCartAtom = atom(null, (get, set, index) => {
  const updated = get(cartAtom).filter((_, i) => i !== index);
  set(cartAtom, updated);
  localStorage.setItem("cart", JSON.stringify(updated));
});


export const updateQtyAtom = atom(null, (get, set, { index, qty }) => {
  if (qty < 1) return;
  const updated = [...get(cartAtom)];
  updated[index].qty = qty;
  set(cartAtom, updated);
  localStorage.setItem("cart", JSON.stringify(updated));
});


export const cartTotalAtom = atom((get) => {
  return get(cartAtom).reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );
});


export const clearCartAtom = atom(null, (get, set) => {
  set(cartAtom, []);
  localStorage.removeItem("cart");
});
