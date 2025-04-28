import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import ITopic from "../../interfaces/topic.interface";
//[GET] /admin/topics
export const index = async (req: Request, res: Response): Promise<any> => {
  try {
    const singers = await Topic.find({ deleted: false });
    return res.json({
      success: true,
      message: "Lấy dữ liệu thành công!",
      data: singers,
    });
  } catch (error) {
    console.error("Lỗi ", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

//[POST] /admin/topics/create
export const createTopic = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { title, description, avatar, status, isTrending } = req.body;
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Tên chủ đề bắt buộc là bắt buộc",
      });
    }
    if (req.body.order == null) {
      const all = await Topic.countDocuments();
      req.body.order = Number(all) + 1;
    }
    const data: Partial<ITopic> = {
      title,
      description,
      avatar,
      status,
      isTrending,
      order: req.body.order,
    };
    const topicNew = new Topic(data);
    await topicNew.save();
    return res.status(200).json({
      success: true,
      message: "Tạo chủ đề thành công!",
      data: topicNew,
    });
  } catch (error) {
    console.error("Lỗi ", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

//[PATCH] /admin/topics/edit/:id
export const editTopic = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id;
    const topicExist = await Topic.findOne({
      _id: id,
      deleted: false,
      status: "active",
    });
    if (!topicExist) {
      return res.status(400).json({
        success: false,
        message: "Chủ đề không tồn tại",
      });
    }
    const { title, description, avatar, status, isTrending, order } = req.body;
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Tên chủ đề là bắt buộc",
      });
    }

    const data: Partial<ITopic> = {
      title,
      description,
      avatar,
      status,
      isTrending,
      order,
    };

    await Topic.updateOne(
      { deleted: false, status: "active", _id: id },
      { $set: data }
    );
    return res.status(200).json({
      success: true,
      message: "Cập nhập chủ đề thành công!",
    });
  } catch (error) {
    console.error("Lỗi ", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};
