const router = require("express").Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getUserInformation,
  updateUserAddress,
  forgotPassword,
  resetPassword,
} = require("../controllers/user.controller.js");
const verifyJWT = require("../middlewares/auth.middleware.js");

// Register
router.route("/register").post(registerUser);

// Login
router.route("/login").post(loginUser);

// Logout
router.route("/logout").post(verifyJWT, logoutUser);

// Forgot Password
router.route("/forgot-password").post(forgotPassword);

// Reset Password
router.route("/reset-password/:token").post(resetPassword);

//RefreshToken
router.route("/refresh-token").post(refreshAccessToken);

//Get-User-Information
router.route("/get-user-information").get(verifyJWT, getUserInformation);

//Update-Address
router.route("/update-address").put(verifyJWT, updateUserAddress);





















// router.post("/register", async (req, res) => {
//   try {
//     const { username, email, password, address } = req.body;

//     // Validate input fields
//     if (!username || !email || !password || !address) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check username length is more than 5
//     if (username.length <= 4) {
//       return res
//         .status(400)
//         .json({ message: "Username length should be greater than 4" });
//     }

//     // Check username already exists ?
//     const existingUsername = await User.findOne({ username: username });
//     if (existingUsername) {
//       return res.status(400).json({ message: "Username already exists" });
//     }

//     // Check email already exists ?
//     const existingEmail = await User.findOne({ email: email });
//     if (existingEmail) {
//       return res.status(400).json({ message: "This email already exists" });
//     }

//     // Check password's length
//     if (password.length <= 5) {
//       return res
//         .status(400)
//         .json({ message: "Password's length should be greater than 5" });
//     }
//     const hashPass = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({
//       username: username,
//       email: email,
//       password: hashPass,
//       address: address,
//     });
//     await newUser.save();
//     return res.status(201).json({ message: "SignUp Successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// SignIn
// router.post("/sign-in", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const existingUser = await User.findOne({ username });
//     if (!existingUser) {
//       return res.status(400).json({ message: "Invalid Credentials" });
//     }

//     await bcrypt.compare(password, existingUser.password, (err, data) => {
//       if (data) {
//         const authClaims = [
//           { name: existingUser.username },
//           { role: existingUser.role },
//         ];
//         const token = jwt.sign({ authClaims }, "bookstore123", {
//           expiresIn: "30d",
//         });
//         res
//           .status(200)
//           .json({
//             id: existingUser._id,
//             role: existingUser.role,
//             token: token,
//           });
//       } else {
//         res.status(400).json({ message: "Invalid credentials" });
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

module.exports = router;
