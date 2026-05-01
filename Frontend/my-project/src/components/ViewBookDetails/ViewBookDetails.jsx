import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GrLanguage } from "react-icons/gr";
import { Link } from "react-router-dom";

const ViewBookDetails = () => {
    const { book_id } = useParams();
    const [Book, setBook] = useState(null); //rfce, rafce

    useEffect(() => {

         if (!book_id) return;

      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/v1/book/get-book-by-id/${book_id}`,
            // {
            //   withCredentials: true,
            // },
          );
          console.log(response.data);
          setBook(response.data.data); // adjust if needed
        } catch (error) {
          console.log("ERROR:", error);
        }
      };

      fetchData();
    }, [book_id]);

    // if (!Book) return (
    //   <div className="flex items-center justify-center">
    //     <Loader />
    //   </div>
    // );
    
    return (
      <>
        {Book && (
          <div className="px-3 lg:px-30 py-8 bg-red-900 flex md:flex-row flex-col gap-8 ">
            {/* {!Book && <Loader/>} */}

            <div className="bg-red-200 rounded lg:p-15 w-full lg:w-[30%] h-[60vh] lg:h-[80vh] flex items-center justify-center">
              <img className="h-[40vh] lg:h-[66vh] " src={Book.url} alt={Book.title} />
            </div>
            <div className=" lg:pl-10 w-full lg:w-[50%]">
              <h1 className="text-4xl text-zinc-300 font-semibold">
                {Book.title}
              </h1>
              <p className="text-zinc-400 mt-1">by {Book.author}</p>
              <p className="text-zinc-500 mt-4 text-xl">{Book.desc}</p>
              <p className="flex mt-4 items-center  text-zinc-400">
                <GrLanguage className="me-3" />
                {Book.language}
              </p>
              <p className="mt-4 text-zinc-100 text-3xl font-semibold">
                Price : ₹ {Book.price}
              </p>
              <div className="flex items-center justify-center gap-4 lg:gap-10 mt-30">
                <Link to="/cart" className="bg-yellow-600 px-8 py-3 rounded font-semibold">
                  Add to cart
                </Link>
                <button className="bg-yellow-600 px-8 py-3 rounded font-semibold ">
                  Buy at ₹{Book.price}
                </button>
              </div>
            </div>
          </div>
        )}
        {!Book && (
          <div className="h-screen bg-zinc-900 flex items-center justify-center">
            <Loader />
          </div>
        )}
      </>
    );
};

export default ViewBookDetails;