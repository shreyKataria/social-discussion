const express = require("express");
const multer = require("multer");
const { protect } = require("../middlewares/authMiddleware");
const {
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  getDiscussionsByTag,
  getDiscussionsByText,
  likeDiscussion,
} = require("../controller/discussionController");
const router = express.Router();

// upload image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadStorage = multer({ storage: storage });

// routes
router.post(
  "/upload",
  protect,
  uploadStorage.single("image"),
  createDiscussion
);
router.put("/update/:id", protect, updateDiscussion);
router.delete("/delete/:id", protect, deleteDiscussion);
router.get("/tags/:tag", getDiscussionsByTag);
router.get("/search", getDiscussionsByText);
router.post("/like/:discussionId", protect, likeDiscussion);

module.exports = router;
