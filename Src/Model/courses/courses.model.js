import mongoose from "mongoose";
import { Schema } from "mongoose";

const Courses = new Schema({
  price: {
    type: Number,
    required: true,
  },

  banner: {
    type: String,
    required: true,
  },

  course_name: {
    type: String,
    required: true,
  },

  about_course: {
    type: String,
    required: true,
  },
});

export const CoursesModel = mongoose.model("Courses", Courses);
