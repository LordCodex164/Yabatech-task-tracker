import express from "express";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../TokenVerification.js";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../collections/Task.js";

const router = express.Router();

router.post("/createTask", verifyTokenAndAdmin, createTask);
router.put("/updateTask", verifyToken, updateTask);
router.delete("/deleteTask", verifyTokenAndAdmin, deleteTask);
router.get("/getTask", verifyToken, getTask);
router.get("/getTasks", verifyTokenAndAdmin, getTasks);

export default router;
