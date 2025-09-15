"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { cartTotalAtom } from "@/lib/atom";

export default function CardPayment() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [total] = useAtom(cartTotalAtom);

  // detect card type from first digit
  const detectCardType = (num) => {
    if (/^4/.test(num)) return "visa";
    if (/^5[1-5]/.test(num)) return "mastercard";
    if (/^3[47]/.test(num)) return "amex";
    return null;
  };

  const cardType = detectCardType(formData.cardNumber);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalAmount = total * 1.1; // total with VAT
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (
      formData.fullName &&
      formData.cardNumber &&
      formData.expiry &&
      formData.cvv
    ) {
      router.push(
        `/Cart/Receipt?status=success&amount=${finalAmount.toFixed(2)}`
      );
    } else {
      router.push(`/Cart/Receipt?status=failed`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[620px] justify-items-center rounded-lg border border-gray-300 bg-white p-10 shadow-md space-y-6 text-gray-800"
    >
      <div className=" w-full flex items-center justify-between">
        <h3 className="text-lg font-semibold">Credit & Debit cards</h3>
        <div className="flex gap-2">
          <img
            src="/visa.svg"
            alt="Visa"
            className={`h-6 ${
              cardType === "visa" ? "opacity-100" : "opacity-40"
            }`}
          />
          <img
            src="/mastercard.svg"
            alt="MasterCard"
            className={`h-6 ${
              cardType === "mastercard" ? "opacity-100" : "opacity-40"
            }`}
          />
          <img
            src="/amex.svg"
            alt="Amex"
            className={`h-6 ${
              cardType === "amex" ? "opacity-100" : "opacity-40"
            }`}
          />
        </div>
      </div>
      <div className="max-w-[500px] w-full space-y-6">
        <div>
          <label className="text-sm">Cardholder Name</label>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="mt-1 block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-sm focus:border-gray-800 focus:ring-gray-800"
          />
        </div>

        {/* Card Number */}
        <div>
          <label className="text-sm">Card Number</label>
          <div className="relative">
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              maxLength={19}
              onChange={(e) => {
                let val = e.target.value.replace(/\D/g, "");
                val = val.match(/.{1,4}/g)?.join(" ") || "";
                setFormData({ ...formData, cardNumber: val });
              }}
              className="mt-1 block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-sm tracking-widest focus:border-gray-800 focus:ring-gray-800"
            />
            {cardType && (
              <img
                src={`/${cardType}.svg`}
                alt={cardType}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-5"
              />
            )}
          </div>
        </div>

        {/* Expiry + CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Expiry Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              maxLength={5}
              value={formData.expiry}
              onChange={(e) => {
                let val = e.target.value.replace(/\D/g, "");
                if (val.length > 4) val = val.slice(0, 4);
                if (val.length >= 3) {
                  val = val.slice(0, 2) + "/" + val.slice(2);
                }
                setFormData({ ...formData, expiry: val });
              }}
              className="mt-1 block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-sm focus:border-gray-800 focus:ring-gray-800"
            />
          </div>
          <div>
            <label className="text-sm">CVV</label>
            <input
              type="password"
              placeholder="•••"
              value={formData.cvv}
              maxLength={3}
              onChange={(e) =>
                setFormData({ ...formData, cvv: e.target.value })
              }
              className="mt-1 block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-sm focus:border-gray-800 focus:ring-gray-800"
            />
          </div>

        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="terms" className="mb-2" required />
          <label htmlFor="terms" className="text-sm text-gray-700">
          I have read and accept the terms of use and privacy policy
        </label>
      </div>


      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 focus:outline-none"
      >
        {loading ? "Processing..." : `Pay ₱${(total * 1.1).toFixed(2)}`}
      </button>
      </div>
    </form>
  );
}
