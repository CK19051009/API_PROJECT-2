"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const singerSchema = new mongoose_1.default.Schema({
    fullName: {
        required: true,
        type: String,
        trim: true,
    },
    nickName: String,
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "other",
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    follower: {
        type: Number,
        default: 0,
    },
    avatar: String,
    status: String,
    description: String,
    feature: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const Singer = mongoose_1.default.model("Singer", singerSchema, "singers");
exports.default = Singer;
