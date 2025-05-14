const catchAsync = require("../common/catchAsync");
const Course = require("../models/courseModel");

// Lấy danh sách tất cả các khóa học
exports.getAllCourses = catchAsync(async (req, res) => {
  const courses = await Course.find();
  res.status(200).json({
    status: "success",
    courses,
  });
});

exports.findCourseById = catchAsync(async (req, res) => {
  const course = await Course.findById(req.params.idCourse);
  res.status(200).json({
    status: "success",
    course,
  });
});

// Tạo 1 khóa học
exports.createCourse = catchAsync(async (req, res) => {
  const { name, description, urlImageCourse, courseDetail, isComing } =
    req.body;
  const newCourse = await Course.create({
    name,
    description,
    urlImageCourse,
    isComing,
    courseDetail,
  });
  res.status(201).json({
    status: "success",
    data: newCourse,
  });
});

// Update 1 khóa học
exports.updateCourse = catchAsync(async (req, res) => {
  const { name, description, url } = req.body;
  const course = await Course.findById(req.params.idCourse);
  if (!course) throw new Error("No course found !");
  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.idCourse,
    {
      name,
      description,
      url,
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    data: updatedCourse,
  });
});

// Xóa 1 khóa học
exports.deleteCourse = catchAsync(async (req, res) => {
  await Course.findByIdAndDelete(req.params.idCourse);
  res.status(200).json({
    status: "success",
    message: "Delete course successfully",
  });
});
