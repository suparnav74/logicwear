"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IOrder } from "@/types/order";

const STATUS_COLORS: Record<string, string> = {
  processing: "bg-blue-100 text-blue-700",
  shipped:    "bg-purple-100 text-purple-700",
  delivered:  "bg-green-100 text-green-700",
  cancelled:  "bg-red-100 text-red-600",
};

const PAYMENT_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  paid:    "bg-green-100 text-green-700",
  failed:  "bg-red-100 text-red-600",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await fetch("/api/order");
    const data = await res.json();
    setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => {
    const loadOrders = async () => {
      await fetchOrders();
    };
    loadOrders();
  }, []);

  // Update Order Status
  const updateOrderStatus = async (order_id: string, orderStatus: string) => {
    await fetch(`/api/order/${order_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderStatus }),
    });
    fetchOrders();
  };

  // Update Payment Status
  const updatePaymentStatus = async (order_id: string, paymentStatus: string) => {
    await fetch(`/api/order/${order_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentStatus }),
    });
    fetchOrders();
  };

  // Filtered Orders
  const filtered = orders.filter((o) => {
    const matchStatus  = statusFilter  === "all" || o.orderStatus   === statusFilter;
    const matchPayment = paymentFilter === "all" || o.paymentStatus === paymentFilter;
    const matchSearch  =
      o.userName.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search) ||
      (o.transactionId ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (o.orderId ?? "").toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchPayment && matchSearch;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <span className="text-sm text-gray-500">{orders.length} total orders</span>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, email, phone, transaction ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4 text-black"
      />

      {/* Order Status Filter */}
      <div className="flex gap-2 mb-3 flex-wrap">
        <span className="text-sm text-gray-500 self-center mr-1">Order:</span>
        {["all", "processing", "shipped", "delivered", "cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition
              ${statusFilter === s
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 border hover:bg-gray-100"}`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Payment Status Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <span className="text-sm text-gray-500 self-center mr-1">Payment:</span>
        {["all", "pending", "paid", "failed"].map((s) => (
          <button
            key={s}
            onClick={() => setPaymentFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition
              ${paymentFilter === s
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 border hover:bg-gray-100"}`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => {
            const id = String(order._id);
            return (
              <div key={id} className="bg-white rounded-lg shadow p-4">

                {/* ── Top Row ── */}
                <div className="flex flex-wrap justify-between gap-3">

                  {/* Left: Customer Info */}
                  <div>
                    <p className="font-semibold text-black">
                      Order #{(order.orderId ?? id).slice(-8).toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit", month: "short", year: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-gray-700 mt-1 font-medium">{order.userName}</p>
                    <p className="text-xs text-gray-500">{order.email}</p>
                    <p className="text-xs text-gray-500">{order.phone}</p>
                  </div>

                  {/* Right: Status Controls */}
                  <div className="flex flex-col gap-2 items-end">

                    {/* Order Status */}
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[order.orderStatus]}`}>
                        {order.orderStatus}
                      </span>
                      <select
                        value={order.orderStatus}
                        onChange={(e) => updateOrderStatus(id, e.target.value)}
                        className="border text-sm rounded p-1 text-black"
                      >
                        {["processing", "shipped", "delivered", "cancelled"].map((s) => (
                          <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                      </select>
                    </div>

                    {/* Payment Status */}
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${PAYMENT_COLORS[order.paymentStatus]}`}>
                        {order.paymentStatus}
                      </span>
                      <select
                        value={order.paymentStatus}
                        onChange={(e) => updatePaymentStatus(id, e.target.value)}
                        className="border text-sm rounded p-1 text-black"
                      >
                        {["pending", "paid", "failed"].map((s) => (
                          <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                      </select>
                    </div>

                    {/* Payment Method */}
                    <span className="text-xs text-gray-500 capitalize">
                      💳 {order.paymentMethod}
                    </span>
                  </div>
                </div>

                {/* ── Amount Row ── */}
                <div className="flex justify-between items-center mt-3 pt-3 border-t">
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>Subtotal: <strong className="text-black">₹{order.subtotal}</strong></span>
                    <span>Shipping: <strong className="text-black">₹{order.shippingFee}</strong></span>
                    <span>Total: <strong className="text-black text-base">₹{order.totalAmount}</strong></span>
                  </div>
                  <button
                    onClick={() => setExpandedId(expandedId === id ? null : id)}
                    className="text-blue-600 text-xs hover:underline"
                  >
                    {expandedId === id ? "Hide Details ▲" : "View Details ▼"}
                  </button>
                </div>

                {/* ── Expandable Details ── */}
                {expandedId === id && (
                  <div className="mt-4 border-t pt-4 space-y-4">

                    {/* Shipping Address */}
                    <div className="bg-gray-50 rounded p-3 text-sm text-gray-700">
                      <p className="font-semibold text-gray-800 mb-1">📍 Shipping Address</p>
                      <p>{order.address}</p>
                      <p>{order.city}, {order.state} — {order.pincode}</p>
                    </div>

                    {/* Transaction IDs */}
                    {(order.transactionId || order.orderId) && (
                      <div className="bg-gray-50 rounded p-3 text-xs text-gray-600 space-y-1">
                        {order.transactionId && (
                          <p>🔖 Transaction ID: <span className="font-mono text-gray-800">{order.transactionId}</span></p>
                        )}
                        {order.orderId && (
                          <p>🧾 Gateway Order ID: <span className="font-mono text-gray-800">{order.orderId}</span></p>
                        )}
                      </div>
                    )}

                    {/* Order Items */}
                    <div>
                      <p className="font-semibold text-gray-800 mb-2 text-sm">🛍️ Items</p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-black">
                          <thead>
                            <tr className="text-left text-gray-500 text-xs border-b">
                              <th className="pb-2">Image</th>
                              <th className="pb-2">Product</th>
                              <th className="pb-2">Size</th>
                              <th className="pb-2">Color</th>
                              <th className="pb-2">Qty</th>
                              <th className="pb-2">Price</th>
                              <th className="pb-2">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items.map((item, i) => (
                              <tr key={i} className="border-b last:border-0">
                                <td className="py-2">
                                  {item.image ? (
                                    <Image width={40} height={40}
                                      src={item.image} alt={item.title}
                                      className="w-10 h-10 object-cover rounded"
                                    />
                                  ) : (
                                    <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">
                                      N/A
                                    </div>
                                  )}
                                </td>
                                <td className="py-2">
                                  <p className="font-medium">{item.title}</p>
                                  <p className="text-xs text-gray-400">/{item.slug}</p>
                                </td>
                                <td className="py-2">{item.size}</td>
                                <td className="py-2">{item.color}</td>
                                <td className="py-2">{item.qty}</td>
                                <td className="py-2">₹{item.price}</td>
                                <td className="py-2 font-medium">₹{item.price * item.qty}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <p className="text-center text-gray-400 py-12">No orders found</p>
          )}
        </div>
      )}
    </div>
  );
}