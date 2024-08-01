const Category=require("../model/categoryModel")

const CreateCategory = async (req, res) => {
  try {
    const response = await Category.create(req.body);
    if (!response) {
      return res.status(403).json({
        success: false,
        message: "Category Not Saved",
      });
    }
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const GetAll_Category = async (req, res) => {
    try {
      const response = await Category.find();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  const UpdateCategory = async (req, res) => {
    const {id}=req.params
    try {
      const response = await Category.findByIdAndUpdate(id,req.body,{
        new:true
      });
      if (!response) {
        return res.status(403).json({
          success: false,
          message: "Category Not Found",
        });
      }
      res.status(202).json({
        success: true,
        message: "Category Updated successfully",
        data: response,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  const DeleteCategory = async (req, res) => {
    try {
      const response = await Category.findByIdAndDelete(req.params.id);
      if (!response) {
        return res.status(404).json({
          success: false,
          message: "Category Not Found",
        });
      }
      res.status(200).json({ success: true, message: "Category Delete" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Inter Server Error", error: error });
    }
  };
module.exports = {
    CreateCategory ,
    GetAll_Category,
    UpdateCategory,
    DeleteCategory
}