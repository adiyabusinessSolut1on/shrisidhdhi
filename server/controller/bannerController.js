const Banner = require("../model/bannerModel");

const CreateBanner = async (req, res) => {
  try {
    const response = await Banner.create(req.body);
    if (!response) {
      return res.status(403).json({
        success: false,
        message: "Banner Not Saved",
      });
    }
    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const GetAll_Banner = async (req, res) => {
    try {
      const response = await Banner.find();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  const UpdateBanner = async (req, res) => {
    const {id}=req.params
    try {
      const response = await Banner.findByIdAndUpdate(id,req.body,{
        new:true
      });
      if (!response) {
        return res.status(403).json({
          success: false,
          message: "Banner Not Found",
        });
      }
      res.status(202).json({
        success: true,
        message: "Banner Updated successfully",
        data: response,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  const DeleteBanner = async (req, res) => {
    try {
      const response = await Banner.findByIdAndDelete(req.params.id);
      if (!response) {
        return res.status(404).json({
          success: false,
          message: "Banner Not Found",
        });
      }
      res.status(200).json({ success: true, message: "Banner Delete" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Inter Server Error", error: error });
    }
  };
module.exports = {
    CreateBanner ,
    GetAll_Banner,
    UpdateBanner,
    DeleteBanner
}