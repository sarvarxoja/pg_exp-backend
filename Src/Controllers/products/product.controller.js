import { ProductsModel } from "../../Model/products/product.model.js";
import jwt from "jsonwebtoken";

export default {
  async createProduct(req, res) {
    try {
      let { price, amount } = req.body;
      let { access_token } = req.headers;
      const SECRET_KEY = process.env.SECRET_KEY;

      const payload = jwt.verify(access_token, SECRET_KEY);

      let productData = await ProductsModel.create({
        price: price,
        amount: amount,
        user_id: payload.id,
      });

      res
        .status(201)
        .json({ msg: "data added successfully", status: 201, productData });
    } catch (error) {
      console.log(error.message);
    }
  },

  async getProducts(req, res) {
    try {
      let response = await ProductsModel.find().populate("user_id");

      if (!response.length) {
        return res.status(404).json({ msg: "data not found", status: 404 });
      }

      const randomSort = () => {
        return response.sort(() => Math.random() - 0.5);
      };
      const randomData = randomSort();

      res.status(200).json(randomData);
    } catch (error) {
      console.log(error.message);
    }
  },
};
