const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  addComment,
  likeComment,
  replyToComment,
  deleteComment,
  updateComment,
} = require("../controller/activityController");
const router = express.Router();

router.post("/comment/:discussionId", protect, addComment);
router.post("/comment/like/:commentId", protect, likeComment);
router.post("/comment/reply/:commentId", protect, replyToComment);
router.delete("/comment/delete/:commentId", protect, deleteComment);
router.put("/comment/update/:commentId", protect, updateComment);

module.exports = router;
