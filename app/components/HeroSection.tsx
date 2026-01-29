import Image from "next/image";

const HeroSection = () => {
  return (
    <>
      <section className="text-gray-600 body-font bg-gray-800">
        <div className="container mx-auto flex px-5 py-5 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <Image
              src="/homepage.png"
              className="object-cover object-center rounded"
              alt="hero"
              width={800}
            height={500}
            />
          </div>
          <div className="lg:grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-50">
              Logic Wear
              <br className="hidden lg:inline-block" />
              Where Logic Meets Style
            </h1>
            <p className="mb-8 leading-relaxed text-amber-50">
              {" "}
              Logic Wear blends cutting-edge technology with modern streetwear.
              Designed for thinkers, builders, and creators, our apparel
              represents intelligence, innovation, and individuality. Every
              piece combines premium comfort with futuristic design—so you don’t
              just wear clothes, you wear ideas. Built for the digital
              generation. Styled for real life.
            </p>
            <div className="flex justify-center">
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
