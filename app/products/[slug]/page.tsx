"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getCart, saveCart } from "@/utils/cart";
import { useParams, useRouter } from "next/navigation";
import { Product, Variant } from "@/types/product";
import { fetchProductBySlug } from "@/services/productService";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const [pincode, setPincode] = useState("");
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    console.log("Fetching product with slug:", slug);
    const loadProduct = async () => {
      const data = await fetchProductBySlug(slug);
      setProduct(data);
      if (data?.variants?.length > 0) {
        setSelectedVariant(data.variants[0]);
      }
    }
    if (slug) loadProduct();
  }, [slug]);

  if (!product)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  const checkPincode = async () => {
    if (pincode.length !== 6) {
      setMessage("Enter valid 6 digit pincode");
      return;
    }

    setLoading(true);
    setMessage("");

    const res = await fetch("/api/check-delivery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pincode }),
    });

    const data = await res.json();

    if (data.serviceable) {
      setMessage("✅ Delivery available in your area");
    } else {
      setMessage("❌ Not deliverable to this location");
    }

    setLoading(false);
  };

  const addToCart = (product: Product, variant: Variant) => {
    let cart = getCart();

    const existingItem = cart.find((item) => item.variantId === variant.sku);
    if (existingItem) {
      const newQty = existingItem.qty + quantity;

      if (newQty > variant.availableQty) {
        toast.error("You cannot add more than available stock")
        //alert("You cannot add more than available stock");
        return;
      }

      cart = cart.map((item) =>
        item.variantId === variant.sku ? { ...item, qty: newQty } : item,
      );
    } else {
      if (quantity > variant.availableQty) {
        toast.error("Only limited stock available")
        //alert("Only limited stock available");
        return;
      }
      cart.push({
        variantId: variant.sku,
        id: product._id,
        name: product.title,
        price: variant.price,
        image: "/tshirt.webp",
        size: variant.size,
        color: variant.color,
        qty: quantity,
      });

      saveCart(cart);
      toast.success("✅ Product added to cart");
    }
  };

  const handleBuyNow = () => {
    if (!product || !selectedVariant) return;
    if (quantity > selectedVariant.availableQty) {
      toast.error("Only limited stock available");
      //alert("Only limited stock available");
      return;
    }

    const cart = [
      {
        variantId: selectedVariant.sku,
        id: product._id,
        name: product.title,
        price: selectedVariant.price,
        image: product.image,
        size: selectedVariant.size,
        color: selectedVariant.color,
        qty: 1,
      },
    ];

    saveCart(cart);
    router.push("/checkout");
  };

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden bg-white">
        <div className="container px-5 py-10 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <Image
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto  object-cover object-center rounded"
              // src="/sticker.jpg"
              src={product.image}
              width={400}
              height={400}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.category.toUpperCase()}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}
                {selectedVariant &&
                  ` ( ${selectedVariant.color} / ${selectedVariant.size} )`}
              </h1>
              {/* <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div> */}
              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {product.variants.map((variant) => (
                    <button
                      key={variant.sku}
                      onClick={() => setSelectedVariant(variant)}
                      className={`border-2 ml-1 rounded-full w-6 h-6 
                        ${selectedVariant?.sku === variant.sku ? "border-black scale-110" : "border-gray-300"}
                      `}
                      style={{ backgroundColor: variant.color.toLowerCase() }}
                    ></button>
                  ))}
                  {/* <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button> */}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  {/* <div className="relative">
                    <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div> */}
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.sku}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-3 py-1 border rounded text-sm
                        ${
                          selectedVariant?.sku === variant.sku
                            ? "bg-black text-white"
                            : "bg-white"
                        }
                      `}
                      >
                        {variant.size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-2 p-2 bg-gray-50">
                <h3 className="font-medium text-gray-900 mb-2">
                  Check Delivery Availability
                </h3>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter pincode"
                    className="w-auto border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-900"
                    maxLength={6}
                  />
                  <button
                    onClick={checkPincode}
                    className=" text-white bg-indigo-500 px-4 rounded hover:bg-indigo-600"
                  >
                    Check
                  </button>
                </div>
                {loading && <p className="text-sm mt-2">Checking...</p>}
                {message && (
                  <p
                    className={`mt-2 text-sm ${
                      message.includes("❌") ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3 mt-4">
                <span className="font-medium">Quantity:</span>

                <button
                  onClick={() =>
                    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                  className="px-3 py-1 border rounded"
                >
                  -
                </button>

                <span className="px-3">{quantity}</span>

                <button
                  onClick={() => {
                    if (!selectedVariant) return;

                    if (quantity < selectedVariant.availableQty) {
                      setQuantity((prev) => prev + 1);
                    } else {
                      alert("No more stock available");
                    }
                  }}
                  className="px-3 py-1 border rounded"
                >
                  +
                </button>

                {selectedVariant && (
                  <span className="text-sm text-gray-500">
                    ({selectedVariant.availableQty} Item Left)
                  </span>
                )}
              </div>

              <div className="flex mt-6">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ₹{selectedVariant?.price}
                </span>
                <button
                  onClick={handleBuyNow}
                  className="flex ml-7 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Buy Now
                </button>
                {selectedVariant?.availableQty === 0 ? (
                  <button disabled className="ml-4 bg-gray-400 px-6 py-2 text-white rounded cursor-not-allowed">
                    Out of Stock
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (!selectedVariant) return;
                      addToCart(product, selectedVariant);
                    }}
                    className="flex ml-4 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Add to Cart
                  </button>
                )}
                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
