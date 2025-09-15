"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

export default function Receipt() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const status = searchParams.get("status");
  const amount = searchParams.get("amount");
  const orderNumber = `CH-${Date.now().toString().slice(-6)}`;

  const orderDate = new Date().toLocaleDateString();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 px-6 relative"
      style={{
        backgroundImage:
          "url('https://cdtmcdxrdnauwehohxkh.supabase.co/storage/v1/object/sign/images/background/cookie_bg.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85N2VhODBjMy1hYjczLTRlMGYtYTVjZi01YWFiM2RlODFkNTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvYmFja2dyb3VuZC9jb29raWVfYmcucG5nIiwiaWF0IjoxNzU3OTI0MTA1LCJleHAiOjIwNzMyODQxMDV9.rSHQwTB4MgdngJnnzzq4UPen8310TyAF7czuNHR4lVA')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white  border-4 border-amber-300 rounded-3xl shadow-xl p-10 max-w-lg w-full text-center relative"
        >
          <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4 drop-shadow-sm" />

          <h1 className="text-3xl font-extrabold text-amber-900 mb-2">
            Chip Happens
          </h1>
          <p className="text-gray-600 mb-6">Payment Successful 🎉</p>

          <div className="bg-gradient-to-r from-amber-100 to-amber-200 border border-amber-300 rounded-xl p-5 mb-8 text-sm text-amber-900 shadow-inner">
            <p>
              <span className="font-semibold">Order Number:</span>{" "}
              <span className="font-mono">{orderNumber}</span>
            </p>
            <p className="mt-2">
              Payment of{" "}
              <span className="font-bold text-amber-700">₱{amount}</span> as of{" "}
              <span className="font-bold text-amber-700">{orderDate}</span> has
              been processed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/Menu")}
              className="bg-amber-500 text-white px-6 py-2.5 rounded-full font-semibold shadow hover:bg-amber-600 hover:scale-105 transition-transform"
            >
              Browse More Cookies
            </button>
            <button
              onClick={() => router.push("/")}
              className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-full font-medium shadow-sm hover:bg-gray-100 hover:scale-105 transition-transform"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-b from-amber-50 to-amber-100 border border-red-200 rounded-3xl shadow-xl p-10 max-w-md w-full text-center"
        >
          <XCircle className="w-14 h-14 text-red-500 mx-auto mb-4 drop-shadow-sm" />
          <h1 className="text-3xl font-extrabold text-red-600 mb-2">
            Payment Failed
          </h1>
          <p className="text-gray-600 mb-6">
            Oops! Chip happens 😅 <br /> Please try again with a different
            payment method.
          </p>
          <button
            onClick={() => router.push("/Cart/Checkout")}
            className="bg-amber-500 text-white px-6 py-2.5 rounded-full font-semibold shadow hover:bg-amber-600 hover:scale-105 transition-transform"
          >
            Try Again
          </button>
        </motion.div>
      )}
    </div>
  );
}
