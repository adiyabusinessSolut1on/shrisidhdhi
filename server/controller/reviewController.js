const Review=require("../model/review")
const Create_Review = async (req, res) => {
  try {
    const response = await Review.create(req.body);
    if (!response) {
      return res.status(403).json({
        success: false,
        message: "Review Not Saved",
      });
    }
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const GetAll_Review_By_productId = async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await Review.find({ productId: productId, isVerify:true });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const Update_Review = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Review.findByIdAndUpdate(
        id,
        {
          $set: {
            isVerify: true
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
      .status(200)
      .json({ success: true, data: response, message: "Product Update" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};
const Delete_Review = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Review.findByIdAndDelete(id);
    if (!response) {
      return res
        .status(403)
        .json({ success: false, message: "Review Not Found" });
    }
    res
      .status(203)
      .json({ success: true, data: response, message: "Review Delete" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};
const Get_ALL_Review = async (req, res) => {
  try {
    const response = await Review.find();
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
 Create_Review,
 GetAll_Review_By_productId,
 Update_Review,
 Delete_Review,
 Get_ALL_Review,
};
