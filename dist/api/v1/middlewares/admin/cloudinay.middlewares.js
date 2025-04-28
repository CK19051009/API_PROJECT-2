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
exports.cloudFileds = exports.cloudImage = void 0;
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});
const streamUpload = (buffer, resource_type = "image" // mặc định là image
) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({
            resource_type,
        }, (error, result) => {
            if (result)
                resolve(result);
            else
                reject(error);
        });
        streamifier_1.default.createReadStream(buffer).pipe(stream);
    });
};
const uploadToCloudinary = (buffer_1, ...args_1) => __awaiter(void 0, [buffer_1, ...args_1], void 0, function* (buffer, resource_type = "image") {
    const result = yield streamUpload(buffer, resource_type);
    return result.secure_url;
});
// upload single
const cloudImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file) {
            req.body[req.file.fieldname] = yield uploadToCloudinary(req.file.buffer);
        }
        next();
    }
    catch (error) {
        console.error("Error uploading single image:", error);
        res.status(500).json({
            message: "Error uploading image",
            code: 500,
        });
    }
});
exports.cloudImage = cloudImage;
// upload arrayImages
const cloudFileds = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.files) {
            const files = req.files;
            console.log("1 ", files);
            for (const key in files) {
                req.body[key] = [];
                console.log("Key ", key);
                for (const file of files[key]) {
                    try {
                        console.log("2", file);
                        const result = yield uploadToCloudinary(file.buffer, file.mimetype.startsWith("audio/") ? "video" : "image");
                        req.body[key].push(result);
                    }
                    catch (error) {
                        console.error("Error uploading image:", error);
                    }
                }
            }
        }
        next();
    }
    catch (error) {
        console.error("Error uploading images:", error);
        res.status(500).json({
            message: "Error uploading images",
            code: 500,
        });
    }
});
exports.cloudFileds = cloudFileds;
