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
exports.editTopic = exports.createTopic = exports.index = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
//[GET] /admin/topics
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singers = yield topic_model_1.default.find({ deleted: false });
        return res.json({
            success: true,
            message: "Lấy dữ liệu thành công!",
            data: singers,
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
//[POST] /admin/topics/create
const createTopic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, avatar, status, isTrending } = req.body;
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Tên chủ đề bắt buộc là bắt buộc",
            });
        }
        if (req.body.order == null) {
            const all = yield topic_model_1.default.countDocuments();
            req.body.order = Number(all) + 1;
        }
        const data = {
            title,
            description,
            avatar,
            status,
            isTrending,
            order: req.body.order,
        };
        const topicNew = new topic_model_1.default(data);
        yield topicNew.save();
        return res.status(200).json({
            success: true,
            message: "Tạo chủ đề thành công!",
            data: topicNew,
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
exports.createTopic = createTopic;
//[PATCH] /admin/topics/edit/:id
const editTopic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const topicExist = yield topic_model_1.default.findOne({
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
        const data = {
            title,
            description,
            avatar,
            status,
            isTrending,
            order,
        };
        yield topic_model_1.default.updateOne({ deleted: false, status: "active", _id: id }, { $set: data });
        return res.status(200).json({
            success: true,
            message: "Cập nhập chủ đề thành công!",
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
exports.editTopic = editTopic;
