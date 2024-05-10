import express from "express";
import {
  deleteUser,
  getLoggedInUser,
  getUser,
  getUsers,
  updateUser,
} from "../collections/User.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
  
} from "../TokenVerification.js";

const router = express.Router();

router.put("/update/:id",  updateUser);
router.delete("/delete/:id",  deleteUser);
router.get("/getUser/:id",  getUser);
router.get("/getUsers", verifyTokenAndAdmin, getUsers);
router.get("/getLoggedInUser", getLoggedInUser);

export default router;
