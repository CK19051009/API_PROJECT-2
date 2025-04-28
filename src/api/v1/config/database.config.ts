import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const dataConnect = async (): Promise<void> => {
  try {
    const url: string | undefined = process.env.DATABASE || "";
    await mongoose.connect(url);
    console.log("CONNECT SUCESS!");
  } catch (error) {
    console.log("CONNECT ERROR", error);
  }
};
