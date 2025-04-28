import Singer from "../../models/singer.model";
import { Request, Response } from "express";
import ISinger from "../../interfaces/singer.interface";
//[GET] /admin/singers?page=1&keyword=?&status=?&
export const index = async (req: Request, res: Response): Promise<any> => {
  try {
    type find = {
      deleted: boolean;
      status?: string;
      title?: string;
    };
    // const { keyword = null, status = null } = req.query;
    const find: find = {
      deleted: false,
    };
    const allSingers = await Singer.countDocuments(find);
    let page: number = 1;
    let limit: number = 4;
    if (req.query.page) {
      page = Number(req.query.page);
    }
    if (req.query.limit) {
      limit = Number(req.query.limit);
    }
    const singers = await Singer.find(find)
      .limit(limit)
      .skip((page - 1) * limit);
    return res.json({
      success: true,
      message: "Lấy dữ liệu thành công!",
      data: singers,
      pagination: {
        total: allSingers,
        page: page,
        limit: limit,
      },
    });
  } catch (error) {
    console.error("Lỗi ", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};
//[POST] /admin/singer/create
export const createSinger = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      fullName,
      description,
      follower,
      avatar,
      nickName,
      status,
      gender,
    } = req.body;
    if (!fullName) {
      return res.status(400).json({
        success: false,
        message: "Tên ca sĩ là bắt buộc là bắt buộc",
      });
    }
    const data: Partial<ISinger> = {
      fullName,
      description,
      avatar,
      nickName,
      status,
      follower,
      gender,
    };
    const singerNew = new Singer(data);
    await singerNew.save();
    return res.status(200).json({
      success: true,
      message: "Tạo ca sĩ thành công!",
      data: singerNew,
    });
  } catch (error) {
    console.error("Lỗi ", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};
//[PATCH] /admin/singer/edit/:id
export const editSinger = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id;
    const {
      fullName,
      description,
      follower,
      avatar,
      nickName,
      status,
      gender,
    } = req.body;
    if (!fullName) {
      return res.status(400).json({
        success: false,
        message: "Tên ca sĩ là bắt buộc là bắt buộc",
      });
    }
    const data: Partial<ISinger> = {
      fullName,
      description,
      avatar,
      nickName,
      status,
      follower,
      gender,
    };
    await Singer.updateOne(
      { _id: id, deleted: false, status: "active" },
      { $set: data }
    );
    return res.json({
      success: true,
      message: "Cập nhập ca sĩ thành công!",
    });
  } catch (error) {
    console.error("Lỗi ", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};
