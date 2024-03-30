import "dotenv/config";
import path from "path";
import express from "express";
import connection from "./Config/index.js";
import { auth_router } from "./Routes/auth.routes.js";
import { shop_router } from "./Routes/shop.routes.js";
import { user_router } from "./Routes/user.routes.js";
import { order_router } from "./Routes/orders.routes.js";
import { products_router } from "./Routes/products.routes.js";

async function serverStart() {
  try {
    const app = express();
    const PORT = process.env.PORT || 1400;

    app.use(express.json());
    app.use("/api/auth", auth_router);
    app.use("/api/products", products_router);
    app.use("/api/buy", shop_router);
    app.use("/api/orders", order_router);
    app.use("/api/", user_router);
    app.use(express.static(path.join(path.resolve(), "uploads")));

    app.listen(PORT, console.log("server running on " + PORT + " port"));
  } catch (error) {
    console.log(error + " in server.js");
  }
}

serverStart();
