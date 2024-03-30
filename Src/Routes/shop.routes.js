import { Router } from "express";
import shopController from "../Controllers/shop/shop.controller.js";
import token from "../Middlewares/token.js";
import { upload } from "../Utils/multer.js";
import shopMiddleware from "../Middlewares/shop.middleware.js";
import { shopLimiter } from "../Utils/limiter.js";

export const shop_router = Router();

shop_router.post(
  "/uc",
  token.checkUserToken,
  shopLimiter,
  upload.single("paid"),
  shopMiddleware.checkShop,
  shopController.shopUc
);
