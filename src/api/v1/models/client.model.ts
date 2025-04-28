import mongoose, { Model } from "mongoose";
import IClient from "../interfaces/client.interface";
const clientSchema = new mongoose.Schema(
  {
    fullName: {
      required: true,
      type: String,
      trim: true,
    },
    email: String,
    password: String,
    token: String,
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
    avatar: String,
    status: {
        type:String,
        default: "active"
    },
    favorites: {
        songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
      },
  },
  {
    timestamps: true,
  }
);

const Client: Model<IClient> = mongoose.model<IClient>(
  "Client",
  clientSchema,
  "clients"
);

export default Client;