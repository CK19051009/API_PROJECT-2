"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerClients = void 0;
const song_route_1 = require("./song.route");
const singer_route_1 = require("./singer.route");
const topic_route_1 = require("./topic.route");
const client_route_1 = require("./client.route");
const routerClients = (app) => {
    const version = "/api/v1/client";
    app.use(version + "/songs", song_route_1.routerSong);
    app.use(version + "/singers", singer_route_1.routerSinger);
    app.use(version + "/topics", topic_route_1.routerTopic);
    app.use(version + "/authen", client_route_1.routerClient);
};
exports.routerClients = routerClients;
