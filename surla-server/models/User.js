const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  contactNumber: { type: String, required: true, trim: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  type: {
    type: String,
    enum: ["admin", "editor", "viewer"],
    default: "viewer",
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  address: { type: String, required: true, trim: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

userSchema.statics.loginCheck = function (user) {
  if (user.type === "viewer") {
    throw new Error("Access Denied: Viewers cannot log in to the dashboard.");
  }

  return true;
};

module.exports = mongoose.model("User", userSchema);
