import mongoose from "mongoose";
const MONGO_URL = "mongodb://localhost:27017/finance_tracker";
export const connectDB = () => {
  try {
    const conn = mongoose.connect(MONGO_URL);
    conn && console.log("mongo db connected");
  } catch (error) {
    console.log(error);
  }
};
