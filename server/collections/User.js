import User from "../models/User.js";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";

dotenv.config();

export const updateUser = async (req, res) => {
  if (req.body.password) {
    const encryptedPassword = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PassKey
    ).toString();

    req.body.password = encryptedPassword;
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
};
