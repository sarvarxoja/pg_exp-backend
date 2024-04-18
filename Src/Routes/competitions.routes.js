import { Router } from "express";
import competitionsController from "../Controllers/competitions/competitions.controller.js";
import { upload } from "../Utils/multer.js";
import competitionMiddleware from "../Middlewares/competition.middleware.js";
import token from "../Middlewares/token.js";

export const competition_router = Router();

competition_router
  .post(
    "/create",
    token.checkAdminToken,
    upload.single("cm_banner"),
    competitionMiddleware.checkCompetitionValue,
    competitionsController.createCompetitions
  )
  .post(
    "/participation",
    token.checkUserToken,
    competitionMiddleware.participationMiddleware,
    competitionsController.usingCompetition
  )
  .get("/gamers", token.checkAdminToken, competitionsController.getGamers)
  .get("/all", competitionsController.getCompetitions)
  .get("/:id", competitionsController.findCmId)
  .delete(
    "/:id",
    token.checkAdminToken,
    competitionsController.deleteCompetition
  );
