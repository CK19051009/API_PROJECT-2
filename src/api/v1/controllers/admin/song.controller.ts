import { Request, Response } from "express";
import Song from "../../models/song.model";
import ISong from "../../interfaces/song.interface";
//[GET] /admin/songs
export const index = async (req: Request, res: Response): Promise<any> => {
  try {
    const songs = await Song.find({ deleted: false });
    // console.log(songs)
    return res.json({
      success: true,
      message: "Lấy dữ liệu thành công!",
      data: songs,
    });
  } catch (error) {
    console.error("Lỗi ", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

//[POST] /admin/songs/create
export const createSong = async (req: Request, res: Response): Promise<any> => {
  try {
    const {
      title,
      singers,
      topic_id,
      description,
      thumbnail,
      lyric,
      status,
      audio,
      isFeatured,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Tiêu đề bài hát là bắt buộc",
      });
    }
    const data: Partial<ISong> = {
      title: title,
      topic_id: topic_id,
      singers: singers,
      description: description,
      thumbnail: thumbnail,
      lyric: lyric,
      status: status,
      audio: audio,
      isFeatured,
    };
    const songNew = new Song(data);
    await songNew.save();

    return res.json({
      success: true,
      message: "Tạo bài hát thành công",
      data: songNew,
    });
  } catch (error) {
    console.error("Lỗi khi tạo bài hát:", error);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tạo bài hát",
    });
  }
};

//[PATCH] /admin/songs/edit/:id
export const editSong = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id;
    const {
      title,
      singers,
      topic_id,
      description,
      thumbnail,
      lyric,
      status,
      audio,
      isFeatured,
      listen,
      like,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Tiêu đề bài hát là bắt buộc",
      });
    }
    const data: Partial<ISong> = {
      title: title,
      topic_id: topic_id,
      singers: singers,
      description: description,
      thumbnail: thumbnail,
      lyric: lyric,
      status: status,
      audio: audio,
      isFeatured,
      listen,
      like,
    };
    console.log(data);
    await Song.updateOne({ _id: id, deleted: false }, { $set: data });

    return res.json({
      success: true,
      message: "Cập nhập bài hát thành công",
    });
  } catch (error) {
    console.error("Lỗi khi tạo bài hát:", error);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tạo bài hát",
    });
  }
};
