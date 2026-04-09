import React from "react";

const Content = () => {
  return (
    <section className="body-font bg-gray-50">
      <div className="max-w-7xl px-5 py-16 mx-auto w-full">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Why Choose Logic Wear?</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            We don&apos;t just make clothes — we craft experiences for the digital generation.
          </p>
        </div>

        <div className="flex flex-wrap -m-4">

          {/* 1 */}
          <div className="xl:w-1/3 md:w-1/2 p-4">
            <div className="border border-blue-400 p-6 rounded-lg hover:shadow-md transition">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h2 className="text-lg text-blue-700 font-medium title-font mb-2">Premium Quality</h2>
              <p className="leading-relaxed text-base text-gray-600">
                Every piece is crafted from 100% ring-spun cotton — soft, durable, and built to last through your longest coding sessions.
              </p>
            </div>
          </div>

          {/* 2 */}
          <div className="xl:w-1/3 md:w-1/2 p-4">
            <div className="border border-blue-400 p-6 rounded-lg hover:shadow-md transition">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h2 className="text-lg text-blue-700 font-medium title-font mb-2">Tech-Inspired Designs</h2>
              <p className="leading-relaxed text-base text-gray-600">
                From binary art to circuit patterns — our designs speak the language of builders, developers, and digital creators.
              </p>
            </div>
          </div>

          {/* 3 */}
          <div className="xl:w-1/3 md:w-1/2 p-4">
            <div className="border border-blue-400 p-6 rounded-lg hover:shadow-md transition">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h2 className="text-lg text-blue-700 font-medium title-font mb-2">Made for Creators</h2>
              <p className="leading-relaxed text-base text-gray-600">
                Logic Wear is built for thinkers, makers, and innovators. Wear your passion — whether you&apos;re shipping code or shipping products.
              </p>
            </div>
          </div>

          {/* 4 */}
          <div className="xl:w-1/3 md:w-1/2 p-4">
            <div className="border border-blue-400 p-6 rounded-lg hover:shadow-md transition">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                </svg>
              </div>
              <h2 className="text-lg text-blue-700 font-medium title-font mb-2">Fast Shipping</h2>
              <p className="leading-relaxed text-base text-gray-600">
                Orders dispatched within 24 hours. Pan-India delivery in 3–5 business days — because waiting is not in a developer&apos;s vocabulary.
              </p>
            </div>
          </div>

          {/* 5 */}
          <div className="xl:w-1/3 md:w-1/2 p-4">
            <div className="border border-blue-400 p-6 rounded-lg hover:shadow-md transition">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                </svg>
              </div>
              <h2 className="text-lg text-blue-700 font-medium title-font mb-2">Dark Mode Friendly</h2>
              <p className="leading-relaxed text-base text-gray-600">
                Just like your IDE, our dark-themed apparel is easy on the eyes and impossible to ignore. Built for night owls who grind after midnight.
              </p>
            </div>
          </div>

          {/* 6 */}
          <div className="xl:w-1/3 md:w-1/2 p-4">
            <div className="border border-blue-400 p-6 rounded-lg hover:shadow-md transition">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                  <circle cx="6" cy="6" r="3"></circle>
                  <circle cx="6" cy="18" r="3"></circle>
                  <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                </svg>
              </div>
              <h2 className="text-lg text-blue-700 font-medium title-font mb-2">Easy Returns</h2>
              <p className="leading-relaxed text-base text-gray-600">
                Not satisfied? No worries. Our hassle-free 7-day return policy ensures you always get exactly what you ordered — or your money back.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Content;