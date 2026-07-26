import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) return;

  const uri = MONGODB_URI || process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
  }

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
    isConnected = true;
  }
}
