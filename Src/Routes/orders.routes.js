import { Router } from "express";
import orderController from "../Controllers/Order/order.controller.js";
import token from "../Middlewares/token.js";
import orderMiddleware from "../Middlewares/order.middleware.js";
import { upload } from "../Utils/multer.js";

export const order_router = Router();

order_router
  .get("/all", token.checkAdminToken, orderController.getOrder)
  .get("/me", token.checkUserToken, orderController.getMyOrder)
  .put(
    "/:order_id",
    token.checkAdminToken,
    orderMiddleware.orderCheck,
    orderController.updateOrder
  );
