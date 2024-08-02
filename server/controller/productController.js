const Product = require("../model/productModel");
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
    const response = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const Update_Product_Id = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }
    res
      .status(200)
      .json({ success: true, data: response, message: "Product Updated" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const Product_Draft_status = async (req, res) => {
  const { id } = req.params;
  const{isDraft}=req.body;
  try {
    const response = await Product.findByIdAndUpdate(
        id,
        {
          $set: {
            isDraft: isDraft
          }
        },
        {
          new: true
        });
    if (!response) {
      return res
        .status(403)
        .json({ success: false, message: "Product Not Found" });
    }
    res
      .status(203)
      .json({ success: true, data: response, message: "Product Update" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};
const Delete_Product_Id = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Product.findByIdAndDelete(id);
    if (!response) {
      return res
        .status(403)
        .json({ success: false, message: "Product Not Found" });
    }
    res
      .status(203)
      .json({ success: true, message: "Product Delete" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};
const GetAll_nondraftProduct = async (req, res) => {
  try {
    const response = await Product.find({isDraft:false}).sort({ createdAt: -1 });;
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const Get_Product_by_Slug = async (req, res) => {
  const { slug } = req.params;
  try {
    const response = await Product.findOne({slug:slug});
    if (!response) {
      return res
        .status(403)
        .json({ success: false, message: "Product Not Found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const GetProduct_by_Id = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Product.findById(id);
    if (!response) {
      return res
        .status(403)
        .json({ success: false, message: "Product Not Found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const GetProducts_by_category = async (req, res) => {
  const { category } = req.params;
  try {
    const response = await Product.find({ category: category,isDraft:false }).sort({ createdAt: -1 });
    if (!response) {
      return res
        .status(403)
        .json({ success: false, message: "Product Not Found" });
    }
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
  GetAll_Product,
  Update_Product_Id,
  GetAll_nondraftProduct,
  Product_Draft_status,
  Delete_Product_Id,
  Get_Product_by_Slug,
  GetProduct_by_Id,
  GetProducts_by_category,
};
