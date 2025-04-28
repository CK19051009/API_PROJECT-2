import { Router } from "express";
const router: Router = Router();
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import * as middlewareClodinary from "../../middlewares/admin/cloudinay.middlewares";
import * as controller from "../../controllers/admin/topic.controller";

//[GET] /admin/topics
router.get("/", controller.index);
//[POST] /admin/topics/create
router.post(
  "/create",
  upload.single("avatar"),
  middlewareClodinary.cloudImage,
  controller.createTopic
);
//[PATCH] /admin/topics/edit/:id
router.patch("/edit/:id", controller.editTopic);
export const routerTopic: Router = router;
