"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { fetchOrderByOrderId } from "@/services/orderService";
import { IOrder } from "@/types/order";
import { formatDate } from "@/utils/dateformate";

const Order = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const params = useParams();
  const order_id = params.order_id as string;
  const [order, setOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    const loadOrder = async () => {
      const data = await fetchOrderByOrderId(order_id);
      setOrder(data);
      console.log("Fetched Order Data:", data);
    };
    if (order_id) loadOrder();
  }, [order_id]);

  if (!order)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden bg-white">
        <div className="container px-5 py-10 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                LOGIC WEAR
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                Animated Night Hill Illustrations
              </h1>
              <p className="leading-relaxed mb-4">
                Your Order has been placed successfully! We are processing it
                and will notify you once it&apos;s shipped. Thank you for
                shopping with Logic Wear.
              </p>
              <div className="mb-4 text-sm text-gray-600">
                <p>Order ID: {order.orderId}</p>
                <p>Date: {formatDate(order.createdAt)}</p>
                <p>Status: {order.orderStatus}</p>
              </div>
              <div className="flex mb-2border-t border-gray-200 py-2">
                <span className=" text-gray-900  py-1 text-lg px-1">Item</span>
                <span className="ml-auto  text-gray-900 py-1 text-lg px-1">
                  Quantity
                </span>
                <span className="ml-auto  text-gray-900 py-1 text-lg px-1">
                  Price
                </span>
              </div>
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex mb-2 border-t border-gray-200 py-2"
                >
                  <span className="text-gray-500">
                    {item.title} ({item.size} / {item.color})
                  </span>
                  <span className="ml-auto text-center text-gray-900">
                    {item.qty}
                  </span>
                  <span className="ml-auto text-gray-900">
                    ₹{item.price * item.qty}
                  </span>
                </div>
              ))}
              <div className="border-t  p-2 mt-2 shadow-sm bg-white">
                {/* Price Details */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between text-lg">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{order.subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{order.shippingFee}</span>
                  </div>

                  <div className="flex justify-between border-t pt-3 text-xl font-semibold">
                    <span>Total</span>
                    <span>₹{order.totalAmount}</span>
                  </div>
                </div>

               
              </div>
               {/* Track Button */}
                <div className="flex justify-end mt-5">
                  <button className="text-white bg-indigo-500 py-2 px-6 rounded hover:bg-indigo-600 transition">
                    Track Order
                  </button>
                </div>
            </div>
            <Image
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="/sticker.jpg"
              width={400}
              height={400}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Order;
