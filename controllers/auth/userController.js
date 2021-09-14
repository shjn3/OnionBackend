import express from "express";
import User from "../../models/auth/userModel.js";
import Bcrypt from "bcryptjs";
import { generateToken } from "../../token/utils.js";
const router = express.Router();

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    //validate username
    const user = await User.findOne({ username }).exec();
    if (!user) {
      return res
        .status(403)
        .send({ success: false, message: "The username does not exist" });
    }
    //validate password
    if (!Bcrypt.compareSync(password, user.password)) {
      return res
        .status(403)
        .send({ success: false, message: "The password is invalid" });
    }
    //create token for login
    const token = generateToken(user);
    //update refresh token for user
    await user.updateOne({ refreshToken: token.refreshToken });
    res.cookie("refresh_token", token.refreshToken, {
      maxAge: 365 * 24 * 60 * 60 * 100,
      httpOnly: true,
    });
    return res.status(200).json({
      success: true,
      message: "Login success!",
      detail: { username: user.username, token: token.accessToken },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    //username unique
    if (user) {
      return res
        .status(401)
        .json({ success: false, message: "username exits!!" });
    }
    //hash password
    const hash_password = Bcrypt.hashSync(password, 10);
    //create new user
    const newUser = new User({ username, password: hash_password });
    await newUser.save();
    //create Token
    const token = await generateToken(newUser);
    //update refresh token for user
    await newUser.updateOne({ refreshToken: token.refreshToken });
    res.cookie("refresh_token", token.refreshToken, {
      maxAge: 365 * 24 * 60 * 60 * 100,
      httpOnly: true,
    });
    return res.status(200).json({
      success: true,
      message: "create Successfully",
      detail: { username: newUser.username, token },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAccessToken = async (req, res) => {
  try {
    const refreshToken = req.headers.cookie.split("=")[1];
    //validate refreshtoken
    if (!refreshToken)
      return res
        .status(401)
        .json({ success: false, message: "information invalid" });
    //validate refreshtoken from db
    const user = await User.findOne({ refreshToken });
    if (!user)
      return res
        .status(403)
        .json({ success: false, message: "information invalid" });
    //create new token
    const token = await generateToken(user);
    //update refresh token
    await User.findOneAndUpdate(
      { _id: user._id },
      { refreshToken: token.refreshToken }
    );

    res.cookie("refresh_token", token.refreshToken, {
      maxAge: 365 * 24 * 60 * 60 * 100,
      httpOnly: true,
    });
    return res.status(200).json({
      success: true,
      message: "refresh token successfully",
      detail: { username: user.username, token: token.accessToken },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Fail from server" });
  }
};

export const logOutUser = async (req, res) => {
  try {
    const { _id } = req.user;
    //find user and update refresh token null
    const user = await User.findByIdAndUpdate(
      { _id },
      { refreshToken: null },
      { $new: true }
    );
    //can't find user
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "information invalid" });
    return res
      .status(200)
      .json({ success: true, message: "logout successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Fail from server" });
  }
};
export default router;
