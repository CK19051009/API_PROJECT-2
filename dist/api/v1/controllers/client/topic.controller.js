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
exports.detailTopic = exports.trending = exports.index = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
//[GET] /client/topics
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topics = yield topic_model_1.default.find({ deleted: false, status: "active" }).select("-createdAt -updatedAt -deleted");
        return res.json({
            success: true,
            message: "Lấy dữ liệu thành công!",
            data: topics,
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
//[GET] /client/topics/trending?limit=5
const trending = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit = 5 } = req.query;
        const topics = yield topic_model_1.default.find({ deleted: false, status: "active", isTrending: true }).select("-createdAt -updatedAt -deleted").limit(Number(limit));
        return res.json({
            success: true,
            message: "Lấy dữ liệu thành công!",
            data: topics,
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
exports.trending = trending;
//[GET] /client/topics/detail/:id
const detailTopic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        //   console.log(id)
        const topicExitst = yield topic_model_1.default.findOne({
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
    }
    catch (error) {
        console.error("Lỗi ", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server",
        });
    }
});
exports.detailTopic = detailTopic;
