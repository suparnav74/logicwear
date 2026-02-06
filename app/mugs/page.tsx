"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { fetchProducts } from "@/services/productService";

const Mugs = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const loadProducts = async () => {
      const allProducts = await fetchProducts();
      const hoodies = allProducts.filter((item) => item.category === "mugs");
      setProducts(hoodies);
    };
    loadProducts();
  }, []);
  return (
    <div>
      <section className="text-gray-600 body-font bg-white">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap text-center items-center -m-4">
            {products.map((product) => (
              <div
                key={product.productId}
                className="lg:w-1/4 md:w-1/2 p-6 w-full shadow-md"
              >
                <Link href={`/products/${product.slug}`}>
                  <Image
                    alt={product.title}
                    // src={product.image}
                    src="/mug.webp"
                    width={300}
                    height={400}
                    className="inline-block w-full h-auto object-contain"
                  />

                  <div className="mt-4 text-center">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      Mugs
                    </h3>

                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {product.title}
                    </h2>

                    <p className="mt-1">₹{product.price}</p>
                    {/* <p className="mt-1">{product.size}</p> */}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mugs;
