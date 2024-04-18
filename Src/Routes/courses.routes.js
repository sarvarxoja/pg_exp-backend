import { Router } from "express";
import coursesController from "../Controllers/courses/courses.controller.js";
import courseMiddleware from "../Middlewares/course.middleware.js";
import { upload } from "../Utils/multer.js";

export const courses_router = Router();

courses_router
  .post(
    "/add",
    upload.single("banner"),
    courseMiddleware.checkCourseValues,
    coursesController.createCourses
  )
  .get("/all", coursesController.getAllCuorses)
  .get("/:course_id", coursesController.getCourseId)
  .delete("/:course_id", coursesController.deleteCourse);
