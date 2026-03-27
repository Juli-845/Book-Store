import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpButton({ setsignupmodal }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    // e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        { username, email, password },
      );

      console.log(response.data);
      alert(response?.data?.message);
      navigate("/login");
      
    } catch (error) {
        // const msg =
        //   error.response?.data?.message ||
        //   error.response?.data?.error ||
    

        alert(error.response?.data?.message);
        console.log(error.response?.data);
    }
  };

//   const handleSubmit = (e)=> {
//     e.preventDefault();
//     axios.post("http://localhost:3001/register", {email, password})
//     .then(result => {console.log(result)
//       navigate('/login')
//     })
//     .catch(err => console.log(err))

  return (
    <>
      {/* <div className="relative inline-block group"> */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-300 bg-opacity-70"
        onClick={() => setsignupmodal(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex bg-zinc-200 rounded-lg w-full h-170 m-100 text-center"
        >
          <div className="bg-green-700 w-[50%] h-170">
            <h1 className="font-bold text-5xl mt-9 flex items-start p-7">
              Looks like you're new here!
            </h1>
            <p className="flex items-start p-5 text-3xl font-semibold">
              Sign up with your mobile number to get started
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
              onClick={handleSignup}
              className="font-bold m-20 w-100 h-20 flex items-center justify-center
               p-3 bg-red-500"
            >
              Sign Up
            </div>
            <div>
              <h3 className="text-zinc-600 mt-30 font-bold">
                Existing User?
                <Link to={"/login"}>Log in</Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default SignUpButton;
