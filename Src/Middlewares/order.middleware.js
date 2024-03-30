export default {
  orderCheck(req, res, next) {
    try {
      let { completed_orders } = req.body;

      if (!completed_orders) {
        return res
          .status(400)
          .json({ msg: "ma'lumotlar toliq kiritilmagan", staus: 400 });
      }

      if (typeof completed_orders !== "boolean") {
        return res
          .status(400)
          .json({ msg: "completed_orders must be boolean", staus: 400 });
      }

      return next()
    } catch (error) {
        console.log(error.message)
    }
  },
};
