import Image from "next/image";

const page = () => {
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
              <div className="flex mb-2border-t border-gray-200 py-2">
                <span className=" text-gray-900  py-1 text-lg px-1">Item</span>
                <span className="ml-auto  text-gray-900 py-1 text-lg px-1">
                  Quantity
                </span>
                <span className="ml-auto  text-gray-900 py-1 text-lg px-1">
                  Price
                </span>
              </div>

              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Tshirt Blue</span>
                <span className="ml-auto text-center text-gray-900">1</span>
                <span className="ml-auto text-gray-900">₹499</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Tshirt Black</span>
                <span className="ml-auto text-center text-gray-900">2</span>
                <span className="ml-auto text-gray-900">₹998</span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">Tshirt Red</span>
                <span className="ml-auto text-center text-gray-900">1</span>
                <span className="ml-auto text-gray-900">₹996</span>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Subtotal : ₹2493
                </span>
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Track
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

export default page;
