import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controllers/client/client.controller";
//[POST] /client/authen/register
router.post("/register", controller.register);
//[POST] /client/authen/login
router.post("/login", controller.login);
// //[GET] /client/authen/logout
router.get("/logout" , controller.logout)
export const routerClient: Router = router;