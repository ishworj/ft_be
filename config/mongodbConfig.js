import mongoose from "mongoose";
export const connectDB = () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URL);
    conn && console.log("mongo db connected");
  } catch (error) {
    console.log(error);
  }
};
