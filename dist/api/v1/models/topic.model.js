"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const topicSchema = new mongoose_1.default.Schema({
    title: {
        required: true,
        type: String,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    avatar: String,
    status: String,
    description: String,
    isTrending: {
        // Chủ đề đang hot
        type: Boolean,
        default: false,
    },
    order: {
        // Thứ tự hiển thị
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
const Topic = mongoose_1.default.model("Topic", topicSchema, "topics");
exports.default = Topic;
