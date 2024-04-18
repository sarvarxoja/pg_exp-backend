import { Router } from "express";
import { upload } from "../Utils/multer.js";
import usersController from "../Controllers/users/users.controller.js";
import usersMiddleware from "../Middlewares/users.middleware.js";
import token from "../Middlewares/token.js";
import servicesController from "../Controllers/services/services.controller.js";

export const user_router = Router();

user_router
  .put(
    "/user/update",
    upload.single("avatar"),
    token.updateUserToken,
    usersMiddleware.userUpdate,
    usersController.updateUser
  )
  .get("/users/all", token.checkAdminToken, usersController.getUser)
  .get("/user/:id", token.checkAdminToken, usersController.getUserId)
  .get("/users/query", usersController.getQuery)
  .get("/services/all", servicesController.getService)
  .get("/services/popular", servicesController.getPopularService);
