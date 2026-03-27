const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    //we always put the mongoose model name in reference(ref)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    //we always put the mongoose model name in reference(ref)
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
    },

    status: {
      type: String,
      default: "Order Placed",
      enum: ["Order Placed", "Out for delivery, Delivered , Canceled"],
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("order", OrderSchema);
module.exports = OrderModel;
