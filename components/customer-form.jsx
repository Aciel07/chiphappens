"use client";

import { useState, useRef, useEffect } from "react";
import CardPayment from "@/components/card-payment";

export default function CustomerForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    payment_method: "",
  });

  const [errors, setErrors] = useState({});
  const [formCompleted, setFormCompleted] = useState(false);

  const paymentRef = useRef(null);

  useEffect(() => {
    if (formCompleted && paymentRef.current) {
      paymentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [formCompleted]);

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      setFormCompleted(false);
      return;
    }

    console.log("Form data:", formData);
    setFormCompleted(true);
  };

  return (
    <div className="mx-auto justify-items-center  ">
      <form onSubmit={handleSubmit} className="w-full p-10  max-w-[700px]">
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

          <button
            type="submit"
            className="mt-6 w-full bg-amber-600 text-white py-2 px-4 rounded-lg"
          >
            Save & Continue
          </button>
        </div>
      </form>
      {formCompleted && (
        <div ref={paymentRef}>
          <CardPayment />
        </div>
      )}
    </div>
  );
}
