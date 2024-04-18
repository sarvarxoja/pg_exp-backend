import mongoose from "mongoose";
import { Schema } from "mongoose";
import { UserModel } from "../user/user.model.js";
import { ProductsModel } from "../products/product.model.js";

const Order = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },

  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },

  paid: {
    type: String,
    required: false,
  },

  completed_orders: {
    type: Boolean,
    default: false,
  },

  game_id: {
    type: Number,
    required: false,
  },

  created: {
    type: Date,
    default: Date,
  },
});

export const OrderModel = mongoose.model("Orders", Order);
