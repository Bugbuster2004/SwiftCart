const Address = require("../models/addressmodel");
const Cart = require("../models/cartmodel");
const Order = require("../models/ordermodel");

const createOrder = async (user, shipAddress) => {
  let address;
  if (shipAddress._id) {
    let existingAddress = await Address.findById(shipAddress);
    address = existingAddress;
  } else {
    address = new Address(shipAddress);
    address.user = user;
    await address.save();
  }

  const cart = await Cart.findOne({ user: user._id }).populate("items.product");
  if (!cart) {
    throw new Error("Cart not found");
  }

  const order = new Order({
    user: user._id,
    shippingAddress: address._id,
    items: cart.items,
    totalPrice: cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    ),
    status: "Pending", // You can set the initial status as needed
  });

  // Save the order to the database
  await order.save();

  // Clear the user's cart
  cart.items = [];
  await cart.save();

  return order;
};

const deliverOrder = async () => {
  const order = await Order.findById(orderId).populate("items.product");

  if (order) {
    order.status = "CONFIRMED";
  } else {
    order.status = "CANCELLED";
    throw new Error(error.message);
  }
  await order.save();
};

module.exports = {
  createOrder,
  deliverOrder,
  userOrderHistory,
  getAllOrders,
  deleteOrder,
};

const userOrderHistory = async (userId) => {
  const orders = await Order.find({
    user: userId,
    orderStatus: "CONFIRMED",
  }).populate("items.product");
  return orders;
};

const getAllOrders = async () => {
  return await Order.find({
    user: userId,
    orderStatus: "CONFIRMED",
  }).populate("items.product");
};

const deleteOrder = async () => {
  const order = await Order.findById(orderId);
  await Order.findByIdAndDelete(order._id);
};
