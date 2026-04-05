import axios from "axios"
import { useEffect, useState } from "react";
import BookCard from "../components/./BookCard/BookCard";

function AllCollections() {  
    const [Book, setBook] = useState([]);     //rfce, rafce

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/v1/book/get-all-books",
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
          <h1 className="font-bold text-2xl">OUR ALL COLLECTIONS</h1>
        </div>

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

export default AllCollections;
