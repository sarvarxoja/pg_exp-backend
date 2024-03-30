import { UserModel } from "../../Model/user/user.model.js";
import { comparePassword } from "../../Utils/bycrypt.js";
import { jwtSign } from "../../Utils/jwt.js";

export default {
  async authLogin(req, res) {
    try {
      let { email, password } = req.body;

      let data = await UserModel.findOne({ email: email });
      if (data) {
        let check_password = await comparePassword(password, data.password);
        if (check_password) {
          await UserModel.updateOne({ _id: data.id }, { last_login: Date.now() })

          return res.status(200).json({
            id: data.id,
            username: data.username,
            email: data.email,
            status: 200,
            access_token: await jwtSign(data.id, data.is_admin),
          });
        }
        if (!check_password) {
          return res.status(401).json({
            msg: "wrong email or password",
            status: 401,
          });
        }
      }
      if (!data) {
        return res.status(401).json({
          msg: "wrong email or password",
          status: 401,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
