const asyncHandler = require("../utility/asyncHandler.js");
const UserSchema = require("../models/user.js");
const ApiError = require("../utility/ApiError.js");
const ApiResponse = require("../utility/ApiResponse.js");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
// const app = require("../app.js");
const jwt = require("jsonwebtoken");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USSER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await UserSchema.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

// REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in User.db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { username, email, password } = req.body;

  // Validate input fields
  if (!username || !email || !password ) {
    throw new ApiError(400, "All fields are required");
    //   return res.status(400).json({ message: "All fields are required" });
  }

  // Check username length is more than 4
  if (username.length <= 4) {
    throw new ApiError(400, "Username length should be greater than 4");
    //   return res
    //     .status(400)
    //     .json({ message: "Username length should be greater than 4" });
  }

  // Check username already exists ?
  const user = await UserSchema.findOne({
    $or: [{ username }, { email }],
  });
  if (user) {
    throw new ApiError(409, "User with username and email already exists");
    //   return res.status(400).json({ message: "Username already exists" });
  }

  // Check email already exists ?
  // const existingEmail = await User.findOne({ email: email });
  // if (existingEmail) {
  //     throw new ApiError(400, "This email already exists");
  //   return res.status(400).json({ message: "This email already exists" });
  // }
  // Check password's length
  if (password.length <= 5) {
    throw new ApiError(400, "Password's length should be greater than 5");
    //   return res
    //     .status(400)
    //     .json({ message: "Password's length should be greater than 5" });
  }
  // const hashPass = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new UserSchema({
    username: username.toLowerCase(),
    email,
    password,
   
  });
  await newUser.save();

  // const createdUser = await UserSchema.findById(newUser._id).select(
  //   "-password -refreshToken"
  // );

  const createdUser = await UserSchema.findById(newUser._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

// LOGIN USER
const loginUser = asyncHandler(async (req, res) => {
  // req body -> data
  // username or email
  // find the user
  // password check
  //access and refresh token
  // send cookie
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "username or password is required");
  }

  const user = await UserSchema.findOne({email });
  if (!user) {
    throw new ApiError(404, "Invalid user credentials");
    // return res.status(400).json({ message: "Invalid Credentials" });
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await UserSchema.findById(user._id).select(
    "-password -refreshToken -email"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  console.log("user login");
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );

    console.log("req.cookies", req.cookies);
});

const logoutUser = asyncHandler(async (req, res) => {

  const User = await UserSchema.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: null,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  
  console.log("user logout");
  console.log("cookies", req.cookies);
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, User, "User logged Out"));
    
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const existinguser = await UserSchema.findById(decodedToken?._id);

    if (!existinguser) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== existinguser?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(existinguser._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

//Forgot Password
const transporter = nodemailer.createTransport({
  service: "gmail",
  // port: 587,
  // secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserSchema.findOne({ email });

    if (!user) {
      return res.status(400).json(new ApiResponse(404, "user not found"));
    }

    const token = crypto.randomBytes(32).toString("hex");
    console.log("token:", token);
    user.resetToken = crypto.createHash("sha256").update(token).digest("hex");
    user.resetTokenExpiry = Date.now() + 3600000; // token valid for 1 hour
    await user.save();
    console.log("user save successfully");

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    await transporter.sendMail({
      to: email,
      subject: "Password Reset",
      html: `<p>Click ${resetUrl}to reset your password. This link will expire in 1 hour.</p>`,
    });

    res
      .status(201)
      .json(
        new ApiResponse(200, user, "Password reset link sent to your email"),
      );
  } catch (error) {
    console.log("FULL ERROR:", error); // ← add this
    throw new ApiError(500, error.message); // ← show real message
  }
  
  // catch (error) {
  //   throw new ApiError(500, "Internal server error");
  // }
});

//Reset Password 
// const resetPassword = asyncHandler(async(req, res) => {
//   const { token } = req.params;
//   const { newpassword } = req.body;

//   try {
//     const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

//     const user = await UserSchema.findOne({
//       resetToken: hashedToken, resetTokenExpiry: { $gt: Date.now() },
//     });
  
//     if (!user) {
//       return res.status(401).json(new ApiResponse(400, "Invalid or expired token"));
//     }
  
//     user.newpassword = await bcrypt.hash(newpassword, 10);
//     user.resetToken = undefined;
//     user.resetTokenExpiry = undefined;
    
//     await user.save();
//     console.log("password reset successfully");
//     res.status(201).json(new ApiResponse(200, user, "Password reset successfully"));
//   } catch (error) {
//     throw new ApiError(500, "Internal server error");
//   }
// })

const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params; // ← from URL
  const { newPassword } = req.body; // ← camelCase, from body

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await UserSchema.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(401)
        .json(new ApiResponse(400, "Invalid or expired token"));
    }

    // FIX: save to "password" field, not "newpassword"
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();
    console.log("Password reset successfully");

    res
      .status(200)
      .json(new ApiResponse(200, {}, "Password reset successfully"));
  } catch (error) {
    console.log("Reset password error:", error);
    throw new ApiError(500, "Internal server error");
  }
});

const getUserInformation = asyncHandler(async(req, res) => {
  try {
    const {_id} = req.headers;
    const value = req.cookies.accessToken || req.body.accessToken;
    console.log("juli...", value);

    const data = await UserSchema.findById(_id).select(
      "-password -refreshToken"
    );
    
    if (!data) {
      throw new ApiError(404, "User not found");
    }

    return res
    .status(200)
    .json(new ApiResponse (200, data, "User information fetched successfully"))
    
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }
})

const updateUserAddress = asyncHandler(async(req, res) => {
  try {
    const {_id} = req.headers;
    const {address} = req.body;
    const updatedData = await UserSchema.findByIdAndUpdate(_id, {address})
    return res.status(200).json(new ApiResponse (200, updatedData, "User information updated successfully"))
    
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }
})

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
  getUserInformation,
  updateUserAddress
};
