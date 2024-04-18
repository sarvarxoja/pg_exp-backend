import { ProductsModel } from "../Model/products/product.model.js";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";

export default {
  async checkShop(req, res, next) {
    try {
      let { product_id, game_id } = req.body;

      if (!req.file) {
        return res.status(400).json({
          msg: "to'lov qiling va screen rasmini joylashtiring",
          staus: 400,
        });
      }

      if (!product_id || !game_id) {
        fs.unlinkSync(path.join(process.cwd(), "uploads", req.file.filename));
        return res
          .status(400)
          .json({ msg: "ma'lumotlar toliq kiritilmagan", staus: 400 });
      }

      let productData = await ProductsModel.findById({ _id: product_id });

      if (!productData) {
        fs.unlinkSync(path.join(process.cwd(), "uploads", req.file.filename));
        return res.status(400).json({ msg: "wrong product id", staus: 400 });
      }

      if (isNaN(game_id)) {
        return res
          .status(400)
          .json({ msg: "game_id must be number", status: 400 });
      }

      return next();
    } catch (error) {
      console.log(error.message);
    }
  },
};
