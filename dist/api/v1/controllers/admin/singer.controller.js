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
exports.editSinger = exports.createSinger = exports.index = void 0;
const singer_model_1 = __importDefault(require("../../models/singer.model"));
//[GET] /admin/singers?page=1&keyword=?&status=?&
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { keyword = null, status = null } = req.query;
        const find = {
            deleted: false,
        };
        const allSingers = yield singer_model_1.default.countDocuments(find);
        let page = 1;
        let limit = 4;
        if (req.query.page) {
            page = Number(req.query.page);
        }
        if (req.query.limit) {
            limit = Number(req.query.limit);
        }
        const singers = yield singer_model_1.default.find(find)
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
//[POST] /admin/singer/create
const createSinger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, description, follower, avatar, nickName, status, gender, } = req.body;
        if (!fullName) {
            return res.status(400).json({
                success: false,
                message: "Tên ca sĩ là bắt buộc là bắt buộc",
            });
        }
        const data = {
            fullName,
            description,
            avatar,
            nickName,
            status,
            follower,
            gender,
        };
        const singerNew = new singer_model_1.default(data);
        yield singerNew.save();
        return res.status(200).json({
            success: true,
            message: "Tạo ca sĩ thành công!",
            data: singerNew,
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
exports.createSinger = createSinger;
//[PATCH] /admin/singer/edit/:id
const editSinger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { fullName, description, follower, avatar, nickName, status, gender, } = req.body;
        if (!fullName) {
            return res.status(400).json({
                success: false,
                message: "Tên ca sĩ là bắt buộc là bắt buộc",
            });
        }
        const data = {
            fullName,
            description,
            avatar,
            nickName,
            status,
            follower,
            gender,
        };
        yield singer_model_1.default.updateOne({ _id: id, deleted: false, status: "active" }, { $set: data });
        return res.json({
            success: true,
            message: "Cập nhập ca sĩ thành công!",
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
exports.editSinger = editSinger;
