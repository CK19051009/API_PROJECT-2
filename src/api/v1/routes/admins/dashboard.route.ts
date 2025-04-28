import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controllers/admin/dashboard.controller";
//[GET] /admin/dashboard
router.get("/", controller.index);

export const routerDashboard: Router = router;
