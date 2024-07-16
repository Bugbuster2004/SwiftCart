// const Cart = require("../models/cartmodel");

// const createCart = async (user, res) => {
//   try {
//     const cart = new Cart({ user });
//     const createdCart = await cart.save();
//     return createdCart;
//   } catch (error) {
//     return res.status(404).send({ message: error.message });
//   }
// };

// module.exports = { createCart };

// cartService.js
const Cart = require("../models/cartmodel");

const createCart = async (user) => {
  try {
    const cart = new Cart({ user });
    const createdCart = await cart.save();
    return createdCart;
  } catch (error) {
    throw new Error(error.message); // Throw an error instead of returning a response
  }
};

module.exports = { createCart };
