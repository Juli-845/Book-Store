const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    // address: {
    //   type: String,
    //   required: true,
    // },

    avatar: {
      type: String,
      default:
        "https://pngtree.com/freepng/character-default-avatar_5407167.html",
    },

    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },

    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books",
      },
    ],

    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books",
      },
    ],

    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
      },
    ],

    refreshToken: {
      type: String,
      required: false,
    },

    resetToken: {
      type: String,
    },

    resetTokenExpiry: {
      type: Date,
      // default: Date.now,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
