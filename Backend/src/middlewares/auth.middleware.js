const asyncHandler = require("../utility/asyncHandler.js");
const ApiError = require("../utility/ApiError.js");
const jwt = require("jsonwebtoken");
const UserSchema = require("../models/user.js");

const verifyJWT = asyncHandler(async (req, _, next) => {
  // we can take underscore in the place of res, req, next , if it is not being used
  try {
    const token = req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

      // req.cookies?.accessToken ||
    if (token == null) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await UserSchema.findById(decodedToken?._id).select(
      "-password"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Token expired. Please signIn again");
  }
});

module.exports = verifyJWT;
