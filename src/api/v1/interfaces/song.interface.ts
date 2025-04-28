import { Document } from "mongoose";
interface ISong extends Document {
  title: string;
  slug?: string;
  description?: string;
  topic_id?: string;
  singers?: string[];
  thumbnail?: string[];
  lyric?: string;
  deleted?: boolean;
  listen?: number;
  like?: number;
  audio?: string[];
  status?: string;
  isFeatured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export default ISong;
