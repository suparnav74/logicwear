import Link from "next/link";

const Signup = () => {
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
            <h1 className="text-gray-900 text-3xl mt-10 font-medium">
              Sign Up
            </h1>
            <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.125 13.125a4.375 4.375 0 0 1 8.75 0M10 4.375a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"
                  stroke="#6B7280"
                  strokeOpacity=".6"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
                type="text"
                placeholder="Username"
                required
              />
            </div>
            <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375"
                  stroke="#6B7280"
                  strokeOpacity=".6"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z"
                  stroke="#6B7280"
                  strokeOpacity=".6"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
              <input
                className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375"
                  stroke="#6B7280"
                  strokeOpacity=".6"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z"
                  stroke="#6B7280"
                  strokeOpacity=".6"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
              <input
                className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <button className="mt-5 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity">
              Create Account
            </button>
            <p className="text-gray-500 text-sm mt-3 mb-11">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 underline">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
