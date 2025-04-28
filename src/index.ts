import express, { Application } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { routerAdmins } from "./api/v1/routes/admins/index";
import { routerClients } from "./api/v1/routes/clients/index";
dotenv.config();
import { dataConnect } from "./api/v1/config/database.config";
const port: Number = Number(process.env.PORT) || 3000;
dataConnect();
const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

routerAdmins(app);
routerClients(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
