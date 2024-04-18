import mongoose from "mongoose";
import { Schema } from "mongoose";

const Products = new Schema({
  price: {
    type: Number,
    require: true,
  },

  amount: {
    type: Number,
    require: true,
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    require: true,
  },
});

export const ProductsModel = mongoose.model("Products", Products);
