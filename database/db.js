import mongoose from "mongoose";
const DB_URL =
  "mongodb+srv://bellal:mongodbpass@latest.idn8hsm.mongodb.net/?retryWrites=true&w=majority&appName=latest";

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
