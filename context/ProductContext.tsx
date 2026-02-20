"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types/product";
import { fetchProducts } from "@/services/productService";

interface ProductContextType {
  products: Product[];
}

const ProductContext = createContext<ProductContextType>({products:[]});

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const allProducts = await fetchProducts();
      setProducts(allProducts);
    };
    loadProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
