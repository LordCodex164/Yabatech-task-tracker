import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

mongoose.connect(process.env.mongoURL).then(() => console.log("db connected")).catch((err) => console.log("db is not connected. This is the error" + err))

app.listen(8000, () => {
    console.log("app is connected and listening on port 8000")
})