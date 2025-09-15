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
import Footer from "@/components/footer";

export default function CartPage() {
  const [cart] = useAtom(cartAtom);
  const total = useAtom(cartTotalAtom)[0];
  const removeFromCart = useSetAtom(removeFromCartAtom);
  const updateQty = useSetAtom(updateQtyAtom);
  const router = useRouter();
  const [flavorPrices, setFlavorPrices] = useState({});
  const [cartNotes, setCartNotes] = useState("");

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
      <main className="bg-amber-50 min-h-screen w-full flex flex-col">
        <section className="px-6 py-16 text-center bg-gradient-to-r from-amber-700 via-amber-500 to-amber-200 text-amber-900">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            Your Cart
          </h1>
          <p className="mt-3 text-base sm:text-lg md:text-xl text-amber-900/90 max-w-2xl mx-auto">
            Review your cookies before checkout. Add notes, adjust quantities,
            and get ready for some sweet happiness.
          </p>
        </section>

        <section className="flex-1 w-full max-w-3xl mx-auto px-6 py-12">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl shadow-lg border border-amber-200 max-w-3xl mx-auto">
              <p className="text-xl font-semibold text-amber-900 mb-6">
                Your cart is empty 😢
              </p>

              <img
                src="https://cdtmcdxrdnauwehohxkh.supabase.co/storage/v1/object/sign/images/background/cookie_bg.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85N2VhODBjMy1hYjczLTRlMGYtYTVjZi01YWFiM2RlODFkNTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvYmFja2dyb3VuZC9jb29raWVfYmcucG5nIiwiaWF0IjoxNzU3OTI0MTA1LCJleHAiOjIwNzMyODQxMDV9.rSHQwTB4MgdngJnnzzq4UPen8310TyAF7czuNHR4lVA"
                alt="Empty Cart"
                className="w-44 h-44 object-cover mb-6 rounded-full shadow-sm opacity-80"
              />

              <button
                onClick={() => router.push("/Menu")}
                className="bg-amber-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-amber-600 transition"
              >
                Browse Menu
              </button>

              <p className="mt-4 text-sm text-gray-500 text-center px-4">
                Tip: Add some cookies to your cart and start snacking! 🍪
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 bg-white  border-2 border-amber-300 rounded-2xl p-6 shadow hover:shadow-md transition"
                >
                  {/* Item Details */}
                  <div className="flex-1 space-y-2">
                    <h4 className="text-base font-bold text-amber-900">
                      {item.package}
                    </h4>
                    {hasMounted && (
                      <ul className="list-disc list-inside text-sm text-amber-800 space-y-1">
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
                  <div className="flex flex-col items-end sm:items-center gap-3 min-w-[130px]">
                    <p className="text-lg font-extrabold text-amber-900">
                      ₱{item.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty({ index, qty: item.qty - 1 })}
                        disabled={item.qty <= 1}
                        className="w-8 h-8 text-lg font-bold bg-amber-100 text-amber-800 rounded-full flex items-center justify-center hover:bg-amber-200 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        –
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-amber-900">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty({ index, qty: item.qty + 1 })}
                        className="w-8 h-8 text-lg font-bold bg-amber-100 text-amber-800 rounded-full flex items-center justify-center hover:bg-amber-200"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(index)}
                    className="mt-2 sm:mt-0 text-red-500 hover:text-red-600 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* Notes */}
              <div className="bg-white  border-2 border-amber-300 rounded-2xl p-6 shadow">
                <label
                  htmlFor="cart-notes"
                  className="block text-sm font-semibold text-amber-900 mb-2"
                >
                  Notes (Optional)
                </label>
                <textarea
                  id="cart-notes"
                  rows={3}
                  className="w-full border border-dashed border-amber-300 rounded-lg p-3 text-sm text-amber-900 focus:outline-none"
                  placeholder="Add any special instructions or delivery preferences..."
                  value={cartNotes}
                  onChange={(e) => setCartNotes(e.target.value)}
                />
              </div>

              {/* Cart Summary */}
              <div className="bg-white  border-2 border-amber-300 rounded-2xl p-6 shadow space-y-3">
                <div className="flex justify-between text-sm text-amber-800">
                  <span>Subtotal</span>
                  <span>₱{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-amber-800">
                  <span>VAT (10%)</span>
                  <span>₱{(total * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-extrabold text-lg text-green-600 ">
                  <span>Total</span>
                  <span>₱{(total * 1.1).toFixed(2)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => router.push("/Menu")}
                  className="text-sm text-amber-700 hover:text-amber-900 underline"
                >
                  ← Add More Items
                </button>
                <button
                  onClick={() => router.push("/Cart/Checkout")}
                  className="bg-amber-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-amber-600 transition"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
