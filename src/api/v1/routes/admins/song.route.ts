import { Router } from "express";
import multer from "multer";
// const storage = multer.memoryStorage();
const upload = multer();
const router: Router = Router();
import * as controller from "../../controllers/admin/song.controller";
import * as middlewareClodinary from "../../middlewares/admin/cloudinay.middlewares";
//[GET] /admin/songs
router.get("/", controller.index);
//[POST] /admin/songs/create
router.post(
  "/create",
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "audio",
      maxCount: 1,
    },
  ]),
  middlewareClodinary.cloudFileds,
  controller.createSong
);
//[PATCH] /admin/songs/edit/:id
router.patch(
  "/edit/:id",
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "audio",
      maxCount: 1,
    },
  ]),
  middlewareClodinary.cloudFileds,
  controller.editSong
);
export const routerSong: Router = router;
