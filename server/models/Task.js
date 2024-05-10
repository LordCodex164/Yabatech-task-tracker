import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    taskName: { type: String, required: true, unique: true, default: null },
    description: { type: String },
    assignedUser: { type: String, required: true },
    assignedBy: { type: String, required: true },
    deadLine: { type: String, required: true },
    priority: { type: String, required: true },
    taskStatus: { type: String, default: "not started" },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
