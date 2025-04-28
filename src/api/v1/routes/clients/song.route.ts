import { Router } from "express";
// import multer from "multer";
// const storage = multer.memoryStorage();
// const upload = multer();
const router: Router = Router();
import * as controller from "../../controllers/client/song.controller";
import * as middleware  from "../../middlewares/client/index.middleware";
//[GET] /client/songs
router.get("/", controller.index);
//[GET] /client/songs/detail/:idSong
router.get("/detail/:idSong" , controller.detailSong)
//[GET] /client/songs/singer/:idSinger
router.get("/singer/:idSinger", controller.songOfSinger);
//[GET] /client/songs/topic/:idTopic
router.get("/topic/:idTopic", controller.songOfTopic)
//[GET] /client/songs/listens
router.get("/listens", controller.listenMuch)

//[GET] /client/songs/wishlist
router.get("/wishlist", middleware.middlewareAuthen ,  controller.wishlist)
//[PATCH] /client/songs/wishlist/:statusWishList/:idSong
router.patch("/wishlist/:statusWishList/:idSong", middleware.middlewareAuthen , controller.changeWishList)
//[GET] /clien/songs/search
router.get("/search" , controller.search)
export const routerSong: Router = router;
