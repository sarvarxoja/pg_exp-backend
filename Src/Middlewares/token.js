import jwt from "jsonwebtoken";
import { UserModel } from "../Model/user/user.model.js";

export default {
  async checkAdminToken(req, res, next) {
    try {
      let { access_token } = req.headers;
      const SECRET_KEY = process.env.SECRET_KEY;

      const payload = jwt.verify(access_token, SECRET_KEY);

      if (payload) {
        let userData = await UserModel.findOne({ _id: payload.id });

        if (!userData) {
          return res.status(401).json({ msg: "invalide token", status: 401 });
        }

        if (userData.is_admin !== true) {
          return res
            .status(401)
            .json({ msg: "You have no right to do so", status: 401 });
        }

        return next();
      }
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ msg: "invalide token", status: 401 });
      }
      console.log(error.message);
    }
  },

  async checkUserToken(req, res, next) {
    try {
      let { access_token } = req.headers;
      const SECRET_KEY = process.env.SECRET_KEY;

      const payload = jwt.verify(access_token, SECRET_KEY);

      if (payload) {
        let userData = await UserModel.findOne({ _id: payload.id });

        if (!userData) {
          return res.status(401).json({ msg: "invalide token", status: 401 });
        }

        if (userData.is_blocked === true) {
          return res
            .status(401)
            .json({ msg: "You have no right to do so", status: 401 });
        }

        return next();
      }
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ msg: "invalide token", status: 401 });
      }
      console.log(error.message);
    }
  },

  async checkShopToken(req, res, next) {
    try {
      let { access_token } = req.headers;
      const SECRET_KEY = process.env.SECRET_KEY;

      const payload = jwt.verify(access_token, SECRET_KEY);

      if (payload) {
        let userData = await UserModel.findOne({ _id: payload.id });

        if (!userData) {
          return res.status(401).json({ msg: "invalide token", status: 401 });
        }

        if (userData.is_blocked === true) {
          return res
            .status(401)
            .json({ msg: "You have no right to do so", status: 401 });
        }

        if (userData.is_shop !== true) {
          return res
            .status(401)
            .json({ msg: "You have no right to do so", status: 401 });
        }

        return next();
      }
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ msg: "invalide token", status: 401 });
      }
      console.log(error.message);
    }
  },

  async updateUserToken(req, res, next) {
    try {
      let { access_token } = req.headers;
      const SECRET_KEY = process.env.SECRET_KEY;

      const payload = jwt.verify(access_token, SECRET_KEY);

      if (payload) {
        let userData = await UserModel.findOne({ _id: payload.id });

        if (!userData) {
          return res.status(401).json({ msg: "invalide token", status: 401 });
        }

        return next();
      }
    } catch (error) {
      // console.log(error.message);
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ msg: "invalide token", status: 401 });
      }
    }
  },
};
