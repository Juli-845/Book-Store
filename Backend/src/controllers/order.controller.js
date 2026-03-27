const asyncHandler = require("../utility/asyncHandler.js");
const ApiError = require("../utility/ApiError.js");
const ApiResponse = require("../utility/ApiResponse.js");
const User = require("../models/user.js");
const book = require("../models/book.js");
const Order = require("../models/order.js");

//Place order
const toPlaceOrder = asyncHandler(async (req, res) => {
    try{
      const { _id } = req.headers;
      const { order } = req.body;
      // const userData = await User.findById(_id);

      if (!Array.isArray(order)) {
        throw new ApiError(400, "Order data is missing or invalid.");
      }

      for(const orderData of order) {
        console.log(orderData);
        const newOrder = new Order({ user: _id, book: orderData.book_id });
        const orderDataFromDb = await newOrder.save();

        //saving order in user model
        await User.findByIdAndUpdate(_id, {
          $push: { orders: orderDataFromDb._id },
        });

        //clear cart
        await User.findByIdAndUpdate(_id, {
          $pull: { cart: orderData._id },
        });
      }
      return res
        .status(201)
        .json(new ApiResponse(200, [], "Order placed successfully"));

    } catch (error) {
        console.log(error);
        throw new ApiError(
          500,
          "Something went wrong while placing order"
        );
    }
});


//get order history of particular user
const getOrderHistory = asyncHandler(async(req, res) => {
    try {
        const { _id } = req.headers;
        const userData = await User.findById(_id)
        .populate({
            path: "orders", populate: { path: "book" },
        })

        const orderData = userData.orders.reverse();
        return res
          .status(201)
          .json(new ApiResponse(200, orderData, "get order history successfully"));

    } catch (error) {
        console.log(error);
        throw new ApiError(
            500,
            "Something went wrong while getting user history"
        )
    }
})

//get all orders -----admin only
const getAllOrders = asyncHandler(async(req, res) => {
    try{
        const userData = await Order.find().populate({
            path: "book",
        })
        .populate({
            path: "user",
        }).sort({ createdAt: -1});

        return res
          .status(201)
          .json(
            new ApiResponse(200, userData, "get all orders successfully")
          );

    } catch (error) {
        console.log(error);
        throw new ApiError(
          500,
          "Something went wrong while getting orders"
        );
    }
})

//update order ----admin
const updateOrderStatus = asyncHandler(async(req, res) => {
    try{
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, { status: req.body.status });
        return res.status(201).json(new ApiResponse(200, "Status updated successfully"));
    } catch (error) {
        console.log(error);
        throw new ApiError(
          500,
          "Something went wrong while updating order status"
        );
    }
})
module.exports = {
  toPlaceOrder,
  getOrderHistory,
  getAllOrders,
  updateOrderStatus,
};