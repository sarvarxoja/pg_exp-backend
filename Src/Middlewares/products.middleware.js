export default {
  async checkProduct(req, res, next) {
    try {
      let { price, amount } = req.body;

      if (isNaN(price)) {
        return res
          .status(400)
          .json({ msg: "price must be number", status: 400 });
      }

      if (isNaN(amount)) {
        return res
          .status(400)
          .json({ msg: "amount must be number", status: 400 });
      }

      return next();
    } catch (error) {
      console.log(error.message);
    }
  },
};
