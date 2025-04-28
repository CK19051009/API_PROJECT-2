"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const index_1 = require("./api/v1/routes/admins/index");
const index_2 = require("./api/v1/routes/clients/index");
dotenv_1.default.config();
const database_config_1 = require("./api/v1/config/database.config");
const port = Number(process.env.PORT) || 3000;
(0, database_config_1.dataConnect)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
(0, index_1.routerAdmins)(app);
(0, index_2.routerClients)(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
