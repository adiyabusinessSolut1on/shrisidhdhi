const mongoose = require("mongoose");

const productModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required:true
    },
    images:[{type:String}],
    slug: {
      type: String,
      required:true
    },
    category: { type: String },
    price: {
      type: Number,
      required:true
    },
    discription: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", productModel);
module.exports = Product;
