export default {
  async userUpdate(req, res, next) {
    try {
      let { username, name, password, last_name } = req.body;

      if (!username && !name && !password && !last_name) {
        return res
          .status(400)
          .json({ msg: "ma'lumotlar toliq kiritilmagan", staus: 400 });
      }

      if (
        username.length > 20 ||
        username.length < 4 ||
        !isNaN(username) ||
        /[@#!$%^&*:']/g.test(username)
      ) {
        return res.status(400).json({ msg: "invalide username", status: 400 });
      }

      if (
        !isNaN(last_name) ||
        last_name.length > 25 ||
        last_name.length < 4 ||
        /[@#!$%^&*:']/g.test(last_name)
      ) {
        return res.status(400).json({ msg: "invalide last_name", status: 400 });
      }

      if (
        !isNaN(name) ||
        name.length > 20 ||
        name.length < 4 ||
        /[@#!$%^&*:']/g.test(name)
      ) {
        return res.status(400).json({ msg: "invalide name", status: 400 });
      }

      if (!isNaN(password) || password.length > 15 || password.length < 4) {
        return res.status(400).json({ msg: "invalide password", status: 400 });
      }

      return next();
    } catch (error) {
      console.log(error.message);
    }
  },
};
