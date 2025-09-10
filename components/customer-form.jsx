"use client";

import { useState } from "react";
import CardPayment from "@/components/card-payment";
import QRPayment from "@/components/qr-payment";

export default function CustomerForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    payment_method: "",
  });

  const [errors, setErrors] = useState({});

  const formatPhone = (value) => {
    let digits = value.replace(/\D/g, "");
    if (digits.startsWith("0")) digits = digits.slice(1);
    if (digits.startsWith("63")) digits = digits.slice(2);
    if (digits.startsWith("+63")) digits = digits.slice(3);
    if (!digits.startsWith("9")) digits = "9" + digits;

    const match = digits.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+63 ${match[1]} ${match[2]} ${match[3]}`;
    }
    return "+63 " + digits;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "contact_number") {
      setFormData({ ...formData, [name]: formatPhone(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email && !formData.contact_number) {
      newErrors.email = "Provide email or contact number";
      newErrors.contact_number = "Provide email or contact number";
    }

    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
    }

    if (formData.contact_number) {
      const phoneRegex = /^\+63 9\d{2} \d{3} \d{4}$/;
      if (!phoneRegex.test(formData.contact_number)) {
        newErrors.contact_number = "Invalid contact number format";
      }
    }

    if (!formData.payment_method) {
      newErrors.payment_method = "Please select a payment method";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Form data:", formData);
    // Later: send to Supabase or receipt page
  };

  return (
    <div className="mx-auto justify-items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[700px] p-10"
      >
        <h2 className="text-left font-bold text-2xl text-gray-800">
          Billing Details
        </h2>

        <div className="space-y-6 mt-10">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-sm text-black focus:border-gray-800 focus:ring-gray-800"
              />
            </div>
            <div>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-sm text-black focus:border-gray-800 focus:ring-gray-800"
              />
            </div>
          </div>

          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className={`block w-full rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-400"
              } bg-gray-50 p-2.5 text-sm text-black focus:border-gray-800 focus:ring-gray-800`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="contact_number">Contact Number</label>
            <input
              type="tel"
              id="contact_number"
              name="contact_number"
              value={formData.contact_number}
              onChange={(e) => {
                let digits = e.target.value.replace(/\D/g, "").slice(0, 12);
                let formatted = formatPhone(digits);
                setFormData({ ...formData, contact_number: formatted });
              }}
              placeholder="+63 9xx xxx xxxx"
              className={`block w-full rounded-lg border ${
                errors.contact_number ? "border-red-500" : "border-gray-400"
              } bg-gray-50 p-2.5 text-sm text-black focus:border-gray-800 focus:ring-gray-800`}
            />
            {errors.contact_number && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contact_number}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="payment_method">Payment Method</label>
            <select
              id="payment_method"
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
              className={`block w-full rounded-lg border ${
                errors.payment_method ? "border-red-500" : "border-gray-400"
              } bg-gray-50 p-2.5 text-sm text-black focus:border-gray-800 focus:ring-gray-800`}
            >
              <option value="">Select a payment method</option>
              <option value="credit_card">Credit Card / Debit Card</option>
              <option value="qr_payment">QR Payment</option>
            </select>
            {errors.payment_method && (
              <p className="text-red-500 text-sm mt-1">
                {errors.payment_method}
              </p>
            )}
          </div>
        </div>
      </form>

      <div className="w-full max-w-[700px] px-10 pb-10">
        {formData.payment_method === "credit_card" && <CardPayment />}
        {formData.payment_method === "qr_payment" && <QRPayment />}
      </div>
    </div>
  );
}
