import { Document } from "mongoose";
interface ISinger extends Document {
  id?: string;
  fullName: string;
  nickName?: string;
  description?: string;
  follower?: string;
  avatar?: string;
  deleted?: boolean;
  status?: string;
  gender?: string;
  createdAt?: Date;
  updatedAt?: Date;
  feature?: boolean;
}

export default ISinger;
