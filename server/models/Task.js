import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    taskName: { type: String, require: true },
    description: { type: String },
    assignedUser: { type: String, require: true },
    Deadline: { type: String, require: true },
    TaskStatus: { type: String, default: "Yet to Begin" },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
