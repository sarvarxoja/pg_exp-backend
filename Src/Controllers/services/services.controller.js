import { UserModel } from "../../Model/user/user.model.js";

export default {
  async getService(req, res) {
    try {
      let response = await UserModel.find({ is_shop: true });

      if (!response.length) {
        return res.status(404).json({ msg: "data not found", status: 404 });
      }

      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
    }
  },
  async getPopularService(req, res) {
    try {
      let response = await UserModel.find({ is_famous: true });

      if (!response.length) {
        return res.status(404).json({ msg: "data not found", status: 404 });
      }

      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
    }
  },
};
