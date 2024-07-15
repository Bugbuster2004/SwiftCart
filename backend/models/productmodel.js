const mongoose = require("mongoose");

const ProductSchema = new mongoose.model({
  title: {
    type: String,
  },
  descriptiom: {
    type: String,
  },
  price: {
    type: Number,
  },
  sizes: [
    {
      name: { type: String },
      quantity: { type: Number },
    },
  ],
  color: {
    type: String,
  },
  image: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  discountedprice: {
    type: Number,
    default: 0,
  },
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rating",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "review",
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
