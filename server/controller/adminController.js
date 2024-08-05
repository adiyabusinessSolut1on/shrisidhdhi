const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const LogInFailAlert = require("../template/login-fail");
const Alert = require("../template/alert");
const SendOTP = require("../template/sendOtp");
const Register = async (req, res) => {
  const { name, email, mobile, password, role } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      mobile: mobile,
      password: hashPassword,
      role: role,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const min = 100000;
    const max = 999999;
    const OTP = Math.floor(Math.random() * (max - min + 1)) + min;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Email credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      LogInFailAlert(email);
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password credentials" });
    }

    await User.findByIdAndUpdate(user._id, { otp: OTP }, { new: true });
    const sentmail = await SendOTP(email, OTP);
    console.log({ sentmail });
    if (!sentmail.success) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Something Went Wrong While Sending OTP ",
        });
    }

    return res
      .status(200)
      .json({ success: true, message: "OTP has been sent on you email " });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const LoginVerify = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email, otp }).select("-password");
    if (!user) {
      Alert(email);
      return res.status(401).json({ success: false, message: "Invalid OTP" });
    }

    const token = jwt.sign(
      { _id: user._id, email: user?.email, role: user?.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRE_TIME,
      }
    );
    return res
      .cookie("authorization", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ success: true, message: "Login successful", token: token });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password")
      .select("-otp");
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "user Not Found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const ForGetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const min = 100000;
    const max = 999999;
    const OTP = Math.floor(Math.random() * (max - min + 1)) + min;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Email credentials" });
    }
    await User.findByIdAndUpdate(user._id, { otp: OTP }, { new: true });

    SendOTP(email, OTP);
    return res
      .status(200)
      .json({ success: true, message: "OTP has been sent on you email " });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const VeriFy_ForGetPassword_OTP = async (req, res) => {
  try {
    const { otp, email, newPassword } = req.body;

    const user = await User.findOne({ email, otp });

    if (!user) {
      Alert(email);
      return res
        .status(401)
        .json({ success: false, message: "Invalid OTP or email." });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    const response = await User.findByIdAndUpdate(
      user._id,
      { password: hashPassword },
      { new: true }
    );
    if (!response)
      return res
        .status(401)
        .json({ success: false, message: "password Not Update" });
    res
      .status(200)
      .json({ success: true, message: "Password has been changed" });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Something went wrong..." });
  }
};

const ChnagePassword = async (req, res) => {
  const { oldPassword } = req.body;
  try {
    const min = 100000;
    const max = 999999;
    const OTP = Math.floor(Math.random() * (max - min + 1)) + min;
    const user = await User.findById(req.userId);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      LogInFailAlert(user.email);
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password credentials" });
    }
    await User.findByIdAndUpdate(user._id, { otp: OTP }, { new: true });

    SendOTP(user.email, OTP);
    return res
      .status(200)
      .json({ success: true, message: "OTP has been sent on you email " });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const VeriFy_ChnagePassword_OTP = async (req, res) => {
  const userId = req.userId;
  try {
    const { otp, newPassword } = req.body;

    const user = await User.findOne({ _id: userId, otp });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid OTP." });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    const response = await User.findByIdAndUpdate(
      user._id,
      { password: hashPassword },
      { new: true }
    );
    if (!response)
      return res
        .status(401)
        .json({ success: false, message: "password Not Update" });
    res
      .status(200)
      .json({ success: true, message: "Password has been changed" });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Something went wrong..." });
  }
};
const UpdateProfile = async (req, res) => {
  const id = req.userId;
  const data = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res
      .status(202)
      .send({ success: true, message: "user Updated", data: updatedUser });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const handleLogoutController = async (req, res) => {
  try {
      res.clearCookie("authorization");
      res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
module.exports = {
  Register,
  Login,
  LoginVerify,
  getAdmin,
  ForGetPassword,
  VeriFy_ForGetPassword_OTP,
  ChnagePassword,
  VeriFy_ChnagePassword_OTP,
  UpdateProfile,
  handleLogoutController
};
