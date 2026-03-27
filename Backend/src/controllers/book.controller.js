const asyncHandler = require("../utility/asyncHandler.js");
const ApiError = require("../utility/ApiError.js");
const ApiResponse = require("../utility/ApiResponse.js");
const Book = require("../models/book.js");
const User = require("../models/user.js");

// const jwt = require("jsonwebtoken");

//add book --admin only
const addBook = asyncHandler(async (req, res) => {
    try{
      const { _id } = req.headers;
      const user = await User.findById(_id)

      console.log("You are not having access01");
        if (user.role !== "admin") {
          throw new ApiError(
            400,
            "You are not having access to perform admin works"
          ); 
        }

      console.log("You are not having access02");
        const book = new Book({
          url: req.body.url,
          title: req.body.title,
          author: req.body.author,
          price: req.body.price,
          desc: req.body.desc,
          language: req.body.language,
        });
        await book.save();

        return res.status(201).json(new ApiResponse(200,"Book added successfully"));
    } catch (error) {
      throw new ApiError(500, "Something went wrong while adding book");
    }
});

//update book --admin only
const updateBook = asyncHandler(async (req, res) => {
  try {
    const { book_id } = req.headers;
    await Book.findByIdAndUpdate(book_id, {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Book updated successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while updating book");
  }
}); 

//delete book --admin only
const deleteBook = asyncHandler(async(req, res) => {
  try{
    const { book_id } = req.headers;
    await Book.findByIdAndDelete(book_id);
    return res.status(200).json(new ApiResponse(200, "Book deleted successfully"));

  }catch(error){
    throw new ApiError(500, "Something went wrong while deleting book");
  }
})

//get all books --public
const getAllBooks = asyncHandler(async(req, res) => {
  try {
    const books = await Book.find().sort({createdAt: -1});
    return res.status(200).json(new ApiResponse(200, books, "All books have fetched successfully!"))
  }catch(error){
    throw new ApiError(500, "Something went wrong while fetching books");
  }
})

//get recently added books --public
const getRecentBooks = asyncHandler(async(req, res) => {
  try {
    const books = await Book.find().sort({createdAt: -1}).limit(4);
    return res.status(200).json(new ApiResponse(200, books, "All books have fetched successfully!"))
  }catch(error){
    throw new ApiError(500, "Something went wrong while fetching books");
  }
})

//get a specific book --public
const getSpecificBook = asyncHandler(async(req, res) => {
  try {

//  In Express.js, req.params contains route parameters—these are variables 
// defined in the URL path of your API endpoint.

// ✅ Example of Route with Params
// Suppose your route is defined like this:

// router.get('/book/:book_id', getSpecificBook);

// Here, :book_id is a URL parameter. It’s a placeholder that will be replaced 
// by an actual value when a request is made.

// ✅ Example Request:
// GET /book/65f8c1b0c11a4c001f1d2e13
// Then, in your controller:

// const { book_id } = req.params;
// This means:

// book_id === '65f8c1b0c11a4c001f1d2e13'

    const {book_id } = req.params;
    const book = await Book.findById(book_id);
    return res.status(200).json(new ApiResponse(200, book, "book has fetched"))
  }catch(error){
    throw new ApiError(500, "Something went wrong while fetching books");
  }
})

module.exports = {
  addBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getRecentBooks,
  getSpecificBook,
};