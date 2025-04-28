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
exports.logout = exports.login = exports.register = void 0;
const client_model_1 = __importDefault(require("../../models/client.model"));
const md5_1 = __importDefault(require("md5"));
const create_token_1 = require("../../helpers/create.token");
//[GET] /client/authen/register
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Gửi đủ trường bạn ơi!"
            });
        }
        console.log(email);
        const clientExist = yield client_model_1.default.findOne({ deleted: false, status: "active", email: email });
        console.log(clientExist);
        if (clientExist) {
            return res.status(400).json({
                success: false,
                message: "Người dùng đã tồn tại!"
            });
        }
        const data = {
            fullName: String(fullName),
            email: String(email),
            token: (0, create_token_1.createToken)(40),
            password: (0, md5_1.default)(String(password))
        };
        console.log(data);
        const clientNew = new client_model_1.default(data);
        yield clientNew.save();
        return res.status(200).json({
            success: true,
            message: "Tạo tài khoản thành công!",
            token: clientNew.token
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
exports.register = register;
//[POST] /client/authen/login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Gửi đủ trường bạn ơi!"
            });
        }
        const clientExist = yield client_model_1.default.findOne({ deleted: false, status: "active", email: email });
        if (!clientExist) {
            return res.status(400).json({
                success: false,
                message: "Người dùng gửi sai email!"
            });
        }
        if ((0, md5_1.default)(password) !== clientExist.password) {
            return res.status(400).json({
                success: false,
                message: "Người dùng gửi sai mật khẩu!"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Đăng nhập hệ thống thành công",
            token: clientExist.token
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
exports.login = login;
// [GET] /client/authen/logout
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("authToken");
        return res.status(200).json({
            success: true,
            message: "Đăng xuất thành công!"
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
exports.logout = logout;
