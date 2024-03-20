import User from "../models/User.js";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const register = async (req, res) => {
  const encryptedPassword = CryptoJS.AES.encrypt(
    req.body.password,
    process.env.PassKey
  ).toString();

  const newUser = new User({
    fullName: req.body.fullName,
    userName: req.body.userName,
    email: req.body.email,
    password: encryptedPassword,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("User not found");

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.PassKey);
    const unhashedPassword = bytes.toString(CryptoJS.enc.Utf8);
    unhashedPassword !== req.body.password &&
      res.status(401).json("Wrong Password");

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.jwtKey,
      { expiresIn: "1d" }
    );

    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const logout = async (req, res) => {
  try {
    res
      .clearCookie("access_token", { sameSite: "none", secure: true })
      .status(200)
      .json("You've logged out successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};
