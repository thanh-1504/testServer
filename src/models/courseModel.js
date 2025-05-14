const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  name: String,
  chude: String,
  description: {
    type: String,
    default: "",
  },
  urlImageCourse: {
    type: String,
    default: "",
  },
  isComing: {
    type: Boolean,
    default: false,
  },
  courseDetail: [
    {
      name: {
        type: String,
        default: "",
      },
      urlCourse: {
        type: String,
        default: "",
      },
    },
  ],
});
const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
