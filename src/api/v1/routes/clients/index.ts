import { Application } from "express";
import { routerSong } from "./song.route";
import { routerSinger } from "./singer.route";
import { routerTopic } from "./topic.route";
import { routerClient } from "./client.route";
export const routerClients = (app: Application) => {
  const version = "/api/v1/client";
  app.use(version + "/songs", routerSong);
  app.use(version + "/singers", routerSinger);
  app.use(version + "/topics", routerTopic);
  app.use(version + "/authen", routerClient);
};
