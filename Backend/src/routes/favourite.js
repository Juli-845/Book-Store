const router = require("express").Router();
const verifyJWT = require("../middlewares/auth.middleware.js");
// const User = require("../models/user.js");
const {
  addBookToFavourite,
  removeBookFromFavourite,
  getBooksFromFavourite,
} = require("../controllers/favourite.controller.js");

// add book to favourite
router.route("/add-book-to-favourite").put(verifyJWT, addBookToFavourite);

// remove book from favourite
router.route("/remove-book-from-favourite").put(verifyJWT, removeBookFromFavourite);

// get books from favourite
router
  .route("/get-book-from-favourite")
  .get(verifyJWT, getBooksFromFavourite);

module.exports = router;