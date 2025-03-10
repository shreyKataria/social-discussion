const express = require("express");
const {
  signUp,
  logIn,
  updateUser,
  getUsers,
  searchUser,
  deleteUser,
  followUser,
} = require("../controller/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// routes
router.post("/signup", signUp);
router.post("/login", logIn);
router.put("/update/:id", protect, updateUser);
router.get("/", getUsers);
router.get("/search", searchUser);
router.delete("/delete/:id", protect, deleteUser);
router.post("/follow/:id", protect, followUser);

module.exports = router;
