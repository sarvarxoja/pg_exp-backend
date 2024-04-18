export default {
  async userUpdate(req, res, next) {
    try {
      let { username, name, password, last_name, user_bio } = req.body;

      if (
        !username &&
        !name &&
        !password &&
        !last_name &&
        !user_bio &&
        !req.file
      ) {
        return res
          .status(400)
          .json({ msg: "ma'lumotlar toliq kiritilmagan", staus: 400 });
      }

      if (username) {
        if (
          username.length > 20 ||
          username.length < 4 ||
          !isNaN(username) ||
          /[@#!$%^&*:']/g.test(username)
        ) {
          return res
            .status(400)
            .json({ msg: "invalide username", status: 400 });
        }
      }

      if (user_bio) {
        if (user_bio.length > 70 || user_bio.length < 4) {
          return res.status(400).json({
            msg: "user_bio uzunligi 4 dan katta 70 dan kichik bo'lishi kerak",
            status: 400,
          });
        }
      }

      if (last_name) {
        if (
          !isNaN(last_name) ||
          last_name.length > 25 ||
          last_name.length < 4 ||
          /[@#!$%^&*:']/g.test(last_name)
        ) {
          return res
            .status(400)
            .json({ msg: "invalide last_name", status: 400 });
        }
      }

      if (name) {
        if (
          !isNaN(name) ||
          name.length > 20 ||
          name.length < 4 ||
          /[@#!$%^&*:']/g.test(name)
        ) {
          return res.status(400).json({ msg: "invalide name", status: 400 });
        }
      }

      if (password) {
        if (!isNaN(password) || password.length > 15 || password.length < 4) {
          return res
            .status(400)
            .json({ msg: "invalide password", status: 400 });
        }
      }

      return next();
    } catch (error) {
      console.log(error.message);
    }
  },
};
