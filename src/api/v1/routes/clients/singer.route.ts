import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controllers/client/singer.controller";
//[GET] /client/singers/
router.get("/", controller.index);
//[GET] /clients/singers/detail/:id
router.get("/detail/:id", controller.detailSinger);
//[GET] /client/singers/feature
router.get("/feature" , controller.featureSingers)
export const routerSinger: Router = router;
