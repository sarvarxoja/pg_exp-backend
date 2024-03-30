import { Router } from "express";
import usersController from "../Controllers/users/users.controller.js";
import usersMiddleware from "../Middlewares/users.middleware.js";
import token from "../Middlewares/token.js";

export const user_router = Router();

user_router
  .put(
    "/user/update",
    token.updateUserToken,
    usersMiddleware.userUpdate,
    usersController.updateUser
  )
  .get("/users/all", token.checkAdminToken, usersController.getUser)
  .get("/user/:id", token.checkAdminToken, usersController.getUserId)
  .get("/users/query", token.checkAdminToken, usersController.getQuery);
