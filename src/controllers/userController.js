const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const catchAsync = require("../common/catchAsync");

// Lấy danh sách user
exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    result: users.length,
    data: users,
  });
});

// Tạo user
exports.createUser = catchAsync(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  res.status(201).json({
    status: "success",
    data: newUser,
  });
});

// Sửa user
exports.updateUser = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findById(req.params.idUser);
  if (!user) throw new Error("User is not found to update");
  const userUpdated = await User.findByIdAndUpdate(
    req.params.idUser,
    {
      name,
      email,
      password: await bcrypt.hash(password, 12),
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    userUpdated,
  });
});

// Xóa user
exports.deleteUser = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.params.idUser);
  res.status(200).json({
    status: "success",
    message: "Delete user successfully",
  });
});
