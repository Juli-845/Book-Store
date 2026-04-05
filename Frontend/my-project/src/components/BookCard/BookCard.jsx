import { Link } from "react-router-dom";
function BookCard ({book}) {
    console.log(book);
   return (
     <>
       <Link to={`/view-book-details/${book._id}`}>
         <div className="bg-amber-700 rounded p-5 flex flex-col">
           <div className="bg-amber-500 flex items-center justify-center">
             <img src={book.url} alt="/" className="h-[30vh] " />
           </div>
           <h2 className="mt-4 text-zinc-200 font-semibold text-balance text-xl">{book.title}</h2>
           <p className="text-zinc-800 font-medium">By {book.author} </p>
           <p className="font-semibold"> ₹ {book.price} </p>
         </div>
       </Link>
     </>
   );
   
}

export default BookCard
