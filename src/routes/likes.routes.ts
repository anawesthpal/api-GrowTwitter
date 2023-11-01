import { Router } from "express";
import { LikeController } from "../controllers";
import { Auth, DarLike } from "../middlewares";

export function likesRoutes() {
  const router = Router();
  const auth = new Auth();
  const darLike = new DarLike();
  const controller = new LikeController();

  router.post("/", [auth.validar, darLike.validar], controller.darLike); //dar like

  return router;
}
