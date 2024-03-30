import { OrderModel } from "../../Model/order/order.model.js";
import jwt from "jsonwebtoken";

export default {
  async getOrder(req, res) {
    try {
      let order_data = await OrderModel.find()
        .populate("user_id")
        .populate("product_id");

      if (!order_data.length) {
        return res.status(404).json({ msg: "data not found", status: 404 });
      }

      res.status(200).json({ order_data, status: 200 });
    } catch (error) {
      console.log(error);
    }
  },

  async getMyOrder(req, res) {
    try {
      const SECRET_KEY = process.env.SECRET_KEY;
      let { access_token } = req.headers;

      const payload = jwt.verify(access_token, SECRET_KEY);
      console.log(payload);

      let userData = await OrderModel.find({ user_id: payload.id })
        .populate("user_id")
        .populate("product_id");

      console.log(userData);
      if (!userData.length) {
        return res.status(404).json({ msg: "data not found", status: 404 });
      }

      res.status(200).json({ userData, status: 200 });
    } catch (error) {
      console.log(error.message);
    }
  },

  async updateOrder(req, res) {
    try {
      let { order_id } = req.params;
      let { completed_orders } = req.body;

      let orderData = await OrderModel.findById({ _id: order_id });

      if (!orderData) {
        return res.status(404).json({ msg: "data not found", status: 404 });
      }

      let order_update_data = await OrderModel.updateOne(
        { _id: orderData._id },
        { completed_orders: completed_orders }
      );

      res
        .status(200)
        .json({ order_update_data, msg: "successfully updated", status: 200 });
    } catch (error) {
      console.log(error.message);
    }
  },
};
