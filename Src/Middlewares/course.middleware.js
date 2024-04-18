export default {
  async checkCourseValues(req, res, next) {
    try {
      let { course_name, price, about_course } = req.body;

      if (!course_name || !price || !about_course || !req.file) {
        return res
          .status(400)
          .json({ msg: "ma'lumotlar toliq kiritilmagan", staus: 400 });
      }

      if (
        course_name.length > 20 ||
        course_name.length < 4 ||
        !isNaN(course_name) ||
        /[@#!$%^&*:']/g.test(course_name)
      ) {
        return res
          .status(400)
          .json({ msg: "invalide course_name", status: 400 });
      }

      if (isNaN(price)) {
        return res
          .status(400)
          .json({ msg: "price must be number", status: 400 });
      }

      if (about_course.length > 70 || about_course.length < 4) {
        return res.status(400).json({
          msg: "about_course uzunligi 4 dan katta 70 dan kichik bo'lishi kerak",
          status: 400,
        });
      }

      return next();
    } catch (error) {
      console.log(error.message);
    }
  },
};
