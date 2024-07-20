const Cart = require("../models/cartmodel");
const CartItem = require("../models/cartItemsmodel");
const Product = require("../models/productmodel");
// const CartItems = require("../models/cartItemsmodel");

const createCart = async (user) => {
  try {
    const cart = new Cart({ user });
    const createdCart = await cart.save();
    return createdCart;
  } catch (error) {
    throw new Error(error.message); // Throw an error instead of returning a response
  }
};

//find cart by user id

const findUserCart = async (userId) => {
  try {
    const cart = await Cart.findOne({ user: userId });
    const cartItems = await CartItem.cart({ cart: cart._id }).populate;
    cart.cartItems = cartItems;

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItems = 0;
    // let discount = 0

    for (let cartItem of cart.cartItems) {
      totalPrice += cartItem.price;
      totalDiscountedPrice += cartItem.discountedprice;
      totalItems = cartItem.quantity;
    }
    cart.totalPrice = totalPrice;
    cart.totalDiscountedPrice = totalDiscountedPrice;
    cart.totalItems = totalItems;

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

//adding items to cart

const addItemToCart = async (userId, req) => {
  try {
    const cart = await Cart.findOne({ user: userId });
    const product = await Product.findById(req.productId);

    const isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      userId,
    });
    if (!isPresent) {
      const cartitem = await CartItem.findOne({
        cart: cart._id,
        product: product._id,
        userId,
        quantity: 1,
        price: product.price,
        discountedprice: product.discountedprice,
      });
      const createdCartItem = await cartitem.save();
      cart.cartItems.push(createdCartItem);
      await cart.save();
      return "item added to cart";
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createCart, findUserCart, addItemToCart };
