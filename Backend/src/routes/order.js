const router = require("express").Router();
const verifyJWT = require("../middlewares/auth.middleware.js");
// const book = require("../models/book");
// const order = require("../models/order");
const {
  toPlaceOrder,
  getOrderHistory,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/order.controller.js");


// place order
router.route("/place-order").post(verifyJWT, toPlaceOrder);

//get order history
router.route("/get-order-history").get(verifyJWT, getOrderHistory);

//get all orders -----admin only
router.route("/get-all-order").get(verifyJWT, getAllOrders);

//update ordre status ----admin
router.route("/update-order-status/:_id").put(verifyJWT, updateOrderStatus);
module.exports = router;