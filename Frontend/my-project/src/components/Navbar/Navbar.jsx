import { BsChevronDown } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { HiOutlineCube } from "react-icons/hi";
import { MdOutlineSettings } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom"
import { TbBaselineDensityMedium } from "react-icons/tb";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineHome } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { BiCollection } from "react-icons/bi";
import SignInButton from "../../pages/SignIn";
import SignUpButton from "../../pages/SignUp";
import ForgotPassword from "../../pages/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword";


function Navbar() {

  const [modal, setModal] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(false);


  return (
    <>
      <nav className="relative bg-red-600 text-white px-8 py-7 flex justify-between items-center">
        <div className="flex justify-between w-45 ">
          <button onClick={() => setOpenSidebar(true)}>
            <TbBaselineDensityMedium className="md:hidden mt-0.5 hover:cursor-pointer text-2xl hover:scale-115 hover:bg-white/30" />
          </button>

          <Link
            to={"/"}
            className="hover:cursor-pointer  text-xl md:text-2xl font-semibold"
          >
            BookCollection
          </Link>
        </div>

        <div className="hidden md:flex justify-between w-96">
          <Link
            to={"/"}
            className=" hover:font-bold hover:border-2 hover:cursor-pointer rounded p-2"
          >
            Home
          </Link>
          <Link
            to={"/about"}
            className=" hover:cursor-pointer hover:font-bold hover:border-2 rounded p-2"
          >
            About Us
          </Link>
          <div className="relative inline-block group">
            <div className=" hover:cursor-pointer hover:font-bold flex justify-between w-[75px] hover:border-2 rounded p-2">
              Books
              <BsChevronDown />
            </div>

            <div className="absolute bg-zinc-100 rounded text-zinc-700 font-medium w-35 leading-8 top-[42px] shadow-lg shadow-zinc-400 hidden group-hover:block z-50">
              <div className="hover:bg-zinc-300 cursor-pointer px-4">
                Novels
              </div>
              <div className="hover:bg-zinc-300 cursor-pointer px-4">Jokes</div>
              <div className="hover:bg-zinc-300 cursor-pointer px-4">
                Mystery
              </div>
              <div className="hover:bg-zinc-300 cursor-pointer px-4">
                Adventure
              </div>
              <div className="hover:bg-zinc-300 cursor-pointer px-4">
                Historical
              </div>
              <div className="hover:bg-zinc-300 cursor-pointer px-4">
                Horror
              </div>
            </div>
          </div>

          <Link
            to={"/allCollections"}
            className=" hover:cursor-pointer hover:font-bold hover:border-2 rounded p-2"
          >
            All Collections
          </Link>
        </div>

        <div className="flex justify-between w-55">
          <div id="dropdownButton" className="relative inline-block group">
            <div className="relative inline-block group">
              {/* Sign In Button */}
              <div>
                <button
                  // onClick={() => setSignInModal(true)}
                  onClick={() => setModal("signin")}
                  className=" hover:font-bold px-4 py-2  text-white group-hover:opacity-100 flex hover:border-[1px] rounded p-0.5 hover:bg-blue-600 text-1.5xl"
                >
                  <CgProfile className="text-2xl mr-2 hover:scale-115" />
                  Login <BsChevronDown />
                </button>
              </div>

              <div className="absolute rounded w-70 bg-white text-zinc-700 leading-8 top-[40px] right-[0.1px] shadow-lg shadow-zinc-400 cursor-pointer p-4 hidden group-hover:block z-50">
                <div className="mb-2 flex justify-between">
                  <div className="font-semibold">New Customer?</div>
                  <button
                    // onClick={() => setSignUpModal(true)}
                    onClick={() => setModal("signup")}
                    className="font-bold"
                  >
                    SignUp
                  </button>
                </div>
                <hr />

                <div className="flex w-25 justify-between hover:text-blue-500 hover:font-bold cursor-pointer">
                  <CgProfile className="mt-2" />
                  My Profile
                </div>
                <div className="flex w-19 justify-between hover:text-blue-500 hover:font-bold cursor-pointer">
                  <HiOutlineCube className="mt-2" />
                  Orders
                </div>
                <div className="flex w-23 justify-between hover:text-blue-500 hover:font-bold cursor-pointer">
                  <FaRegHeart className="mt-2" />
                  Favourite
                </div>
                <div className="flex w-19 justify-between hover:text-blue-500 hover:font-bold cursor-pointer">
                  <MdOutlineSettings className="mt-2" />
                  Setting
                </div>
                <div className="flex w-22 justify-between hover:text-blue-500 hover:font-bold cursor-pointer">
                  <FiLogOut className="mt-2" />
                  Sign Out
                </div>
              </div>

              {/* Sign In Modal */}
              {modal === "signin" && <SignInButton setModal={setModal} />}

              {/* Sign Up Modal */}
              {modal === "signup" && <SignUpButton setModal={setModal} />}

              {/* ForgotPassword Modal */}
              {modal === "forgot" && <ForgotPassword setModal={setModal} />}

              {/* ResetPassword Modal */}
              {modal === "resetpassword" && (<ResetPassword setModal={setModal} />
              )}
            </div>
          </div>

          <Link to={"/cart"}>
            <HiOutlineShoppingCart className="hover:cursor-pointer text-2xl hover:scale-115" />
          </Link>
          <div>
            <FiSearch className="hidden md:flex hover:cursor-pointer text-2xl hover:scale-115" />
          </div>
        </div>
      </nav>

      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className=" fixed backdrop-blur-md top-0 left-0 h-screen w-full z-60 "
        >
          <div className="top-0 w-60 bg-white h-screen z-70 flex flex-col items-center justify-center text-xl">
            <Link
              to={"/"}
              className="flex hover:font-bold hover:cursor-pointer rounded p-2"
            >
              <MdOutlineHome />
              Home
            </Link>
            <Link
              to={"/about"}
              className=" flex hover:cursor-pointer hover:font-bold  rounded p-2"
            >
              <FcAbout />
              About Us
            </Link>
            <Link
              to={"/allCollections"}
              className=" flex hover:cursor-pointer hover:font-bold rounded p-2"
            >
              <BiCollection />
              All Collections
            </Link>
            <div className="relative inline-block group">
              <div className=" hover:cursor-pointer hover:font-bold flex justify-between w-[90px] rounded p-2">
                <IoBookOutline />
                Books
              </div>

              <div className="absolute bg-zinc-100 rounded text-zinc-700 font-medium w-35 leading-8 top-[45px] shadow-lg shadow-zinc-400 hidden group-hover:block z-50">
                <div className="hover:bg-zinc-300 cursor-pointer px-4">
                  Novels
                </div>
                <div className="hover:bg-zinc-300 cursor-pointer px-4">
                  Jokes
                </div>
                <div className="hover:bg-zinc-300 cursor-pointer px-4">
                  Mystery
                </div>
                <div className="hover:bg-zinc-300 cursor-pointer px-4">
                  Adventure
                </div>
                <div className="hover:bg-zinc-300 cursor-pointer px-4">
                  Historical
                </div>
                <div className="hover:bg-zinc-300 cursor-pointer px-4">
                  Horror
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
