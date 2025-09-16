"use client";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { cartAtom, cartTotalAtom } from "@/lib/atom";
import { supabase } from "@/lib/supabaseClient";

export default function CartSummaryReadOnly() {
  const [cart] = useAtom(cartAtom);
  const [total] = useAtom(cartTotalAtom);
  const [flavorPrices, setFlavorPrices] = useState({});
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
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

  if (!hasMounted) return null;

  return (
    <div className="bg-amber-50 p-6 rounded-2xl w-full border border-amber-200 shadow-md">
      <h3 className="font-extrabold text-lg mb-4 text-amber-600 text-center">
        Order Summary
      </h3>

      {cart.length === 0 ? (
        <p className="text-center py-6 text-sm text-gray-500">
          Your cart is empty
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-start border-b border-amber-100 pb-3"
            >
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">
                  {item.qty} × {item.package}
                </h4>
                <ul className="list-disc list-inside text-[12px] text-gray-600 mt-1 space-y-0.5">
                  {item.flavors.map((flavor, i) => (
                    <li key={i}>
                      {flavor} —{" "}
                      <span className="text-amber-600 font-medium">
                        ₱{flavorPrices[flavor]?.toFixed(2) ?? "0.00"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-right text-sm">
                <p className="font-bold text-amber-900">
                  ₱{item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          {/* Summary Section */}
          <div className="border-t border-amber-200 pt-4 mt-2 space-y-2 text-gray-700">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-medium">₱{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>VAT (10%)</span>
              <span className="font-medium">₱{(total * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-extrabold text-lg text-green-600 pt-2">
              <span>Total</span>
              <span>₱{(total * 1.1).toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
