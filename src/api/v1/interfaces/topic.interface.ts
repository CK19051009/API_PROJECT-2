import { Document } from "mongoose";
interface ITopic extends Document {
  id?: string;
  title: string;
  description?: string;
  avatar?: string;
  deleted?: boolean;
  status?: string;
  isTrending?: boolean;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default ITopic;
