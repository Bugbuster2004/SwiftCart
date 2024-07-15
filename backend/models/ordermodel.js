const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderitem",
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now(),
  },
  deliveryDate: {
    type: Date,
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "address",
  },
  paymentInfo: [
    {
      paymentMethod: {
        type: String,
        required: true,
      },
      transactionId: {
        type: String,
      },
      paymentId: {
        type: String,
      },
      paymentStatus: {
        type: String,
        default: "Pending",
      },
    },
  ],
  totalprice: {
    type: Number,
  },
  totaldiscountprice: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  orderStatus: {
    type: String,
    default: "pending",
    required: true,
  },
  orderqty: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model("orders", OrderSchema);
module.exports = Order;
