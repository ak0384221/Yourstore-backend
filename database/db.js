import mongoose from "mongoose";
import dotenv from "dotenv";
const DB_URL = process.env.DB_URL;

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

export default connectDB;
