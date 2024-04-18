import { Mongoose, MongooseError } from "mongoose";
import { CoursesModel } from "../../Model/courses/courses.model.js";

export default {
  async createCourses(req, res) {
    try {
      let { course_name, price, about_course } = req.body;

      let CoursesData = await CoursesModel.create({
        price: price,
        banner: req.file.filename,
        course_name: course_name,
        about_course: about_course,
      });

      res
        .status(201)
        .json({ CoursesData, status: 201, msg: "Course created successfully" });
    } catch (error) {
      console.log(error);
    }
  },

  async getAllCuorses(req, res) {
    try {
      let response = await CoursesModel.find();

      if (!response.length) {
        return res.status(404).json({ msg: "data notfound", status: 404 });
      }

      res.status(200).json({ response, status: 200 });
    } catch (error) {
      console.log(error.message);
    }
  },

  async getCourseId(req, res) {
    try {
      let { course_id } = req.params;

      let response = await CoursesModel.findById({ _id: course_id });

      if (!response) {
        return res.status(404).json({ msg: "no data found", status: 404 });
      }

      res.status(200).json({ response, status: 200 });
    } catch (error) {
      if (error instanceof MongooseError) {
        return res.status(400).json({ error_message: "invalide _id" });
      }
      console.log(error.message);
    }
  },

  async deleteCourse(req, res) {
    try {
      let { course_id } = req.params;

      const result = await CoursesModel.findByIdAndDelete(course_id);
      console.log(result);

      if (result === null) {
        return res.status(404).json({ msg: "not found data", status: 404 });
      }

      res.status(200).json({ msg: "successful delete", status: 200, result });
      console.log(result);
    } catch (error) {
      if (error instanceof MongooseError) {
        return res.status(400).json({ error_message: "invalide id" });
      }
      console.log(error.message);
    }
  },
};
