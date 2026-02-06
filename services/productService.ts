import { Product } from "@/types/product";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch("/api/products", {
      cache: "no-store",
    });

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchProductBySlug = async (slug: string) => {
  const res = await fetch(`/api/products/${slug}`);
  const data = await res.json();
  return data;
}
  