const express = require("express");

const {
  getUsers,
  createUser,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");

const { protect, admin } = require("../middleware/authMiddleware");



const router = express.Router();

router.route("/").get(getUsers).post(protect, admin, createUser);

router.route("/:id").put(protect, admin, updateUser).delete(protect, admin, deleteUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
