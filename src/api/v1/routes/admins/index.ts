import { Application } from "express";
import { routerDashboard } from "./dashboard.route";
import { routerSong } from "./song.route";
import { routerSinger } from "./singer.route";
import { routerTopic } from "./topic.route";
export const routerAdmins = (app: Application) => {
  const version = "/api/v1/admin";
  app.use(version + "/dashboard", routerDashboard);
  app.use(version + "/songs", routerSong);
  app.use(version + "/singers", routerSinger);
  app.use(version + "/topics", routerTopic);
};
