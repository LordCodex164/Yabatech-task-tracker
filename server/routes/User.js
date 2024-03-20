import express from "express";
import { deleteUser, updateUser } from "../collections/User.js";

const router = express.Router();

router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
