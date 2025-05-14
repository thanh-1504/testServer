const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    min: [5, "Password must be at least 5 characters"],
    max: [20, "Password maximum 20 characters"],
    require: true,
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
    },
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },
});

// Hash password trước khi lưu vào database
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Check password của user với password đã hash của user được lưu trong database
userSchema.methods.correctPassword = (userPassword, hashPassword) => {
  return bcrypt.compare(userPassword, hashPassword);
};
const User = mongoose.model("User", userSchema);
module.exports = User;
