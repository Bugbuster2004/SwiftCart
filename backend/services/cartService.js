const Cart = require("../models/cartmodel");

const createCart = async (user, res) => {
  try {
    const cart = new Cart({ user });
    const createdCart = await cart.save();
    return createdCart;
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

module.exports = { createCart };
