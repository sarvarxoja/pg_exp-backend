import mongoose from "mongoose";
import { Schema } from "mongoose";
import { UserModel } from "../user/user.model.js";
import { ProductsModel } from "../products/product.model.js";

const Order = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    require: true,
  },

  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    require: true,
  },

  paid: {
    type: String,
    allowNull: false,
  },

  completed_orders: {
    type: Boolean,
    default: false,
  },

  game_id: {
    type: Number,
    allowNull: false,
  },

  created: {
    type: Date,
    default: Date
  }
});

export const OrderModel = mongoose.model("Orders", Order);
