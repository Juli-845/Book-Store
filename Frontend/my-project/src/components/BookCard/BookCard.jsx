import { Link } from "react-router-dom";
function BookCard ({book}) {
    console.log(book);
   return (
     <>
       <Link>
         <div className="bg-amber-700 rounded p-4">
           <div className="bg-zinc-700"><img src={book.url} alt="/" className="h-[30vh] " /></div>
         </div>
       </Link>
     </>
   );
   
}

export default BookCard
