import { Link } from "react-router-dom";
function BookCard ({book}) {
    console.log(book);
   return (
     <>
       <Link>{book.title}</Link>
     </>
   );
   
}

export default BookCard
