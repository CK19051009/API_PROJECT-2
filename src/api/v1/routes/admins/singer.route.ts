import { Router } from "express";
const router: Router = Router();
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import * as controller from "../../controllers/admin/singer.controller";
import * as middlewareClodinary from "../../middlewares/admin/cloudinay.middlewares";

//[GET] /admin/singers
router.get("/", controller.index);
//[POST] /admin/singer/create
router.post(
  "/create",
  upload.single("avatar"),
  middlewareClodinary.cloudImage,
  controller.createSinger
);
//[PATCH] /admin/singer/edit/:id
router.patch(
  "/edit/:id",
  upload.single("avatar"),
  middlewareClodinary.cloudImage,
  controller.editSinger
);
export const routerSinger: Router = router;
