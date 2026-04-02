import mongoose from "mongoose";

//const MONGODB_URI = process.env.MONGODB_URI as string;

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  const uri = process.env.MONGODB_URI as string;

    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected");

  await mongoose.connect(uri);
};