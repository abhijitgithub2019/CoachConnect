"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const txnId = searchParams.get("transactionId");
    if (!txnId) return;

    fetch("/api/verifyPayment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ merchantTransactionId: txnId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) setStatus(`Payment ${data.status}`);
        else setStatus("Payment verification failed");
      })
      .catch(() => setStatus("Error verifying payment"));
  }, []);s

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Payment Result</h1>
      <p className="text-lg">{status}</p>
    </div>
  );
}
