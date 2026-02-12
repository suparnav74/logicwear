import { IOrder } from "@/types/order";

export const fetchOrders = async (): Promise<IOrder[]> => {
  try {
    const res = await fetch("/api/order", {
      cache: "no-store",
    });

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching order:", error);
    return [];
  }
};

export const fetchOrderByOrderId = async (order_id: string) => {
  const res = await fetch(`/api/order/${order_id}`);
  const data = await res.json();
  return data;
}