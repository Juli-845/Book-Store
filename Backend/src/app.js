const express = require("express");
const cors = require("cors");
const app = express();
const User = require("./routes/user.js");
const cookieParser = require("cookie-parser");
const Books = require("./routes/book.js");
const Favourite = require("./routes/favourite.js");
const Cart = require("./routes/cart.js");
const Order = require("./routes/order.js");

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    // credentials: true,
  }),
);


// routes
app.use("/api/v1/users", User);
app.use("/api/v1/book", Books);
app.use("/api/v1/favourite", Favourite);
app.use("/api/v1/cart", Cart);
app.use("/api/v1/order", Order);

module.exports = app;
