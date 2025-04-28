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
exports.editSong = exports.createSong = exports.index = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
//[GET] /admin/songs
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield song_model_1.default.find({ deleted: false });
        // console.log(songs)
        return res.json({
            success: true,
            message: "Lấy dữ liệu thành công!",
            data: songs,
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
//[POST] /admin/songs/create
const createSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, singers, topic_id, description, thumbnail, lyric, status, audio, isFeatured, } = req.body;
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Tiêu đề bài hát là bắt buộc",
            });
        }
        const data = {
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
        const songNew = new song_model_1.default(data);
        yield songNew.save();
        return res.json({
            success: true,
            message: "Tạo bài hát thành công",
            data: songNew,
        });
    }
    catch (error) {
        console.error("Lỗi khi tạo bài hát:", error);
        return res.status(500).json({
            success: false,
            message: "Đã xảy ra lỗi khi tạo bài hát",
        });
    }
});
exports.createSong = createSong;
//[PATCH] /admin/songs/edit/:id
const editSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { title, singers, topic_id, description, thumbnail, lyric, status, audio, isFeatured, listen, like, } = req.body;
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Tiêu đề bài hát là bắt buộc",
            });
        }
        const data = {
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
        yield song_model_1.default.updateOne({ _id: id, deleted: false }, { $set: data });
        return res.json({
            success: true,
            message: "Cập nhập bài hát thành công",
        });
    }
    catch (error) {
        console.error("Lỗi khi tạo bài hát:", error);
        return res.status(500).json({
            success: false,
            message: "Đã xảy ra lỗi khi tạo bài hát",
        });
    }
});
exports.editSong = editSong;
