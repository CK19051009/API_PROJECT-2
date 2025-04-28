import { NextFunction , Request, Response } from "express"
import Client from "../../models/client.model"
export const middlewareAuthen = async (req:Request , res:Response , next: NextFunction):Promise<any> => {
    try {
        const tokenAuhthor  = req.headers.authorization?.split(" ")[1]
       
        const clientExits = await Client.findOne({deleted: false, status: "active", token : tokenAuhthor})

        if(!clientExits){
            return res.status(400).json({
                success: false,
                message: "Người dùng không tồn tại!"
            })
        }
        res.locals.token = tokenAuhthor
        res.locals.favoriteSongs =  clientExits.favorites
        next()
    } catch (error) {
        console.error("Lỗi ", error);
        return res.status(500).json({
          success: false,
          message: "Lỗi server",
        });
    }
}