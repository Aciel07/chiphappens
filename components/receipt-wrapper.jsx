"use client";

import { Suspense } from "react";
import Receipt from "./Cart/Receipt";

export default function ReceiptWrapper() {
  return (
    <Suspense
      fallback={<div className="text-center py-10">Loading receipt...</div>}
    >
      <Receipt />
    </Suspense>
  );
}
