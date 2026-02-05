import Image from "next/image";

const HeroSection = () => {
  return (
    <>
      <section className="text-gray-600 body-font bg-white">
        <div className="mx-auto flex items-center justify-center flex-col">
          <Image
            className="mb-10 object-cover object-center rounded w-full"
            width={2000}
            height={800}
            alt="hero"
            src="/home.png"
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Logic Wear
              <br className="hidden lg:inline-block" />
            </h1>
            <p className="sm:text-4xl mb-4 font-medium text-gray-900">
              Where Logic Meets Style
            </p>
            <p className="mb-8 leading-relaxed">
              Logic Wear blends cutting-edge technology with modern streetwear.
              Designed for thinkers, builders, and creators, our apparel
              represents intelligence, innovation, and individuality. Every
              piece combines premium comfort with futuristic design—so you don’t
              just wear clothes, you wear ideas. Built for the digital
              generation. Styled for real life.
            </p>
            <div className="flex justify-center mb-10">
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Button
              </button>
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                Button
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
