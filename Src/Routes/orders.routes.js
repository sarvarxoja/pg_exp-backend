import { Router } from "express";
import orderController from "../Controllers/Order/order.controller.js";
import token from "../Middlewares/token.js";
import orderMiddleware from "../Middlewares/order.middleware.js";

export const order_router = Router();

order_router
  .get("/all", token.checkAdminToken, orderController.getOrder)
  .get("/bought/me", token.checkUserToken, orderController.getMyOrder)
  .get("/sold/me", token.updateUserToken, orderController.getSoldMe)
  .put(
    "/:order_id",
    token.updateUserToken,
    orderMiddleware.orderCheck,
    orderController.updateOrder
  );
