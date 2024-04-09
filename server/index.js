import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import AuthRoute from "./routes/Auth.js";
import UserRoute from "./routes/User.js";
import TaskRoute from "./routes/Task.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());

// CORS options
const corsOptions = {
  origin: "https://dazzling-praline-5c3ff0.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE"], // Example methods you may want to allow
};

// Use cors with the above options for all routes
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '"*"'); // Specific origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // Include other headers you want to allow
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Include other methods you want to allow
  next();
});

mongoose
  .connect(process.env.mongoUrL)
  .then(() => console.log("db connected"))
  .catch((err) => console.log("db is not connected. This is the" + err));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoute);
app.use("/api/task", TaskRoute);

app.listen(8000 || process.env.PORT, () => {
  console.log("app is connected and listening on port 8000");
});
