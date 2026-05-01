import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AllCollections from "./pages/AllCollections"
import About from "./pages/About";
import Cart from "./pages/Cart";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword";

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allCollections" element={<AllCollections />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/view-book-details/:book_id"
            element={<ViewBookDetails />}
          />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App
