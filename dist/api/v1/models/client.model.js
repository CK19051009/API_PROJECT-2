"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const clientSchema = new mongoose_1.default.Schema({
    fullName: {
        required: true,
        type: String,
        trim: true,
    },
    email: String,
    password: String,
    token: String,
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
    avatar: String,
    status: {
        type: String,
        default: "active"
    },
    favorites: {
        songs: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Song' }],
    },
}, {
    timestamps: true,
});
const Client = mongoose_1.default.model("Client", clientSchema, "clients");
exports.default = Client;
