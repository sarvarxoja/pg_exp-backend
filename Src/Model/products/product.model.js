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
});

export const ProductsModel = mongoose.model("Products", Products);
