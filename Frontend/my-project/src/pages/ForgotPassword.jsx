import axios from "axios";
import { useState } from "react";

function ForgotPassword({ setModal }) {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/forgot-password", // your API endpoint
        { email },
      );

      console.log(response.data);
      setSuccessMsg("Reset link sent! Check your email.");

      // After success move to reset password screen
      setTimeout(() => setModal("resetpassword"), 2000);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong";
      setErrorMsg(msg);
    }
  };

  return (
    <div
      onClick={() => setModal(null)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-200 bg-opacity-70"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex bg-zinc-500 rounded-lg w-full h-140 md:h-170 m-100 text-center"
      >
        <div className="bg-green-700 w-[50%] h-170 hidden md:block">
          <h1 className="font-bold text-4xl mt-9 flex items-start p-7">
            Forgot Password?
          </h1>
          <p className="flex items-start p-5 text-2xl font-semibold">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        <div className="bg-amber-200 w-full md:w-[75%] lg:w-[50%] h-140 md:h-170 flex flex-col items-center justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b border-gray-800 text-black text-xl w-70 md:w-100 mb-3 p-2"
          />

          {errorMsg && (
            <p className="text-red-500 font-bold mt-2">{errorMsg}</p>
          )}
          {successMsg && (
            <p className="text-green-600 font-bold mt-2">{successMsg}</p>
          )}

          <div
            onClick={handleForgotPassword}
            className="font-bold mt-6 w-70 md:w-100 h-15 flex items-center justify-center p-3 bg-red-500 cursor-pointer"
          >
            Send Reset Link
          </div>

          <p className="text-zinc-600 mt-4 font-bold">
            Remember your password?{" "}
            <span
              onClick={() => setModal("signin")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
