import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    uniqueId: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    tasks: [
      {
        taskName: { type: String, default: null },
        description: { type: String },
        assignedBy: { type: String },
        assignedUser: { type: String },
        deadLine: { type: String },
        priority: { type: String },
        taskStatus: { type: String, default: "not started" },
        createdAt: { type: String },
        updatedAt: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
