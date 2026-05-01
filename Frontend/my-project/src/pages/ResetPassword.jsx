import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams(); // ← token comes from URL automatically
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    // Frontend validation
    if (!newPassword || !confirmPassword) {
      setErrorMsg("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      const response = await axios.post(
        `http://localhost:8000/api/v1/users/reset-password/${token}`, // ← token in URL
        { newPassword }, // ← only newPassword in body
      );

      console.log(response.data);
      setSuccessMsg("Password reset successfully! Redirecting to home...");

      // Redirect to home after 2 seconds
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-200 bg-opacity-70">
      <div className="flex bg-zinc-500 rounded-lg w-full h-140 md:h-170 m-100 text-center">
        {/* Left Panel */}
        <div className="bg-green-700 w-[50%] h-170 hidden md:block">
          <h1 className="font-bold text-4xl mt-9 flex items-start p-7">
            Reset Password
          </h1>
          <p className="flex items-start p-5 text-2xl font-semibold">
            Enter your new password below to reset your account password
          </p>
        </div>

        {/* Right Panel */}
        <div className="bg-amber-200 w-full md:w-[75%] lg:w-[50%] h-140 md:h-170 flex flex-col items-center justify-center">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border-b border-gray-800 text-black text-xl w-70 md:w-100 mb-5 p-2"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-b border-gray-800 text-black text-xl w-70 md:w-100 mb-5 p-2"
          />

          {errorMsg && (
            <p className="text-red-500 font-bold mb-3">{errorMsg}</p>
          )}
          {successMsg && (
            <p className="text-green-600 font-bold mb-3">{successMsg}</p>
          )}

          <div
            onClick={handleResetPassword}
            className={`font-bold mt-4 w-70 md:w-100 h-15 flex items-center justify-center p-3 cursor-pointer
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500"}`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </div>

          <p className="text-zinc-600 mt-6 font-bold">
            Remember your password?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Go to Home
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
