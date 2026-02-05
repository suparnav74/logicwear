
const ForgotPassword = () => {
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
            <h1 className="text-gray-900 text-3xl mt-10 font-medium">
              Forgot Password
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Please enter your email to reset password
            </p>
            <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg
                width="16"
                height="11"
                viewBox="0 0 16 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                  fill="#6B7280"
                />
              </svg>
              <input
                type="email"
                placeholder="Email id"
                className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-5 mb-11 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
