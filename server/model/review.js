const mongoose = require("mongoose");

const reviewModel = new mongoose.Schema(
  {
    productId: { type: String },
    name: {
      type: String,
      required:true
    },
    email: {
      type: String,
      required:true
    },
    message: {
      type: String,
      required:true
    },
    star: {
      type: Number,
      required:true
    },
    isValid: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("review", reviewModel);
module.exports = Review;
