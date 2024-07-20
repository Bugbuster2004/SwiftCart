const CartItem = require("../models/cartItemsmodel");
const userService = require("../services/userService");

const updateCartItem = async (userId, productId, cartItemData) => {
  try {
    const item = await findCartItemById(cartItemId);
    if (!item) {
      throw new Error("cart item not found", cartItemId);
    }

    const user = await userService.fetchUserById(item.userId);
    if (!user) {
      throw new Error("user not found", userId);
    }
    //this if condition is checked because the user updating the item and and the user who have already created this item should be the same
    if (user._id.toString() === userId.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      const updateditem = await item.save();
      return updateditem;
    } else {
      throw new Error("you cant update this cart item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

//removing cart item by id

const removeCartItemById = async (cartItemId, userId) => {
  try {
    const item = await findCartItemById(cartItemId);
    const user = await userService.fetchUserById(userId);

    if (user._id.toString() === item.userId.toString()) {
      await CartItem.findByIdAndDelete(cartItemId);
    } else {
      throw new Error("you cant delete this cart item");
    }
  } catch (error) {}
  throw new Error(error.message);
};

//finding cart item by user id

const findCartItemById = async (cartItemId) => {
  try {
    const cartitem = await CartItem.findById(cartItemId);
    if (cartitem) {
      return cartitem;
    } else {
      throw new Error("cart item not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { updateCartItem, removeCartItemById, findCartItemById };
