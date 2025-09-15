"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { addToCartAtom } from "@/lib/atom";

export default function CookieSlot({
  cookies,
  maxCookies,
  onRemove,
  onResetBox,
}) {
  const addToCart = useSetAtom(addToCartAtom);
  const router = useRouter();
  const [showPrompt, setShowPrompt] = useState(false);

  const slots = Array.from(
    { length: maxCookies },
    (_, i) => cookies[i] || null
  );
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

  const handleAddMore = () => {
    setShowPrompt(false);
    onResetBox?.();
    router.push("/Menu");
  };

  const handleCheckout = () => {
    setShowPrompt(false);
    router.push("/Cart");
  };

  return (
    <div className="relative w-full bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl px-6 py-4 shadow-md border border-yellow-200 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h5 className="absolute -top-2 left-8 bg-amber-100 px-3 py-3 rounded-md text-[12px] font-bold text-amber-700 shadow-sm">
        Cookie Slot {cookies.length}/{maxCookies}
      </h5>

      <div className="flex-1 flex justify-center flex-wrap gap- mt-7 ">
        {slots.map((cookie, idx) => (
          <div key={idx} className="flex flex-col items-center w-30">
            <div className="relative w-16 h-16 flex-shrink-0 rounded-full border-2 border-dashed border-amber-300 bg-white flex items-center justify-center shadow-sm">
              {cookie ? (
                <>
                  <img
                    src={cookie.image || "https://via.placeholder.com/150"}
                    alt={cookie.name}
                    className="w-full h-full object-cover rounded-full"
                    onClick={() => onRemove(idx)}
                  />
                  <button
                    onClick={() => onRemove(idx)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs shadow-md"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <span className="text-amber-400 text-lg font-extrabold">+</span>
              )}
            </div>

            {cookie && (
              <p className="mt-1 text-center text-xs text-[#373737] break-words w-full leading-tight">
                {cookie.name}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="border-l-2 border-[#F1D4A5] p-4 flex flex-col items-center gap-3">
        <span className="text-lg font-extrabold text-green-500">
          ₱{totalPrice.toFixed(2)}
        </span>

        <button
          onClick={handleAddToCart}
          disabled={cookies.length === 0}
          className="bg-amber-500 text-white px-5 py-1.5 rounded-full font-semibold shadow hover:bg-amber-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed text-sm w-full max-w-[200px]"
        >
          Add to Cart
        </button>

        <button
          onClick={onResetBox}
          className="bg-amber-500 text-white px-5 py-1.5 rounded-full font-semibold shadow hover:bg-amber-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed text-sm w-full max-w-[200px]"
        >
          Change Package
        </button>
      </div>

      {showPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <h3 className="text-lg font-bold text-amber-700 mb-4">
              Added to Cart!
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Do you want to add more cookies or proceed to checkout?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleAddMore}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition"
              >
                Add More
              </button>
              <button
                onClick={handleCheckout}
                className="px-4 py-2 rounded-lg bg-amber-500 text-white font-semibold hover:bg-amber-600 transition"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
