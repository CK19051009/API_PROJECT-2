import mongoose, { Model } from "mongoose";
import ITopic from "../interfaces/topic.interface";
const topicSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    avatar: String,
    status: String,
    description: String,
    isTrending: {
      // Chủ đề đang hot
      type: Boolean,
      default: false,
    },
    order: {
      // Thứ tự hiển thị
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Topic: Model<ITopic> = mongoose.model<ITopic>(
  "Topic",
  topicSchema,
  "topics"
);

export default Topic;
