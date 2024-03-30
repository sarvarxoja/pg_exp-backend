import { Router } from "express";
import auth_controller from "../Controllers/auth/register.control.js";
import auth_login from "../Controllers/auth/login.control.js";
import authMiddleware from "../Middlewares/auth.middleware.js";
import { registerLimiter } from "../Utils/limiter.js";

export const auth_router = Router();

auth_router
  .post(
    "/register",
    authMiddleware.checkUserData,
    registerLimiter,
    auth_controller.register
  )
  .post("/verify", authMiddleware.checkVerifyCode, auth_controller.verify)
  .post("/login", authMiddleware.chekcLogin, auth_login.authLogin);
