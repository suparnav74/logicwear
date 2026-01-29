import Image from "next/image";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
  return (
    <>
      <header className="body-font bg-gray-950 shadow-md">
        <div className="mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <Image src="/logo.png" alt="logo" width={150} height={80} />
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link href={"/tshirts"} className="mr-5 hover:text-gray-400 text-amber-50">Tshirts</Link>
            <Link href={"/"} className="mr-5 hover:text-gray-400 text-amber-50">Hoodies</Link>
            <Link href={"/"} className="mr-5 hover:text-gray-400 text-amber-50">Mugs</Link>
            <Link href={"/"} className="mr-5 hover:text-gray-400 text-amber-50">Stickers</Link>
          </nav>
          <button className="inline-flex items-center text-amber-50 text-2xl border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded mt-4 md:mt-0">
           <FaCartShopping />
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
