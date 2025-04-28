"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.changeWishList = exports.wishlist = exports.listenMuch = exports.songOfTopic = exports.songOfSinger = exports.detailSong = exports.index = void 0;
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const client_model_1 = __importDefault(require("../../models/client.model"));
const unidecode_1 = __importDefault(require("unidecode"));
const render = (lists) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Promise.all(lists.map((list) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const singers = yield Promise.all(((_a = list.singers) !== null && _a !== void 0 ? _a : []).map((item) => __awaiter(void 0, void 0, void 0, function* () {
            // console.log("item",item.singer_id)
            const singer = yield singer_model_1.default.findById(item.singer_id).select("fullName");
            return singer ? singer.fullName : null;
        })));
        const topic = yield topic_model_1.default.findById(list.topic_id).select("title");
        return Object.assign(Object.assign({}, list.toObject()), { singers: singers.filter((name) => name !== null), topic: topic ? topic.title : null });
    })));
    return data;
});
//[GET] /client/songs
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield song_model_1.default.find({ deleted: false }).select("-createdAt -updatedAt -deleted");
        const data = yield render(songs);
        return res.json({
            success: true,
            message: "Lấy dữ liệu thành công!",
            data,
        });
    }
    catch (error) {
        console.error("Lỗi ", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server",
        });
    }
});
exports.index = index;
//[GET] /client/songs/detail/:idSong
const detailSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSong = req.params.idSong;
        const song = yield song_model_1.default.findOne({ deleted: false, _id: idSong }).select("-createdAt -updatedAt -deleted");
        const data = [];
        data.push(song);
        const songNew = yield render(data);
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
    }
    catch (error) {
        console.error("Lỗi ", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server",
        });
    }
});
exports.detailSong = detailSong;
//[GET] /client/songs/singer/:idSinger
const songOfSinger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSinger = req.params.idSinger;
        const songs = yield song_model_1.default.find({
            deleted: false,
            "singers.singer_id": idSinger,
        })
            .populate("singers")
            .select("-createdAt -updatedAt -deleted");
        const data = yield render(songs);
        return res.json({
            success: true,
            message: "Lấy dữ liệu thành công!",
            data: data,
        });
    }
    catch (error) {
        console.error("Lỗi ", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server",
        });
    }
});
exports.songOfSinger = songOfSinger;
//[GET] /client/songs/topic/:idTopic
const songOfTopic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idTopic = req.params.idTopic;
        const songs = yield song_model_1.default.find({ deleted: false, topic_id: idTopic })
            .populate("topic_id")
            .select("-createdAt -updatedAt -deleted");
        const data = yield render(songs);
        return res.json({
            success: true,
            message: "Lấy dữ liệu thành công!",
            data: data,
        });
    }
    catch (error) {
        console.error("Lỗi ", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server",
        });
    }
});
exports.songOfTopic = songOfTopic;
//[GET] /client/songs/listens?limit=3
const listenMuch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit = 3 } = req.query;
        const songs = yield song_model_1.default.find({ deleted: false })
            .sort({ listen: "desc" })
            .limit(Number(limit))
            .select("-createdAt -updatedAt -deleted");
        const data = yield render(songs);
        return res.json({
            success: true,
            message: "Lấy dữ liệu thành công!",
            data,
        });
    }
    catch (error) {
        console.error("Lỗi ", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server",
        });
    }
});
exports.listenMuch = listenMuch;
//[GET] /client/songs/wishlist
const wishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const favoriteSongs = res.locals.favoriteSongs.songs || [];
        const songs = yield song_model_1.default.find({ deleted: false }).select("-createdAt -updatedAt -deleted");
        const data = yield render(songs);
        const result = [];
        for (const item of data) {
            if (favoriteSongs.includes(item._id)) {
                result.push(item);
            }
        }
        return res.status(200).json({
            success: true,
            message: "Lấy dữ liệu thành công!",
            data: result,
        });
    }
    catch (error) {
        console.error("Lỗi ", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server",
        });
    }
});
exports.wishlist = wishlist;
//[PATCH] /client/songs/wishlist/:statusWishList/:idSong
const changeWishList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let Status;
        (function (Status) {
            Status["like"] = "like";
            Status["dislike"] = "dislike";
        })(Status || (Status = {}));
        const status = req.params.statusWishList;
        const idSong = req.params.idSong;
        const favoriteSongs = res.locals.favoriteSongs.songs || [];
        const check = favoriteSongs.includes(idSong);
        const song = yield song_model_1.default.findOne({ deleted: false, _id: idSong });
        switch (status) {
            case Status.like: {
                if (!check) {
                    yield client_model_1.default.updateOne({ deleted: false, status: "active", token: res.locals.token }, {
                        $push: { "favorites.songs": idSong },
                    });
                    yield song_model_1.default.updateOne({
                        deleted: false,
                        _id: idSong
                    }, {
                        like: Number(song.like) + 1
                    });
                    return res.status(200).json({
                        success: true,
                        message: "Thêm bài hát vào danh sách yêu thích thành công!",
                    });
                }
                else {
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
                        yield client_model_1.default.updateOne({ deleted: false, status: "active", token: res.locals.token }, { $pull: { "favorites.songs": idSong } });
                        yield song_model_1.default.updateOne({
                            deleted: false,
                            _id: idSong
                        }, {
                            like: Number(song.like) - 1
                        });
                        return res.status(200).json({
                            success: true,
                            message: "Xóa bài hát khỏi danh sách yêu thích thành công!",
                        });
                    }
                    else {
                        return res.status(400).json({
                            success: false,
                            message: "Bài hát không có trong danh sách yêu thích!",
                        });
                    }
                }
            default:
                break;
        }
    }
    catch (error) {
        console.error("Lỗi ", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server",
        });
    }
});
exports.changeWishList = changeWishList;
function createSlug(keyword) {
    return (0, unidecode_1.default)(keyword)
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Loại bỏ ký tự đặc biệt
        .replace(/[\s]+/g, "-") // thay space bằng dấu cách
        .replace(/^-+|-+$/g, ""); // loại bỏ gạch đầu dòng;
}
//[GET] /clien/songs/search
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { keyword = null, page = 1 } = req.query;
        const slug = createSlug(String(keyword));
        const slugSearch = new RegExp(slug, "i");
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
        const songs = yield song_model_1.default.find(find).select("-createdAt -updatedAt -deleted");
        const songsNew = yield render(songs);
        return res.status(200).json({
            success: true,
            message: "Lấy dữ liệu thành công!",
            data: songsNew
        });
    }
    catch (error) {
        console.error("Lỗi ", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server",
        });
    }
});
exports.search = search;
