"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// @ts-ignore
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
mongoose_1.default.plugin(mongoose_slug_updater_1.default);
const songSchema = new mongoose_1.default.Schema({
    title: {
        required: true,
        type: String,
    },
    slug: { type: String, slug: "title", unique: true },
    singers: [
        {
            singer_id: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Singer",
                required: true,
            },
        },
    ],
    topic_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Topic",
        required: true,
    },
    description: String,
    audio: Array,
    thumbnail: Array,
    lyric: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    listen: {
        type: Number,
        default: 0,
    },
    like: {
        type: Number,
        default: 0,
    },
    status: String,
    isFeatured: {
        // Bài hát nổi bật
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const Song = mongoose_1.default.model("Song", songSchema, "songs");
exports.default = Song;
