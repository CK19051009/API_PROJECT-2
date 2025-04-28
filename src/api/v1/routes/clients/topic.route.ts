import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controllers/client/topic.controller";
//[GET] /client/topics/
router.get("/", controller.index);
//[GET] /client/topics/trending?limit=5
router.get("/trending", controller.trending)
//[GET] /client/topics/topic/:id
router.get("/detail/:id", controller.detailTopic);

export const routerTopic: Router = router;
