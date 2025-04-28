import { Document } from "mongoose";
interface IClient extends Document {
  id?: string;
  fullName: string;
  email?:string;
  password?:string;
  token?: string;
  nickName?: string;
  avatar?: string;
  deleted?: boolean;
  status?: string;
  gender?: string;
  createdAt?: Date;
  updatedAt?: Date;
  favorites?:any[];

}
export default IClient;