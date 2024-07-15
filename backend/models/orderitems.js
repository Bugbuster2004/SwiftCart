const mongoose = require("mongoose");

const OrderItemsSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.type.ObjectId,
    ref: "User",
    required: true,
  },
  discountedprice: {
    type: Number,
    required: true,
  },
});

const Orderitems = mongoose.model("orderitem", OrderItemsSchema);
module.exports = Orderitems;
