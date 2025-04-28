import mongoose, { Model } from "mongoose";
import ISinger from "../interfaces/singer.interface";
const singerSchema = new mongoose.Schema(
  {
    fullName: {
      required: true,
      type: String,
      trim: true,
    },
    nickName: String,
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    follower: {
      type: Number,
      default: 0,
    },
    avatar: String,
    status: String,
    description: String,
    feature: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Singer: Model<ISinger> = mongoose.model<ISinger>(
  "Singer",
  singerSchema,
  "singers"
);

export default Singer;
