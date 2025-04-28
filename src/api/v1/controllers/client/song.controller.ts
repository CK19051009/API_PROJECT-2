import Singer from "../../models/singer.model";
import Song from "../../models/song.model";
import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Client from "../../models/client.model";
import unidecode from "unidecode"
import ISong from "../../interfaces/song.interface";
const render = async (lists: any) => {
  const data = await Promise.all(
    lists.map(async (list: any) => {
      const singers = await Promise.all(
        (list.singers ?? []).map(async (item: any) => {
          // console.log("item",item.singer_id)
          const singer = await Singer.findById(item.singer_id).select(
            "fullName"
          );
          return singer ? singer.fullName : null;
        })
      );

      const topic = await Topic.findById(list.topic_id).select("title");

      return {
        ...list.toObject(),
        singers: singers.filter((name) => name !== null),
        topic: topic ? topic.title : null,
      };
    })
  );
  return data;
};
//[GET] /client/songs
export const index = async (req: Request, res: Response): Promise<any> => {
  try {
    const songs = await Song.find({ deleted: false }).select(
      "-createdAt -updatedAt -deleted"
    );
    const data = await render(songs);
    return res.json({
      success: true,
      message: "Lấy dữ liệu thành công!",
      data,
    });
  } catch (error) {
    console.error("Lỗi ", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

//[GET] /client/songs/detail/:idSong
export const detailSong = async (req: Request, res: Response): Promise<any> => {
  try {
    const idSong = req.params.idSong;
    const song = await Song.findOne({ deleted: false, _id: idSong }).select(
      "-createdAt -updatedAt -deleted"
    );
    const data = [];
    data.push(song);
    const songNew = await render(data);
    if (!song) {
      return res.status(400).json({
        success: false,
        message: "Bài hát không tồn tại",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Lấy dữ liệu thành công!",
      data: songNew,
    });
  } catch (error) {
    console.error("Lỗi ", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};
//[GET] /client/songs/singer/:idSinger
export const songOfSinger = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const idSinger = req.params.idSinger;

    const songs = await Song.find({
      deleted: false,
      "singers.singer_id": idSinger,
    })
      .populate("singers")
      .select("-createdAt -updatedAt -deleted");
    const data = await render(songs);
    return res.json({
      success: true,
      message: "Lấy dữ liệu thành công!",
      data: data,
    });
  } catch (error) {
    console.error("Lỗi ", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};
//[GET] /client/songs/topic/:idTopic
export const songOfTopic = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const idTopic = req.params.idTopic;
    const songs = await Song.find({ deleted: false, topic_id: idTopic })
      .populate("topic_id")
      .select("-createdAt -updatedAt -deleted");
    const data = await render(songs);
    return res.json({
      success: true,
      message: "Lấy dữ liệu thành công!",
      data: data,
    });
  } catch (error) {
    console.error("Lỗi ", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};
//[GET] /client/songs/listens?limit=3
export const listenMuch = async (req: Request, res: Response): Promise<any> => {
  try {
    const { limit = 3 } = req.query;
    const songs = await Song.find({ deleted: false })
      .sort({ listen: "desc" })
      .limit(Number(limit))
      .select("-createdAt -updatedAt -deleted");
    const data = await render(songs);
    return res.json({
      success: true,
      message: "Lấy dữ liệu thành công!",
      data,
    });
  } catch (error) {
    console.error("Lỗi ", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

//[GET] /client/songs/wishlist
export const wishlist = async (req: Request, res: Response): Promise<any> => {
  try {
    const favoriteSongs = res.locals.favoriteSongs.songs || [];
    const songs = await Song.find({ deleted: false }).select(
      "-createdAt -updatedAt -deleted"
    );

    const data = await render(songs);
    const result = [];
    for (const item of data) {
      if(favoriteSongs.includes(item._id)){
        result.push(item)
      }
    }
    return res.status(200).json({
      success: true,
      message: "Lấy dữ liệu thành công!",
      data: result,
    });
  } catch (error) {
    console.error("Lỗi ", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

//[PATCH] /client/songs/wishlist/:statusWishList/:idSong
export const changeWishList = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    enum Status {
      like = "like",
      dislike = "dislike",
    }
    const status = req.params.statusWishList as Status;
    const idSong = req.params.idSong;
    const favoriteSongs = res.locals.favoriteSongs.songs || [];
    const check: boolean = (favoriteSongs as string[]).includes(idSong);
    const song:any = await Song.findOne({deleted: false, _id: idSong})
    switch (status) {
      case Status.like: {
        if (!check) {
          await Client.updateOne(
            { deleted: false, status: "active", token: res.locals.token },
            {
              $push: { "favorites.songs": idSong },
            }
          );
          await Song.updateOne({
            deleted: false, 
            _id: idSong
          },{
            like: Number(song.like) + 1 
          })
          return res.status(200).json({
            success: true,
            message: "Thêm bài hát vào danh sách yêu thích thành công!",
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Bài hát đã có trong danh sách yêu thích!",
          });
        }
      }
      case Status.dislike:
        {
          if (check) {
            // Xóa bài hát khỏi danh sách yêu thích
            await Client.updateOne(
              { deleted: false, status: "active", token: res.locals.token },
              { $pull: { "favorites.songs": idSong } }
            );
            await Song.updateOne({
              deleted: false, 
              _id: idSong
            },{
              like: Number(song.like) - 1 
            })
            return res.status(200).json({
              success: true,
              message: "Xóa bài hát khỏi danh sách yêu thích thành công!",
            });
          } else {
            return res.status(400).json({
              success: false,
              message: "Bài hát không có trong danh sách yêu thích!",
            });
          }
        }
  
      default:
        break;
    }
  } catch (error) {
    console.error("Lỗi ", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

function createSlug(keyword: string) {
  return unidecode(keyword)
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Loại bỏ ký tự đặc biệt
    .replace(/[\s]+/g, "-") // thay space bằng dấu cách
    .replace(/^-+|-+$/g, ""); // loại bỏ gạch đầu dòng;
}
//[GET] /clien/songs/search
export const search = async  (req:Request , res:Response):Promise<any> => {
  try {
    const { keyword = null, page = 1 } = req.query;
    const slug = createSlug(String(keyword));
    const slugSearch = new RegExp(slug , "i")
    const name = new RegExp(String(keyword), "i");
    const find = {
      $or: [
        {
          title: name,
        },
        {
          slug: slugSearch,
        },
      ],
      deleted: false,
    };
    const songs = await Song.find(find).select(
     "-createdAt -updatedAt -deleted"
    );
    const songsNew = await render(songs)
    return res.status(200).json({
      success: true,
      message: "Lấy dữ liệu thành công!",
      data: songsNew
    })
  } catch (error) {
    console.error("Lỗi ", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
}