import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignInButton({ setModal }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handlesignin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        { email, username, password },
      );
      console.log(response.data);
      alert(response?.data?.message);

      setModal(null);

    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong";

      setErrorMsg(msg);
      console.log(error.response?.data);
    }
  };

  return (
    <>
      {/* <div className="bg-amber-950 relative inline-block group"> */}
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
              Login
            </h1>
            <p className="flex items-start p-5 text-2xl font-semibold">
              Get access to your Orders, Wishlist and Cart
            </p>
          </div>
          <div className="bg-amber-200 w-full md:w-[75%] lg:w-[50%] h-140 md:h-170">
            {/* <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="m-14 border-b border-gray-800 text-black text-xl w-70 md:w-100 mb-3 p-2"
            /> */}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="m-14 border-b border-gray-800 text-black text-xl w-70 md:w-100 mb-3 p-2"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="m-14 border-b border-gray-800 text-black text-xl w-70 md:w-100 mb-3 p-2"
            />
            {errorMsg && <p className="text-red-500 font-bold">{errorMsg}</p>}

            {/* <p className=" pl-38 md:pl-48 mt-15 font-semibold md:text-xl text-black">
              Forgot Password?
            </p> */}

            <div
              onClick={handlesignin}
              className="font-bold  mb-3 mt-2 ml-15 w-70 md:w-100 h-15 md:h-20 flex items-center justify-center
                p-3 bg-red-500"
            >
              Sign In
            </div>

            <p className="text-zinc-600 mt-2 font-bold">
              <span
                onClick={() => setModal("forgot")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Forgot Password?
              </span>
            </p> 

            <h3 className="text-zinc-600 md:mt-25 font-bold">
              New to BookStore?
              <span
                onClick={() => setModal("signup")}
                className="text-blue-600  cursor-pointer"
              >
                Create an account
              </span>
            </h3>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default SignInButton;
