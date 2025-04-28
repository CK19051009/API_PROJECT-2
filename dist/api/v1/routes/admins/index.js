"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAdmins = void 0;
const dashboard_route_1 = require("./dashboard.route");
const song_route_1 = require("./song.route");
const singer_route_1 = require("./singer.route");
const topic_route_1 = require("./topic.route");
const routerAdmins = (app) => {
    const version = "/api/v1/admin";
    app.use(version + "/dashboard", dashboard_route_1.routerDashboard);
    app.use(version + "/songs", song_route_1.routerSong);
    app.use(version + "/singers", singer_route_1.routerSinger);
    app.use(version + "/topics", topic_route_1.routerTopic);
};
exports.routerAdmins = routerAdmins;
