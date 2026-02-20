"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const handleReset = async () => {
    if (password === cpassword) {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      toast.success(data.message);
    } else {
      toast.error("Typed Password are not same.");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
            <h1 className="text-gray-900 text-3xl mt-10 font-medium">
              Reset Password
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Please enter your new password to reset
            </p>
            <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <input
                type="password"
                placeholder="New password"
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
                required
              />
            </div>
            <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <input
                type="password"
                placeholder="Confirm password"
                onChange={(e) => setCPassword(e.target.value)}
                className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
                required
              />
            </div>
            <button
              type="submit"
              onClick={handleReset}
              className="mt-5 mb-11 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
