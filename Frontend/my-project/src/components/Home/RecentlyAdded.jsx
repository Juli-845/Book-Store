import axios from "axios"
import { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

function RecentlyAdded() {  
    const [Book, setBook] = useState([]);     //rfce, rafce

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/v1/book/get-recent-books",
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
    }, []);

  return (
    <>
      <div className="mt-8 px-4">
        <div>
          <h1 className="font-bold text-2xl">NEW THIS WEEK</h1>
        </div>

        {Book.length === 0 && (
          <div className="flex items-center justify-center my-8">
            <Loader />
          </div>
        )}

        <div className=" bg-amber-100 my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Book &&
            Book.map((items, i) => (
              <div key={i}>
                <BookCard book={items} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default RecentlyAdded



