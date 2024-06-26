import User from "../models/User.js";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(403).json("User already exists");
    }
    const encryptedPassword = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PassKey
    ).toString();

    const newUser = new User({ ...req.body, password: encryptedPassword });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.PassKey);
    const unhashedPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (unhashedPassword !== req.body.password) {
      return res.status(401).json("Wrong Password");
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin, username: user.username },
      process.env.jwtKey,
      { expiresIn: "1d" }
    );

    const { password, ...others } = user._doc;

    // Set the cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 3000,
      sameSite: "None",
      secure: true,
    });
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const logout = async (req, res) => {
  try {
    res
      .clearCookie("access_token", {
        httpOnly: false,
        path: "/",
        secure: true,
        sameSite: "None",
      })
      .status(200)
      .json("You've logged out successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};
