const asyncHandler = require("../utility/asyncHandler.js");
const ApiError = require("../utility/ApiError.js");
const ApiResponse = require("../utility/ApiResponse.js");
const User = require("../models/user.js");

//add book to cart
const addBookToCart = asyncHandler(async (req, res) => {
  try {
    const { book_id, _id } = req.headers;     // We can send book_id either through headers or through URL parameters(using req.params)
    const userData = await User.findById(_id);
    const isBookinCart = userData.cart.includes(book_id);    //Array includes()	Returns true if an element value is present in an array
    if (isBookinCart) {
      return res
        .status(201)
        .json(new ApiResponse(200, userData, "Book already in cart list"));
    }
    await User.findByIdAndUpdate(_id, { $push: { cart: book_id } });
    return res
      .status(201)
      .json(new ApiResponse(200, userData, "Book added in cart successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while adding book to cart"
    );
  }
});

// remove book from cart
const removeBookFromCart = asyncHandler(async (req, res) => {
  try {
    const { book_id, _id } = req.headers; // We can send book_id either through headers or through URL parameters(using req.params)
    const userData = await User.findById(_id);
    const isBookinCart = userData.cart.includes(book_id);

    if (isBookinCart) {
      await User.findByIdAndUpdate(_id, { $pull: { cart: book_id } });
    }
    return res
      .status(201)
      .json(
        new ApiResponse(200, userData, "Book remove from cart successfully")
      );
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while removing book from cart"
    );
  }
});

// get books of a particular user
const getBooksFromCart = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.headers;     // We can send _id either through headers or through URL parameters(using req.params)

    // The populate("cart") part tells Mongoose to replace the cart field
    // (which contains IDs of books) with the actual book documents from the referenced Book collection.

    // populate("cart") turns an array of ObjectIds into actual book documents—
    // so you can send real book data to the frontend, not just references.

    const userData = await User.findById(_id).populate("cart");
    const booksinCart = userData.cart;
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          booksinCart,
          "Books fetched from cart successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while getting book from cart"
    );
  }
});

module.exports = {
  addBookToCart,
  removeBookFromCart,
  getBooksFromCart,
};
