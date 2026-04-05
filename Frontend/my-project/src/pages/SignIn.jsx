import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignInButton({ setsigninmodal }) {

  const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

  const handlesignin = async () => {

    try{
      const response = await axios.post(
        "http://localhost:6000/api/v1/users/login",
        {email, username, password},
      );
      console.log(response.data);
      alert(response?.data?.message);
      navigate("/");
      

    }catch (error){
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong";

      setErrorMsg(msg);
      console.log(error.response?.data);
    }
  }

  return (
    <>
      {/* <div className="bg-amber-950 relative inline-block group"> */}
      <div
        onClick={() => setsigninmodal(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-200 bg-opacity-70"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex bg-zinc-200 rounded-lg w-full h-170 m-100 text-center"
        >
          <div className="bg-green-700 w-[50%] h-170">
            <h1 className="font-bold text-4xl mt-9 flex items-start p-7">
              Login
            </h1>
            <p className="flex items-start p-5 text-2xl font-semibold">
              Get access to your Orders, Wishlist and Cart
            </p>
          </div>
          <div className="bg-amber-200 w-[50%] h-170">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="m-14 border-b border-gray-800 text-black text-xl w-100 mb-3 p-2"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="m-14 border-b border-gray-800 text-black text-xl w-100 mb-3 p-2"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="m-14 border-b border-gray-800 text-black text-xl w-100 mb-3 p-2"
            />
            {errorMsg && <p className="text-red-500 font-bold">{errorMsg}</p>}

            <div
              onClick={handlesignin}
              className="font-bold m-20 w-100 h-20 flex items-center justify-center
               p-3 bg-red-500"
            >
              Sign In
            </div>
            <h3 className="text-zinc-600 mt-30 font-bold">
              New to BookStore?
              <Link to={"/signup"}> Create an account</Link>
            </h3>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default SignInButton;
