// components/PaymentOptions.js
"use client";
import Image from "next/image";
import { useState } from "react";

const qrCodeImageUrl =
  "https://api.qrserver.com/v1/create-qr-code/?data=upi://pay?pa=your-upi-id@bank&pn=Your+Name&amount=10&cu=INR&mode=02&purpose=00&orgid=123&msg=Payment&size=200x200";

export default function PaymentOptions() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-center">
        Choose Payment Method
      </h2>

      <div className="flex flex-col gap-4">
        {/* Card Payment Option */}
        <button
          onClick={() => setSelected("card")}
          className={`flex items-center space-x-4 p-4 border rounded-lg cursor-pointer 
            ${
              selected === "card"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 hover:border-blue-400"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <rect
              width="18"
              height="12"
              x="3"
              y="6"
              rx="2"
              ry="2"
              strokeWidth="2"
            />
            <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
          </svg>
          <span className="text-lg font-medium">Credit / Debit Card</span>
        </button>

        {/* QR Code / UPI Payment Option */}
        <button
          onClick={() => setSelected("qr")}
          className={`flex items-center space-x-4 p-4 border rounded-lg cursor-pointer
            ${
              selected === "qr"
                ? "border-green-600 bg-green-50"
                : "border-gray-300 hover:border-green-400"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <rect
              x="3"
              y="3"
              width="7"
              height="7"
              strokeWidth="2"
              rx="1"
              ry="1"
            />
            <rect
              x="14"
              y="3"
              width="7"
              height="7"
              strokeWidth="2"
              rx="1"
              ry="1"
            />
            <rect
              x="14"
              y="14"
              width="7"
              height="7"
              strokeWidth="2"
              rx="1"
              ry="1"
            />
            <rect
              x="3"
              y="14"
              width="4"
              height="4"
              strokeWidth="2"
              rx="1"
              ry="1"
            />
          </svg>
          <span className="text-lg font-medium">
            QR Code / UPI (PhonePe, Google Pay)
          </span>
        </button>
      </div>

      {/* Conditional Display */}
      {selected === "qr" && (
        <div className="mt-6 text-center">
          <p className="mb-2 font-semibold text-green-700">
            Scan the QR code to Pay
          </p>
          <Image
            src={qrCodeImageUrl}
            alt="UPI QR Code"
            className="mx-auto w-48 h-48 border rounded-lg"
            height={200}
            width={300}
          />
          <p className="text-sm mt-2 text-gray-600">
            Use PhonePe, Google Pay, or any UPI app to complete your payment.
          </p>
        </div>
      )}

      {selected === "card" && (
        <form className="space-y-4 mt-6">
          <input
            type="text"
            placeholder="Card Number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="MM/YY"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="CVV"
              className="w-20 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input
            type="text"
            placeholder="Cardholder Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Pay Now
          </button>
        </form>
      )}
    </div>
  );
}
