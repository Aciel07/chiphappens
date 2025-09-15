"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CustomerForm from "@/components/customer-form";
import CartSummary from "@/components/cart-summary";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen w-full flex flex-col">
        <div className="flex flex-col lg:flex-row pb-10">
          <div className="w-full lg:w-3/4 space-y-6">
            <CustomerForm />
          </div>

          <div className="w-full lg:w-1/4 space-y-6 p-6">
            <CartSummary />
            <section className="bg-white p-6 rounded-2xl w-full border border-amber-200 shadow-md">
              <h4 className="font-extrabold text-amber-600 text-base mb-3">
                Reminder:
              </h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                <li>Order is processed once payment is verified.</li>
                <li>
                  Send your proof of payment to{" "}
                  <a
                    href="mailto:support@chiphappens.com"
                    className="text-amber-600 font-medium hover:underline"
                  >
                    support@chiphappens.com
                  </a>
                  .
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
