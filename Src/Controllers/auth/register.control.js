import { UserModel } from "../../Model/user/user.model.js";
import { encodePassword } from "../../Utils/bycrypt.js";
import client from "../../Config/redis.js";
import nodemailer from "nodemailer";
import { jwtSign } from "../../Utils/jwt.js";

export default {
  async register(req, res) {
    try {
      let { username, email, last_name, name, password } = req.body;

      let users = await UserModel.find();

      let check_username = users.find(
        (user) => user.username.toLowerCase() == `@${username.toLowerCase()}`
      );

      if (check_username) {
        return res.status(409).json({
          msg: "this username already exists",
          status: 409,
        });
      }

      let check_email = users.find(
        (user) => user.email.toLowerCase() == email.toLowerCase()
      );

      if (check_email) {
        return res.status(409).json({
          msg: "this email already exists",
          status: 409,
        });
      }

      const tokenData = {
        code: Math.floor(1000 + Math.random() * 9000).toString(),
      };

      password = await encodePassword(password);

      let db_data = await client.setEx(
        tokenData.code,
        120,
        JSON.stringify({
          username: `@${username}`,
          email: email,
          last_name: last_name,
          name: name,
          password: password,
        })
      );

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "muhammadiyevj768@gmail.com",
          pass: "epnclgkptkewibws",
        },
      });

      const mailOptions = {
        from: "muhammadiyevj768@gmail.com",
        to: email,
        subject: "Password Reset",
        text: `This is your registration confirmation code ${tokenData.code}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "An error occurred while sending the email" });
        } else {
          return res.status(200).json({
            msg: "Code sent successfully to your email",
            status: 200,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  async verify(req, res) {
    try {
      let { verify_code } = req.body;
      const userData = JSON.parse(await client.get(`${verify_code}`));

      if (!userData) {
        return res.status(401).json({ msg: "wrong verify code", status: 401 });
      }

      let created = await UserModel.create({
        username: userData.username,
        name: userData.name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password,
      });

      await client.del(`${verify_code}`);

      res.status(201).json({
        id: created.id,
        name: created.name,
        last_name: created.last_name,
        username: created.username,
        email: created.email,
        access_token: await jwtSign(
          created.id,
          created.is_admin,
        ),
      });
    } catch (error) {
      console.log(error);
    }
  },
};
