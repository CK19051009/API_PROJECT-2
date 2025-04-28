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
exports.featureSingers = exports.detailSinger = exports.index = void 0;
const singer_model_1 = __importDefault(require("../../models/singer.model"));
//[GET] /client/singers
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singers = yield singer_model_1.default.find({ deleted: false }).select("-createdAt -updatedAt -deleted");
        // console.log(data);
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
//[GET] /client/singers/detail/:id
const detailSinger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const singerExitst = yield singer_model_1.default.findOne({
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
    }
    catch (error) {
        console.error("Lỗi ", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server",
        });
    }
});
exports.detailSinger = detailSinger;
//[GET] /client/singers/feature
const featureSingers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit = 5 } = req.query;
        const singers = yield singer_model_1.default.find({ deleted: false, feature: true }).limit(Number(limit)).select("-createdAt -updatedAt -deleted");
        return res.status(200).json({
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
exports.featureSingers = featureSingers;
