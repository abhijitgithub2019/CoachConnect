"use client";
import Image from "next/image";
import { useState } from "react";

export default function PaymentOptions({ userId, instructorId }) {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(1200);
  const [qrCodeUrl, setQrCodeUrl] = useState(null); // 🆕 Add state for dynamic QR

  const handlePhonePePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/createPayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1200, userId: "abc123" }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.url) {
        // 🧠 Option 1: Show dynamic QR code
        // setQrCodeUrl(
        //   `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        //     data.url
        //   )}&size=200x200`
        // );

        // 🧠 Option 2: (if you want to redirect automatically)
        window.location.href = data.url;
      } else {
        alert("Payment initialization failed");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error creating payment order");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-center">
        Choose Payment Method
      </h2>

      <div className="flex flex-col gap-4">
        {/* Card Option */}
        <button
          onClick={() => {
            setSelected("card");
            setQrCodeUrl(null);
          }}
          className={`flex items-center space-x-4 p-4 border rounded-lg cursor-pointer ${
            selected === "card"
              ? "border-blue-600 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
        >
          💳 <span className="text-lg font-medium">Credit / Debit Card</span>
        </button>

        {/* QR / UPI Option */}
        <button
          onClick={() => {
            setSelected("qr");
            setQrCodeUrl(null);
          }}
          className={`flex items-center space-x-4 p-4 border rounded-lg cursor-pointer ${
            selected === "qr"
              ? "border-green-600 bg-green-50"
              : "border-gray-300 hover:border-green-400"
          }`}
        >
          🧾 <span className="text-lg font-medium">QR / UPI (PhonePe, GPay)</span>
        </button>
      </div>

      {/* Payment Logic */}
      {selected && !qrCodeUrl && (
        <div className="mt-6 text-center">
          <button
            onClick={handlePhonePePayment}
            disabled={loading}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Continue to Payment"}
          </button>
        </div>
      )}

      {/* 🆕 Show QR code dynamically after API response */}
      {qrCodeUrl && (
        <div className="mt-8 text-center">
          <p className="text-green-700 font-semibold mb-3">
            Scan this QR to pay securely
          </p>
          <Image
            src={qrCodeUrl}
            alt="Dynamic UPI QR Code"
            width={200}
            height={200}
            className="mx-auto border rounded-lg"
          />
          <p className="text-gray-600 text-sm mt-2">
            Use PhonePe, Google Pay, or Paytm to complete your payment.
          </p>
          <div className="mt-4">
            <a
              href={qrCodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              Having trouble scanning? Open link directly
            </a>
          </div>

          <div className="mt-6">
            <button
              onClick={() => (window.location.href = qrCodeUrl)}
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Open in UPI App
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
