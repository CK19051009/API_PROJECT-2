import { Request, Response } from "express";
import Client from "../../models/client.model";
import md5 from "md5"
import { createToken } from "../../helpers/create.token";
import IClient from "../../interfaces/client.interface";

//[GET] /client/authen/register
export const register = async (req:Request , res: Response): Promise<any> => {
    try {
        const {fullName , email , password} = req.body;
        if(!fullName || !email || !password){
            return res.status(400).json({
                success: false,
                message : "Gửi đủ trường bạn ơi!"
            })
        }
        console.log(email)
        const clientExist = await Client.findOne({deleted: false, status: "active" , email: email})
        console.log(clientExist)
        if(clientExist){
            return res.status(400).json({
                success: false,
                message : "Người dùng đã tồn tại!"
            })
        }
        const data : Partial<IClient> = {
            fullName: String(fullName),
            email: String(email),
            token: createToken(40),
            password: md5(String(password))
        }
        console.log(data)
        const clientNew = new Client(data);
        await clientNew.save();
        return res.status(200).json({
            success: true,
            message: "Tạo tài khoản thành công!",
            token: clientNew.token
        })
    } catch (error) {
        console.error("Lỗi ", error);
        return res.status(500).json({
          success: false,
          message: "Lỗi server",
        });
    }
}
//[POST] /client/authen/login
export const login = async (req:Request , res: Response): Promise<any> => {
    try {
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message : "Gửi đủ trường bạn ơi!"
            })
        }
        const clientExist = await Client.findOne({deleted: false, status: "active" , email: email})
        if(!clientExist){
            return res.status(400).json({
                success: false,
                message : "Người dùng gửi sai email!"
            })
        }
        if(md5(password) !== clientExist.password){
            return res.status(400).json({
                success: false,
                message : "Người dùng gửi sai mật khẩu!"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Đăng nhập hệ thống thành công",
            token: clientExist.token
        })
    } catch (error) {
        console.error("Lỗi ", error);
        return res.status(500).json({
          success: false,
          message: "Lỗi server",
        });
    }
}

// [GET] /client/authen/logout
export const logout = async (req: Request, res: Response):Promise<any> => {
    try {
        
        res.clearCookie("authToken");
        return res.status(200).json({
            success: true,
            message: "Đăng xuất thành công!"
        })
    } catch (error) {
        console.error("Lỗi ", error);
        return res.status(500).json({
          success: false,
          message: "Lỗi server",
        });
    }
}