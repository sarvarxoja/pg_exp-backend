import jwt from "jsonwebtoken";
import { encodePassword } from "../../Utils/bycrypt.js";
import { UserModel } from "../../Model/user/user.model.js";
import mongoose from "mongoose";

export default {
  async updateUser(req, res) {
    try {
      const SECRET_KEY = process.env.SECRET_KEY;
      let { access_token } = req.headers;
      let payload = jwt.verify(access_token, SECRET_KEY);

      let { username, name, last_name, password, user_bio } = req.body;

      let users = await UserModel.find();

      if (username) {
        let check_username = users.find(
          (user) => user.username.toLowerCase() == `@${username.toLowerCase()}`
        );

        if (check_username) {
          return res.status(409).json({
            msg: "this username already exists",
            status: 409,
          });
        }
        
      }

      if (username && name && password && last_name && user_bio) {
        password = await encodePassword(password);
        let userUpdated = await UserModel.updateMany(
          { _id: payload.id },
          {
            username: username,
            name: name,
            password: password,
            last_name: last_name,
            user_bio: user_bio,
          }
        );
        return res.status(200).json({
          msg: "successfully updated",
          data: userUpdated,
          status: 200,
        });
      }

      if (username) {
        let userUpdated = await UserModel.updateOne(
          { _id: payload.id },
          { username: username }
        );
        return res.status(200).json({
          msg: "successfully updated",
          data: userUpdated,
          status: 200,
        });
      }

      if (user_bio) {
        let userUpdated = await UserModel.updateOne(
          { _id: payload.id },
          { user_bio: user_bio }
        );
        return res.status(200).json({
          msg: "successfully updated",
          data: userUpdated,
          status: 200,
        });
      }

      if (name) {
        let userUpdated = await UserModel.updateOne(
          { _id: payload.id },
          { name: name }
        );
        return res.status(200).json({
          msg: "successfully updated",
          data: userUpdated,
          status: 200,
        });
      }

      if (last_name) {
        let userUpdated = await UserModel.updateOne(
          { _id: payload.id },
          { last_name: last_name }
        );
        return res.status(200).json({
          msg: "successfully updated",
          data: userUpdated,
          status: 200,
        });
      }

      if (name) {
        password = encodePassword(password);
        let userUpdated = await UserModel.updateOne(
          { _id: payload.id },
          { password: password }
        );
        return res.status(200).json({
          msg: "successfully updated",
          data: userUpdated,
          status: 200,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  async getUser(req, res) {
    try {
      let userData = await UserModel.find();

      let count = userData.length;

      if (!count) {
        return res.status(404).json({ msg: "data not found", status: 404 });
      }

      res.status(200).json({ userData, number_users: count });
    } catch (error) {
      console.log(error.message);
    }
  },

  async getUserId(req, res) {
    try {
      let { id } = req.params;

      let data = await UserModel.findOne({ _id: id });

      if (!data) {
        return res.status(404).json({ msg: "data not found", status: 404 });
      }

      res.status(200).json({ data, status: 200 });
    } catch (error) {
      if (error instanceof mongoose.MongooseError) {
        return res.status(401).json({ msg: "invalide id", status: 401 });
      }
    }
  },

  async getQuery(req, res) {
    try {
      let queryData = req.query;
      let userData = await UserModel.find(queryData);

      if (!userData.length) {
        return res.status(404).json({ msg: "data not found", status: 404 });
      }
      res.status(200).json({ userData, status: 200 });
    } catch (error) {
      console.log(error.message);
    }
  },
};
