const express = require("express");
const courseController = require("../controllers/courseController");
const router = express.Router();

router
  .route("/")
  .get(courseController.getAllCourses)
  .post(courseController.createCourse);

router
  .route("/:idCourse")
  .get(courseController.findCourseById)
  .patch(courseController.updateCourse)
  .delete(courseController.deleteCourse);

module.exports = router;
