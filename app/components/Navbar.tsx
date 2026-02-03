"use client";
import Image from "next/image";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdCloseCircle  } from "react-icons/io";
import { FiPlusCircle,FiMinusCircle } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

const Navbar = () => {
  const [openCart, setOpenCart] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wear The Code",
      price: 400,
      qty: 1,
      image: "/tshirt.webp",
    },
  ]);
  // Increase quantity
  const increaseQty = (id:number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // Decrease quantity (min 1)
  const decreaseQty = (id:number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };
  // Remove item
  const removeItem = (id:number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  // Subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  return (
    <>
      {/* Navbar */}
      <header className="body-font bg-gray-950 shadow-md">
        <div className="mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <Image src="/logo.png" alt="logo" width={150} height={80} />
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link
              href={"/tshirts"}
              className="mr-5 hover:text-gray-400 text-amber-50"
            >
              Tshirts
            </Link>
            <Link
              href={"/hoodies"}
              className="mr-5 hover:text-gray-400 text-amber-50"
            >
              Hoodies
            </Link>
            <Link
              href={"/mugs"}
              className="mr-5 hover:text-gray-400 text-amber-50"
            >
              Mugs
            </Link>
            <Link
              href={"/stickers"}
              className="mr-5 hover:text-gray-400 text-amber-50"
            >
              Stickers
            </Link>
          </nav>
          <button
            onClick={() => setOpenCart(true)}
            className="inline-flex items-center text-amber-50 text-2xl border-0 py-1 px-3 focus:outline-none hover:text-gray-300 rounded mt-4 md:mt-0"
          >
            <FaCartShopping />
          </button>
        </div>
      </header>
      {/* Backdrop */}
      {openCart && (
        <div
          onClick={() => setOpenCart(false)}
          className="fixed inset-0 bg-opacity-50 z-40"
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300
        ${openCart ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-black">Your Cart</h2>
          <button onClick={() => setOpenCart(false)} className="text-2xl text-black">
            <IoMdCloseCircle />
          </button>
        </div>

        {/* Cart Items */}

        {/* Example Product */}
        {/* <div className="p-4 space-y-4 text-black">
          <div className="flex gap-4">
            <Image src="/tshirt.webp" alt="product" width={60} height={80} />
            <div>
              <h3 className="font-medium">Wear The Code</h3>
              <p className="text-sm text-gray-600">₹400</p>
              <p className="text-sm">Qty: 1</p>
            </div>
          </div>
        </div> */}
        <div className="p-4 space-y-4 overflow-y-auto h-[70%]">
          {cartItems.length === 0 && (
            <p className="text-center text-gray-500">Your cart is empty</p>
          )}

          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-6 border-b pb-4">
              <Image src={item.image} alt={item.name} width={60} height={80} />

              <div className="flex-1  text-black">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">₹{item.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 py-1 text-xl"
                  >
                   <FiMinusCircle/>
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-2 py-1 text-xl"
                  >
                  <FiPlusCircle/>
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-xl text-red-500 mt-2 mx-2"
                >
                  <MdDelete/>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-4 border-t">
          <p className="font-semibold mb-3 text-black">Subtotal: ₹{subtotal}</p>
          <Link
            href="/checkout"
            onClick={() => setOpenCart(false)}
            className="block text-center bg-gray-900 text-white py-2 rounded hover:bg-gray-800"
          >
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
