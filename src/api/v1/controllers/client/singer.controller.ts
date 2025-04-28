import Singer from "../../models/singer.model";
import { Request, Response } from "express";

//[GET] /client/singers
export const index = async (req: Request, res: Response): Promise<any> => {
  try {
    const singers = await Singer.find({ deleted: false }).select(
      "-createdAt -updatedAt -deleted"
    );

    // console.log(data);

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

//[GET] /client/singers/detail/:id
export const detailSinger = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = req.params.id;
    const singerExitst = await Singer.findOne({
      deleted: false,
      _id: id,
    }).select("-createdAt -updatedAt -deleted");
    if (!singerExitst) {
      return res.status(400).json({
        success: false,
        message: "Ca sĩ không tồn tại!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lấy dữ liệu thành công!",
      data: singerExitst,
    });
  } catch (error) {
    console.error("Lỗi ", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};
//[GET] /client/singers/feature
export const featureSingers = async (req: Request, res: Response):Promise<any> => {
  try {
    const {limit = 5} = req.query;
    const singers = await Singer.find({deleted: false, feature: true}).limit(Number(limit)).select("-createdAt -updatedAt -deleted");
    return res.status(200).json({
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
}