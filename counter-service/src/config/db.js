import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("⚡️ Mongo connected (auth-service)");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
