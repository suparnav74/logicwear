"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-4 rounded-full">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800">
          Payment Successful 🎉
        </h1>

        {/* Message */}
        <p className="text-gray-600 mt-2">
          Thank you for your order. Your order has been placed successfully.
        </p>

        {/* Order Info */}
        <div className="bg-gray-50 rounded-lg p-4 mt-4 text-sm text-gray-700">
          <p>We will start processing your order shortly.</p>
          <p>You will receive updates via email or phone.</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <Link
            href="/"
            className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>

          <Link
            href="/orders"
            className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
