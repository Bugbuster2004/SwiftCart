const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cartItems: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cartitem",
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
    defualt: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    defualt: 0,
  },
  totalDiscountedPrice: {
    type: Number,
    required: true,
    defualt: 0,
  },
  discount: {
    type: Number,
    required: true,
  },
});
const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
