import { OrderModel } from "../../Model/order/order.model.js";
import jwt from "jsonwebtoken";

export default {
  async shopUc(req, res) {
    try {
      let { user_id, product_id, game_id } = req.body;

      let { access_token } = req.headers;
      const SECRET_KEY = process.env.SECRET_KEY;
      let payload = jwt.verify(access_token, SECRET_KEY);

      await OrderModel.create({
        user_id: payload.id,
        product_id: product_id,
        paid: `/${req.file.filename}`,
        game_id: game_id,
      });

      res.status(201).json({ msg: "Xaridingiz uchun rahmat", status: 201 });
    } catch (error) {
      console.log(error.message);
    }
  },
};
