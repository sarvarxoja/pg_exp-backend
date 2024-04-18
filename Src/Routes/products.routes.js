import { Router } from "express";
import token from "../Middlewares/token.js";
import productController from "../Controllers/products/product.controller.js";
import productsMiddleware from "../Middlewares/products.middleware.js";

export const products_router = Router();

products_router
  .post(
    "/create",
    token.checkShopToken,
    productsMiddleware.checkProduct,
    productController.createProduct
  )
  .get("/all", productController.getProducts);
