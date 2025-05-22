const User = require("../models/userModel");
const catchAsync = require("../common/catchAsync");

// Xử lý đăng ký user
exports.signUp = catchAsync(async (req, res) => {
  const { name, email, password, passwordConfirm, signInWithGoogle } = req.body;
  const isExisted = await User.findOne({ email }).select(
    "password name email "
  );
  if (signInWithGoogle) {
    if (!isExisted) {
      const newUser = await User.create({
        name,
        email,
        password: "123456",
        passwordConfirm: "123456",
      });
      return res.status(200).json({
        status: "success",
        data: {
          name: newUser.name,
          email: newUser.email,
        },
      });
    } else {
      return res.status(200).json({
        status: "success",
        data: {
          name: isExisted.name,
          email: isExisted.email,
          role: isExisted.role || "user",
          userPicture: isExisted.userPicture,
        },
      });
    }
  } else {
    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });
    return res.status(200).json({
      status: "success",
      newUser,
    });
  }
});

// Xử lý đăng nhập
exports.signIn = catchAsync(async (req, res) => {
  const { name, email, password, signInWithGoogle } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (signInWithGoogle) {
    if (!user) {
      await User.create({
        name,
        email,
        password: "123456",
      });
      return res.status(200).json({
        status: "success",
        data: {
          name,
          email,
        },
      });
    }
    if (user) {
      return res.status(200).json({
        status: "success",
        data: {
          name: user.name,
          email: user.email,
          role: user.role || "USER",
        },
      });
    }
  } else {
    if (!email || !password)
      throw new Error("Please enter emaill and password !");
    const correctPassword = await user.correctPassword(password, user.password);
    if (!user || !correctPassword)
      throw new Error("Email or password is incorrect !");
    res.status(200).json({
      status: "success",
      user,
    });
  }
});

// Phân quyền user
exports.authorization = (roles) => {
  return (req, res, next) => {
    const roleUser = req.body?.role?.toUpperCase() ?? "User";
    if (!roles.includes(roleUser))
      throw new Error("You don't have permission to perform this action");
    next();
  };
};
