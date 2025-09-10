"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { addToCartAtom } from "@/lib/atom";

export default function CookieSlot({ cookies, maxCookies, onRemove, onResetBox }) {
  const addToCart = useSetAtom(addToCartAtom);
  const router = useRouter();
  const [showPrompt, setShowPrompt] = useState(false);

  const slots = Array.from({ length: maxCookies }, (_, i) => cookies[i] || null);
  const gridCols =
    maxCookies <= 4 ? "grid-cols-2" : maxCookies <= 8 ? "grid-cols-3" : "grid-cols-4";
  const totalPrice = cookies.reduce((sum, c) => sum + (c.price || 0), 0);

  const handleAddToCart = () => {
    if (cookies.length < maxCookies) {
      alert(`Please fill all ${maxCookies} slots before adding to cart.`);
      return;
    }

    addToCart({
      package: maxCookies === 1 ? "Single" : `Custom Box of ${maxCookies}`,
      flavors: cookies.map((c) => c.name),
      qty: 1,
      price: totalPrice,
    });

    setShowPrompt(true);
  };

  return (
    <div className="flex  max-h-[500px]">
      <aside className="w-80 bg-white border rounded-2xl p-5 shadow-lg flex flex-col">
        <h3 className="text-lg font-bold mb-4 text-black text-center">
          Cookie Box ({cookies.length}/{maxCookies})
        </h3>

        {/* Slots Grid */}
        <div className={`grid ${gridCols} gap-3`}>
          {slots.map((cookie, idx) => (
            <div
              key={idx}
              className="relative aspect-square border-2 border-dashed rounded-xl flex items-center justify-center bg-gray-50"
            >
              {cookie ? (
                <>
                  <img
                    src={cookie.image || "https://via.placeholder.com/150"}
                    alt={cookie.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs py-1 text-center truncate px-1">
                    {cookie.name}
                  </div>
                  <button
                    onClick={() => onRemove(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <span className="text-gray-400 text-sm">Empty</span>
              )}
            </div>
          ))}
        </div>

        {/* Total & Add Button */}
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-xl font-bold text-gray-800 text-center">
            ₱{totalPrice.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            disabled={cookies.length === 0}
            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>

        {/* Prompt Modal */}
        {showPrompt && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm text-center">
              <h4 className="mb-3">
                Would you like to add more items?
              </h4>
              <p className="mb-5">
                You can add another box of cookies, or go to checkout now.
              </p>
              <div className="flex justify-between gap-3">
                <button
                  onClick={() => {
                    setShowPrompt(false);
                    onResetBox();
                  }}
                  className="flex-1 bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200"
                >
                  Add More
                </button>
                <button
                  onClick={() => {
                    setShowPrompt(false);
                    router.push("/Cart/Checkout");
                  }}
                  className="flex-1 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
