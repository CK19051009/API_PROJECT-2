import Topic from "../../models/topic.model";
import { Request, Response } from "express";
//[GET] /client/topics
export const index = async (req: Request, res: Response): Promise<any> => {
    try {
      const topics = await Topic.find({ deleted: false, status: "active" }).select(
        "-createdAt -updatedAt -deleted"
      );

  
      return res.json({
        success: true,
        message: "Lấy dữ liệu thành công!",
        data: topics,
      });
    } catch (error) {
      console.error("Lỗi ", error);
      return res.status(500).json({
        success: false,
        message: "Lỗi server",
      });
    }
};

//[GET] /client/topics/trending?limit=5
export const trending = async (req: Request , res: Response): Promise<any> => {
    try {
        const {limit = 5} = req.query;
        const topics = await Topic.find({ deleted: false, status: "active", isTrending: true }).select(
            "-createdAt -updatedAt -deleted").limit(Number(limit));
        
      return res.json({
        success: true,
        message: "Lấy dữ liệu thành công!",
        data: topics,
      });
    } catch (error) {
        console.error("Lỗi ", error);
        return res.status(500).json({
          success: false,
          message: "Lỗi server",
        });
    }

};
  
//[GET] /client/topics/detail/:id
export const detailTopic = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const id = req.params.id;
    //   console.log(id)
      const topicExitst = await Topic.findOne({
        deleted: false,
        _id: id,
        status: "active"
      }).select("-createdAt -updatedAt -deleted");
      if (!topicExitst) {
        return res.status(400).json({
          success: false,
          message: "Chủ đề không tồn tại!",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Lấy dữ liệu thành công!",
        data: topicExitst,
      });
    } catch (error) {
      console.error("Lỗi ", error);
      return res.status(500).json({
        success: false,
        message: "Lỗi server",
      });
    }
  };
 
  