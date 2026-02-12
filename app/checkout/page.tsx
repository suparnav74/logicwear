"use client";

import Image from "next/image";
import { useState } from "react";
import { getCart, saveCart } from "@/utils/cart";
import Link from "next/link";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([...getCart()]);
  const [payment, setPayment] = useState("online");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  
 
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );

  const shipping = subtotal > 999 ? 0 : 49;
  const total = subtotal + shipping;

  const updateQuantity = (variantId: string, type: "inc" | "dec") => {
  const updatedCart = cartItems.map((item) => {
    if (item.variantId === variantId) {
      const newQty = type === "inc" ? item.qty + 1 : item.qty - 1;
      return { ...item, qty: newQty < 1 ? 1 : newQty };
    }
    return item;
  });

  setCartItems(updatedCart);
  saveCart(updatedCart); 
};
const handlePayment = async () => {
  const res = await fetch("/api/paytm/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "test@gmail.com",
      amount: 499,
    }),
  });

  const data = await res.json();

  const form = document.createElement("form");
  form.method = "POST";
  form.action =
    "https://securegw-stage.paytm.in/order/process";

  Object.keys(data.paytmParams).forEach((key) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = data.paytmParams[key];
    form.appendChild(input);
  });

  const checksumInput = document.createElement("input");
  checksumInput.type = "hidden";
  checksumInput.name = "CHECKSUMHASH";
  checksumInput.value = data.checksum;
  form.appendChild(checksumInput);

  document.body.appendChild(form);
  form.submit();
};



  return (
    <section className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-5 max-w-7xl">
        <h1 className="text-3xl font-semibold mb-8 text-black">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address */}
            <div className="bg-white p-6 rounded shadow text-black">
              <h2 className="text-lg font-semibold mb-4 ">Delivery Address</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  className="input border px-1 py-1 border-gray-400 rounded"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="input border px-1 py-1 border-gray-400 rounded"
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  className="input border px-1 py-1 border-gray-400 rounded"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="input border px-1 py-1 border-gray-400 rounded"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
                <input
                  className="input md:col-span-2 border px-1 py-1 border-gray-400 rounded"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input
                  className="input border px-1 py-1 border-gray-400 rounded"
                  placeholder="City" readOnly
                />
                <input
                  className="input border px-1 py-1 border-gray-400 rounded"
                  placeholder="State" readOnly
                />
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-lg font-semibold mb-4 text-black">
                Payment Method
              </h2>

              <div className="space-y-3 text-black">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={payment === "cod"}
                    onChange={() => setPayment("cod")}
                  />
                  Cash on Delivery
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={payment === "online"}
                    onChange={() => setPayment("online")}
                  />
                  UPI / Card / Net Banking
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white p-6 rounded shadow h-fit sticky top-20">
            <h2 className="text-lg font-semibold mb-4 text-black">
              Order Summary
            </h2>

            <div className="space-y-4 max-h-60 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.variantId} className="flex gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={80}
                    className="rounded"
                  />
                  <div className="flex-1 text-black">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.color} / {item.size}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.variantId, "dec")}
                        className="px-2 py-1 border rounded"
                      >
                        -
                      </button>

                      <span>{item.qty}</span>

                      <button
                        onClick={() => updateQuantity(item.variantId, "inc")}
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-sm mt-1">₹{item.price * item.qty}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4 space-y-2 text-black">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
            
              <button onClick={handlePayment} className="w-full mt-6 bg-gray-900 text-white py-3 rounded hover:bg-gray-800">
                Place Order
              </button>
              <Link href="/order" className="w-full mt-4 block text-center text-gray-700 hover:underline">
                View My Orders
              </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
