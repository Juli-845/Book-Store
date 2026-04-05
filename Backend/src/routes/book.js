const router = require("express").Router();
const verifyJWT = require("../middlewares/auth.middleware.js");
const {
  addBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getRecentBooks,
  getSpecificBook,
} = require("../controllers/book.controller.js");

//add-book --admin only
router.route("/add-book").post( addBook);

//update-book --admin only
router.route("/update-book").put(verifyJWT, updateBook);

//delete-book --admin only
router.route("/delete-book").delete(verifyJWT, deleteBook);

//get-all-books --public
router.route("/get-all-books").get( getAllBooks);

//get-recently-added-books --public
router.route("/get-recent-books").get( getRecentBooks);

//get-a-specific-book --public
router.route("/get-book-by-id/:book_id").get(verifyJWT, getSpecificBook);

module.exports = router;