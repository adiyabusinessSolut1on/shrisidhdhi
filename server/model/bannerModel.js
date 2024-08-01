const mongoose = require("mongoose");

const bannerModel = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.model("banner", bannerModel);
module.exports = Banner;
