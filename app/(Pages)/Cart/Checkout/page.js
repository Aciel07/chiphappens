import React from "react";
import Navbar from "@/components/navbar";
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

            <section className="bg-gray-50 text-gray-900 p-5 rounded-lg border border-gray-200 shadow-sm mt-4">
              <h4 className="font-semibold text-base mb-3">Reminder:</h4>
              <ul className="list-disc list-inside space-y-1.5 text-[13px] text-gray-700">
                <li>Order is processed once payment is verified.</li>
                <li>
                  Send your proof of payment to{" "}
                  <a
                    href="mailto:support@chiphappens.com"
                    className="text-amber-600 hover:underline"
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
    </>
  );
}
