import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react"

function Hero() {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className="relative w-full h-screen">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/clip_2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className=" absolute inset-0 bg-black/40 flex flex-col items-center justify-center z-10">
          <input
            className="md:hidden text-xl font-semibold rounded-2xl p-3 border-4 w-100 h-13 bg-amber-100 mb-20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="search products"
            onClick={(e) => navigate("/")}
          />
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to My Website
            </h1>
            <p className="text-lg md:text-2xl mb-6">
              This is some text written over the video background.
            </p>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow-lg">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* <div>
         
          <div>
            <div className="m-2 font-bold text-2xl">
              <h1>TOP TRENDING BOOKS</h1>
            </div>
            <div className="h-50 p-4 m-2 bg-amber-300"></div>
          </div>
        </div> */}
    </>
  );
}

export default Hero;
