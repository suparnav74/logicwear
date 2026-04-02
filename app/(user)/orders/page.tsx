"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IOrder } from "@/types/order";
import { fetchOrders } from "@/services/orderService";
import { formatDate } from "@/utils/dateformate";
import { getUserFromToken } from "@/utils/getUser";

const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const user = getUserFromToken();
  const email = user?.email;
  useEffect(() => {
    const loadOrders = async () => {
      const allOrders = await fetchOrders();
      const userOrders = allOrders.filter((item) => item.email === email);
      setOrders(userOrders);
    };
    loadOrders();
  }, [email]);
  return (
    <div className="min-h-screen bg-gray-100 text-black py-3">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        {orders.length === 0 && (
          <p className="text-gray-500">No orders found</p>
        )}

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <div>
                  <p className="font-semibold">Order ID: {order.orderId}</p>
                  <p className="text-sm text-gray-500">
                    
                    Date: {formatDate(order.createdAt)}
                    
                  </p>
                </div>

                <div className="flex gap-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>

                  <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <Image 
                      src={item.image}
                      alt="image"
                      width={60}
                      height={60}
                      className="rounded h-auto w-auto"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.qty} × ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-4 border-t pt-3">
                <p className="font-semibold">Total: ₹{order.totalAmount}</p>
                <Link href={`/order/${order.orderId}`}>
                <button className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-blue-600">
                  View Details
                </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
