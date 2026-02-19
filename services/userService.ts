import { User } from "@/types/user";
import { getUserFromToken } from "@/utils/getUser";

export const fetchUserDetails = async (): Promise<User[]> => {
  try {
    const user = getUserFromToken();
    const email = user?.email;
    const res = await fetch(`/api/user/getUser?email=${email}`, {
      cache: "no-store",
    });

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching User Details:", error);
    return [];
  }
};

export const fetchOrderByOrderId = async (order_id: string) => {
  const res = await fetch(`/api/order/${order_id}`);
  const data = await res.json();
  return data;
}