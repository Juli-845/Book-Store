const asyncHandler = require("../utility/asyncHandler.js");
const ApiError = require("../utility/ApiError.js");
const ApiResponse = require("../utility/ApiResponse.js");
const User = require("../models/user.js");

//add book to favourite
const addBookToFavourite = asyncHandler(async (req, res) => {
    try {
        const { book_id, _id } = req.headers;
        const userData = await User.findById(_id);
        const isBookinFavourite = userData.favourites.includes(book_id);
        if (isBookinFavourite) {
          return res
            .status(201)
            .json(
              new ApiResponse(200, userData, "Book already in favourite list")
            );
        }
        await User.findByIdAndUpdate(_id, {$push: {favourites: book_id}});
        return res
        .status(201)
        .json(new ApiResponse(200, userData, "Book added in favourites successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while adding book to favourite");
    }
})

// remove book from favourite
const removeBookFromFavourite = asyncHandler(async (req, res) => {
  try {
    const { book_id, _id } = req.headers;
    const userData = await User.findById(_id);
    const isBookFavourite = userData.favourites.includes(book_id);

    if (isBookFavourite) {
      await User.findByIdAndUpdate(_id, { $pull: { favourites: book_id } });
    }
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          userData,
          "Book remove from favourites successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while removing book from favourites"
    );
  }
});

// get Favourite books of a particular user
const getBooksFromFavourite = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.headers;

    // The populate("favourites") part tells Mongoose to replace the favourites field
    // (which contains IDs of books) with the actual book documents from the referenced Book collection.

    // populate("favourites") turns an array of ObjectIds into actual book documents—
    // so you can send real book data to the frontend, not just references.

    const userData = await User.findById(_id).populate("favourites");
    const favouriteBooks = userData.favourites;
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          favouriteBooks,
          "Books fetched from favourites successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while getting book from favourites"
    );
  }
});

module.exports = {
  addBookToFavourite,
  removeBookFromFavourite,
  getBooksFromFavourite,
};
