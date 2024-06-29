const express = require("express");
const {
  signUp,
  logIn,
  updateUser,
  getUsers,
  searchUser,
} = require("../controller/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.put("/update/:id", protect, updateUser);
router.get("/", getUsers);
router.get("/search", searchUser);

module.exports = router;
