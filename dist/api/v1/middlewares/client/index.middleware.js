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
exports.middlewareAuthen = void 0;
const client_model_1 = __importDefault(require("../../models/client.model"));
const middlewareAuthen = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tokenAuhthor = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const clientExits = yield client_model_1.default.findOne({ deleted: false, status: "active", token: tokenAuhthor });
        if (!clientExits) {
            return res.status(400).json({
                success: false,
                message: "Người dùng không tồn tại!"
            });
        }
        res.locals.token = tokenAuhthor;
        res.locals.favoriteSongs = clientExits.favorites;
        next();
    }
    catch (error) {
        console.error("Lỗi ", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server",
        });
    }
});
exports.middlewareAuthen = middlewareAuthen;
