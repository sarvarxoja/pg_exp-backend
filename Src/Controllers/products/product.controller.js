import { ProductsModel } from "../../Model/products/product.model.js";

export default {
  async createProduct(req, res) {
    try {
      let { price, amount } = req.body;

      let productData = await ProductsModel.create({
        price: price,
        amount: amount,
      });

      res.status(201).json({ msg: "data added successfully", status: 201 });
    } catch (error) {
      console.log(error.message);
    }
  },

  async getProducts(req, res) {
    try {
      let response = await ProductsModel.findAll();

      if (!response.length) {
        return res.status(404).json({ msg: "data not found", status: 404 });
      }

      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
    }
  },
};
