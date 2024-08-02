const mongoose = require("mongoose");

const reviewModel = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    star: {
      type: Number,
      required: true,
    },
    isVerify: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("review", reviewModel);
module.exports = Review;
