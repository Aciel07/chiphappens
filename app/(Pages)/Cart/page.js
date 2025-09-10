"use client";

import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

import { useAtom, useSetAtom } from "jotai";
import {
  cartAtom,
  removeFromCartAtom,
  updateQtyAtom,
  cartTotalAtom,
} from "@/lib/atom";

export default function CartPage() {
  const [cart] = useAtom(cartAtom);
  const total = useAtom(cartTotalAtom)[0];
  const removeFromCart = useSetAtom(removeFromCartAtom);
  const updateQty = useSetAtom(updateQtyAtom);
  const router = useRouter();
  const [flavorPrices, setFlavorPrices] = useState({});
  const [cartNotes, setCartNotes] = useState(""); // NEW: Cart-level notes

  useEffect(() => {
    const fetchMenu = async () => {
      const { data, error } = await supabase
        .from("menu_items")
        .select("name, price");

      if (error) {
        console.error("Error fetching menu:", error);
        return;
      }

      const prices = {};
      data.forEach(({ name, price }) => {
        prices[name] = price;
      });

      setFlavorPrices(prices);
    };

    fetchMenu();
  }, []);

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      <Navbar />
      <section className="bg-white flex-1 flex flex-col items-center min-h-screen py-10">
        <div className="w-full max-w-3xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h2>

          {cart.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <p className="text-lg">🛒 Your cart is empty</p>
              <button
                onClick={() => router.push("/Menu")}
                className="mt-4 bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border border-gray-200 rounded-xl p-5 bg-gray-50 "
                >
                  {/* Item Details */}
                  <div className="flex-1 space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {item.package}
                    </h4>

                    {hasMounted && (
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {item.flavors.map((flavor, i) => (
                          <li key={i}>
                            {flavor} –{" "}
                            <span className="font-medium">
                              ₱{flavorPrices[flavor]?.toFixed(2) ?? "0.00"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex flex-col items-end sm:items-center gap-2 sm:gap-4 min-w-[130px]">
                    <p className="text-base font-semibold text-gray-900">
                      ₱{item.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty({ index, qty: item.qty - 1 })}
                        disabled={item.qty <= 1}
                        className="w-9 h-9 text-xl font-bold bg-gray-100 text-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label="Decrease quantity"
                      >
                        –
                      </button>

                      <span className="w-8 text-center text-sm font-medium text-gray-800">
                        {item.qty}
                      </span>

                      <button
                        onClick={() => updateQty({ index, qty: item.qty + 1 })}
                        className="w-9 h-9 text-xl font-bold bg-gray-100 text-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(index)}
                    className="mt-2 sm:mt-0 sm:ml-4 text-red-500 hover:text-red-600 transition-colors"
                    aria-label="Remove item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              ))}

              <div className="mt-6">
                <label
                  htmlFor="cart-notes"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Notes (Optional)
                </label>
                <textarea
                  id="cart-notes"
                  rows={3}
                  className="bg-white min-h-[100px] w-full border rounded-md p-3 text-sm text-gray-700 focus:outline-none"
                  placeholder="Add any special instructions, delivery preferences, etc."
                  value={cartNotes}
                  onChange={(e) => setCartNotes(e.target.value)}
                />
              </div>

              {/* Cart Summary */}
              <div className="border-t pt-6 mt-6 space-y-2 text-gray-700">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₱{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>VAT (10%)</span>
                  <span>₱{(total * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₱{(total * 1.1).toFixed(2)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => router.push("/Menu")}
                  className="text-sm text-gray-600 hover:text-gray-900 underline"
                >
                  ← Add More Items
                </button>
                <button
                  onClick={() => router.push("/Cart/Checkout")}
                  className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
