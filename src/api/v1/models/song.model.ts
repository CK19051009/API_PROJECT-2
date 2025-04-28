import mongoose, { Model, Schema } from "mongoose";
// @ts-ignore
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);
import ISong from "../interfaces/song.interface";

const songSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    slug: { type: String, slug: "title", unique: true },
    singers: [
      {
        singer_id: {
          type: Schema.Types.ObjectId,
          ref: "Singer",
          required: true,
        },
      },
    ],
    topic_id: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    description: String,
    audio: Array,
    thumbnail: Array,
    lyric: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    listen: {
      type: Number,
      default: 0,
    },
    like: {
      type: Number,
      default: 0,
    },
    status: String,
    isFeatured: {
      // Bài hát nổi bật
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Song: Model<ISong> = mongoose.model<ISong>("Song", songSchema, "songs");

export default Song;
