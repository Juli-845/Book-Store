const router = require("express").Router();
const verifyJWT = require("../middlewares/auth.middleware.js");
const {
  addBookToCart,
  removeBookFromCart,
  getBooksFromCart,
} = require("../controllers/cart.controller.js");

// add book to cart
router.route("/add-book-to-cart").put(verifyJWT, addBookToCart);

// remove book from cart
router
  .route("/remove-book-from-cart")
  .put(verifyJWT, removeBookFromCart);

// get books from cart
router.route("/get-book-from-cart").get(verifyJWT, getBooksFromCart);

module.exports = router;