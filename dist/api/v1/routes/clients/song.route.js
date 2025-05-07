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
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerSong = void 0;
const express_1 = require("express");
// import multer from "multer";
// const storage = multer.memoryStorage();
// const upload = multer();
const router = (0, express_1.Router)();
const controller = __importStar(require("../../controllers/client/song.controller"));
const middleware = __importStar(require("../../middlewares/client/index.middleware"));
//[GET] /client/songs
router.get("/", controller.index);
//[GET] /client/songs/detail/:idSong
router.get("/detail/:idSong", controller.detailSong);
//[GET] /client/songs/singer/:idSinger
router.get("/singer/:idSinger", controller.songOfSinger);
//[GET] /client/songs/topic/:idTopic
router.get("/topic/:idTopic", controller.songOfTopic);
//[GET] /client/songs/listens
router.get("/listens", controller.listenMuch);
// [PATCH] /client/songs/increase-view/:idSong
router.patch("/increase-view/:idSong", controller.increaseView);
//[GET] /client/songs/wishlist
router.get("/wishlist", middleware.middlewareAuthen, controller.wishlist);
//[PATCH] /client/songs/wishlist/:statusWishList/:idSong
router.patch("/wishlist/:statusWishList/:idSong", middleware.middlewareAuthen, controller.changeWishList);
//[GET] /clien/songs/search
router.get("/search", controller.search);
exports.routerSong = router;
