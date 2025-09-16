"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { cartTotalAtom, clearCartAtom } from "@/lib/atom";
export default function CardPayment() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [total] = useAtom(cartTotalAtom);
  const [, clearCart] = useAtom(clearCartAtom);

  const detectCardType = (num) => {
    const trimmed = num.replace(/\s/g, "");
    if (/^4/.test(trimmed)) {
      return { type: "visa", img: "https://cdtmcdxrdnauwehohxkh.supabase.co/storage/v1/object/sign/images/visa.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85N2VhODBjMy1hYjczLTRlMGYtYTVjZi01YWFiM2RlODFkNTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvdmlzYS5wbmciLCJpYXQiOjE3NTgwMDkwODAsImV4cCI6MjA3MzM2OTA4MH0.Egjk_a31yyts1a7KO5qBy8sdaSvjdKeRleuJe_57T_8" };
    }
    if (/^5[1-5]/.test(trimmed)) {
      return { type: "mastercard", img: "https://cdtmcdxrdnauwehohxkh.supabase.co/storage/v1/object/sign/images/amex.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85N2VhODBjMy1hYjczLTRlMGYtYTVjZi01YWFiM2RlODFkNTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvYW1leC5zdmciLCJpYXQiOjE3NTgwMDkwMzIsImV4cCI6MjA3MzM2OTAzMn0.80XiB1XIeW7BtuTm34JMsi-4HXXiG9y6KHbsh0rS1oY" };
    }
    if (/^3[47]/.test(trimmed)) {
      return { type: "amex", img: "https://cdtmcdxrdnauwehohxkh.supabase.co/storage/v1/object/sign/images/amex.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85N2VhODBjMy1hYjczLTRlMGYtYTVjZi01YWFiM2RlODFkNTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvYW1leC5zdmciLCJpYXQiOjE3NTgwMDkwMzIsImV4cCI6MjA3MzM2OTAzMn0.80XiB1XIeW7BtuTm34JMsi-4HXXiG9y6KHbsh0rS1oY" };
    }
    return null;
  };

  const cardType = detectCardType(formData.cardNumber);

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Cardholder name is required";
    }

    const cardNum = formData.cardNumber.replace(/\s/g, "");
    if (!/^\d{16}$/.test(cardNum)) {
      newErrors.cardNumber = "Enter a valid 16-digit card number";
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = "Enter a valid expiry (MM/YY)";
    }

    if (
      (cardType === "amex" && !/^\d{4}$/.test(formData.cvv)) ||
      (cardType !== "amex" && !/^\d{3}$/.test(formData.cvv))
    ) {
      newErrors.cvv = "Enter a valid CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const finalAmount = total * 1.1;
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    setFormData({ fullName: "", cardNumber: "", expiry: "", cvv: "" });
    setErrors({});
    setTouched({});
    setLoading(false);

    router.push(
      `/Cart/Receipt?status=success&amount=${finalAmount.toFixed(2)}`
    );
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setTouched({ ...touched, [field]: true });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-lg border border-gray-300 bg-white p-10 shadow-md space-y-6 text-gray-800"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Credit & Debit cards</h3>
        <div className="flex gap-2">
          <img
            src="https://cdtmcdxrdnauwehohxkh.supabase.co/storage/v1/object/sign/images/visa.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85N2VhODBjMy1hYjczLTRlMGYtYTVjZi01YWFiM2RlODFkNTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvdmlzYS5wbmciLCJpYXQiOjE3NTgwMDkwODAsImV4cCI6MjA3MzM2OTA4MH0.Egjk_a31yyts1a7KO5qBy8sdaSvjdKeRleuJe_57T_8"
            alt="Visa"
            className={`h-6 ${
              cardType === "visa" ? "opacity-100" : "opacity-40"
            }`}
          />
          <img
            src="https://cdtmcdxrdnauwehohxkh.supabase.co/storage/v1/object/sign/images/mastercard.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85N2VhODBjMy1hYjczLTRlMGYtYTVjZi01YWFiM2RlODFkNTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvbWFzdGVyY2FyZC5wbmciLCJpYXQiOjE3NTgwMDkwNDksImV4cCI6MjA3MzM2OTA0OX0.dokzChpkUJ-g9cNghnSQyiB9JrnS89718vYxkTN-lhk"
            alt="MasterCard"
            className={`h-6 ${
              cardType === "mastercard" ? "opacity-100" : "opacity-40"
            }`}
          />
          <img
            src="https://cdtmcdxrdnauwehohxkh.supabase.co/storage/v1/object/sign/images/amex.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85N2VhODBjMy1hYjczLTRlMGYtYTVjZi01YWFiM2RlODFkNTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvYW1leC5zdmciLCJpYXQiOjE3NTgwMDkwMzIsImV4cCI6MjA3MzM2OTAzMn0.80XiB1XIeW7BtuTm34JMsi-4HXXiG9y6KHbsh0rS1oY"
            alt="Amex"
            className={`h-6 ${
              cardType === "amex" ? "opacity-100" : "opacity-40"
            }`}
          />
        </div>
      </div>

      <div className="space-y-6 max-w-[800px]">
        {/* Cardholder Name */}
        <div>
          <label className="text-sm">Cardholder Name</label>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className={`mt-1 block w-full rounded-lg border p-2.5 text-sm ${
              touched.fullName && errors.fullName
                ? "border-red-500"
                : "border-gray-400 bg-gray-50"
            }`}
          />
          {touched.fullName && errors.fullName && (
            <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
          )}
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
                handleChange("cardNumber", val);
              }}
              className={`mt-1 block w-full rounded-lg border p-2.5 text-sm tracking-widest ${
                touched.cardNumber && errors.cardNumber
                  ? "border-red-500"
                  : "border-gray-400 bg-gray-50"
              }`}
            />
            {cardType && (
              <img
                src={cardType.img}
                alt={cardType.type}
                className="absolute right-3 top-1/2 -translate-y-1/2  w-8 h-5"
              />
            )}
          </div>
          {touched.cardNumber && errors.cardNumber && (
            <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>
          )}
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
                handleChange("expiry", val);
              }}
              className={`mt-1 block w-full rounded-lg border p-2.5 text-sm ${
                touched.expiry && errors.expiry
                  ? "border-red-500"
                  : "border-gray-400 bg-gray-50"
              }`}
            />
            {touched.expiry && errors.expiry && (
              <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>
            )}
          </div>
          <div>
            <label className="text-sm">CVV</label>
            <input
              type="password"
              placeholder="•••"
              value={formData.cvv}
              maxLength={4}
              onChange={(e) => handleChange("cvv", e.target.value)}
              className={`mt-1 block w-full rounded-lg border p-2.5 text-sm ${
                touched.cvv && errors.cvv
                  ? "border-red-500"
                  : "border-gray-400 bg-gray-50"
              }`}
            />
            {touched.cvv && errors.cvv && (
              <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>
            )}
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-center gap-2">
          <input type="checkbox" id="terms" className="mb-2" required />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I have read and accept the terms of use and privacy policy
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Processing..." : `Pay ₱${(total * 1.1).toFixed(2)}`}
        </button>
      </div>
    </form>
  );
}
