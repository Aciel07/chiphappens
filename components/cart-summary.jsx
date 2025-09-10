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
    <div className="bg-gray-50 p-5 rounded-lg w-full max-w-md border border-gray-200 shadow-sm">
      <h3 className="font-semibold text-base mb-3 text-gray-900">
        Order Summary
      </h3>

      {cart.length === 0 ? (
        <p className="text-center py-6 text-sm text-gray-500">
          Your cart is empty
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {cart.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-start border-b border-gray-100 pb-2"
            >
              <div>
                <h4 className="font-medium text-gray-800 text-sm">
                  {item.qty} × {item.package}
                </h4>
                <ul className="list-disc list-inside text-[12px] text-gray-600 mt-1 space-y-0.5">
                  {item.flavors.map((flavor, i) => (
                    <li key={i}>
                      {flavor} ₱
                      {flavorPrices[flavor]?.toFixed(2) ?? "0.00"}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-right text-sm text-gray-800">
                <p className="font-semibold">
                  ₱{item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          {/* Summary Section */}
          <div className="border-t pt-3 mt-2 space-y-1.5 text-gray-700">
            <div className="flex justify-between text-[13px]">
              <span>Subtotal</span>
              <span>₱{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span>VAT (10%)</span>
              <span>₱{(total * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-base text-gray-900 pt-1">
              <span>Total</span>
              <span>₱{(total * 1.1).toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
