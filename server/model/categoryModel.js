const mongoose = require("mongoose");

const categoryModel = new mongoose.Schema(
  {
    name:{
        type:String
    }
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("category", categoryModel);
module.exports = Category;
