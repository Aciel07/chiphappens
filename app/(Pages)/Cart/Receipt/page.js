"use client";

import { useSearchParams } from "next/navigation";

export default function Receipt() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const amount = searchParams.get("amount");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      {status === "success" ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful</h1>
          <p className="text-lg text-gray-800">Amount Deducted: ${amount}</p>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
          <p className="text-lg text-gray-800">Please try again or use a different card.</p>
        </div>
      )}
    </div>
  );
}
