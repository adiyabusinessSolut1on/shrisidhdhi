const Banner = require("../model/bannerModel");
const Product=require("../model/productModel");
const Create_Product = async (req, res) => {
  try {
    const response = await Product.create(req.body);
    if (!response) {
      return res.status(403).json({
        success: false,
        message: "Product Not Saved",
      });
    }
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const GetAll_Product = async (req, res) => {
    try {
      const response = await Product.find();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
 
module.exports = {
    Create_Product,
    GetAll_Product
}