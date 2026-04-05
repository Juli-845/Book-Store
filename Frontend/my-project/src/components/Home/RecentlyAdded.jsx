import axios from "axios"
import { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";

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
      <div>
        <div className="m-2 ">
          <h1 className="font-bold text-2xl">NEW THIS WEEK</h1>
        </div>
        <div className="bg-red-300 h-80 m-2">
          <div className=" my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Book &&
              Book.map((items, i) => (
                <div key={i}>
                  <BookCard book={items} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RecentlyAdded
