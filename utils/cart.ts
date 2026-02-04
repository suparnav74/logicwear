"use client";
export interface CartItem {
  variantId: string;
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  qty: number;
}

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const cart = localStorage.getItem("cart");
    if (!cart) return [];

    return JSON.parse(cart) as CartItem[];
  } catch (error) {
    console.error("Invalid cart data in localStorage. Resetting cart.", error);
    localStorage.removeItem("cart");
    return [];
  }
};

export const saveCart = (cart: CartItem[]): void => {
  console.log("Saving cart:", cart);
  
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const clearCartStorage = (): void => {
  localStorage.removeItem("cart");
};
