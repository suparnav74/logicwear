"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { fetchProducts } from "@/services/productService";

const Hoodies = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const loadProducts = async () => {
      const allProducts = await fetchProducts();
      const hoodies = allProducts.filter((item) => item.category === "hoodies");
      setProducts(hoodies);
    };
    loadProducts();
  }, []);
  const minPrice = Math.min(...products.flatMap(p => p.variants).map(v => v.price));
  return (
    <div>
      <section className="text-gray-600 body-font bg-white">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap text-center items-center -m-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="lg:w-1/4 md:w-1/2 p-6 w-full shadow-md"
              >
                <Link href={`/products/${product.slug}`}>
                  <Image
                    alt={product.title}
                    // src={product.image}
                    src="/hoodies.jpg"
                    width={300}
                    height={400}
                    className="inline-block w-full h-auto object-contain"
                    loading="eager"
                  />

                  <div className="mt-4 text-center">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      HOODIES
                    </h3>

                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {product.title}
                    </h2>
                     <p className="mt-1">₹{minPrice}</p>
                    {/* <div className="mt-1 space-y-2">
                      <div className="flex flex-wrap">
                        {product.variants.map((variant) => (
                          <div
                            key={variant.sku}
                            className="flex items-center px-1 py-1 rounded"
                          >
                            <span
                              className="w-6 h-6 rounded-full border"
                              style={{
                                backgroundColor: variant.color.toLowerCase(),
                              }}
                            ></span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {product.variants.map((variant) => (
                          <div
                            key={variant.sku}
                            className="flex items-center gap-2 border px-2 py-1 rounded"
                          >
                            <span className="text-xs">{variant.size}</span>
                          </div>
                        ))}
                      </div>
                    </div> */}
                    {/* <p className="mt-1">₹{product.price}</p>
                    <p className="mt-1">{product.size}</p> */}
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

export default Hoodies;
