const Discussion = require("../model/discussionModel");
const User = require("../model/userModel");

// POST : http://localhost:8000/api/discussions/upload
const createDiscussion = async (req, res) => {
  const { text, hashtags } = req.body;
  const image = req.file ? req.file.path : null;
  try {
    const newDiscussion = new Discussion({
      user: req.user._id,
      text,
      image,
      hashtags: hashtags.split(",").map((tag) => tag.trim()),
    });

    await newDiscussion.save();
    res.status(201).json({ status: "success", discussion: newDiscussion });
  } catch (error) {
    res.status(500).json({ message: "error", error: error.message });
  }
};

// PUT : http://localhost:8000/api/discussions/update/:id
const updateDiscussion = async (req, res) => {
  const { text, hashtags } = req.body;
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }

    discussion.text = text || discussion.text;
    discussion.hashtags = hashtags
      ? hashtags.split(",").map((tag) => tag.trim())
      : discussion.hashtags;

    await discussion.save();
    res.status(200).json({ message: "success", discussion: discussion });
  } catch (error) {
    res.status(500).json({ message: "error", error: error.message });
  }
};

// DELETE : http://localhost:8000/api/discussions/delete/:id
const deleteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }

    await Discussion.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Discussion deleted" });
  } catch (error) {
    res.status(500).json({ message: "error", error: error.message });
  }
};

// GET : http://localhost:8000/api/discussionshttp://localhost:8000/api/discussions/tags/:tag
const getDiscussionsByTag = async (req, res) => {
  try {
    const discussions = await Discussion.find({
      hashtags: { $in: [req.params.tag] },
    });
    res.status(200).json({
      message: "success",
      discussions: discussions,
    });
  } catch (error) {
    res.status(500).json({ message: "error", error: error.message });
  }
};

// GET : http://localhost:8000/api/discussions/search
const getDiscussionsByText = async (req, res) => {
  const { text } = req.query;
  try {
    const discussions = await Discussion.find({ text: new RegExp(text, "i") });
    res.status(200).json(discussions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST : http://localhost:8000/api/discussions
const likeDiscussion = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.likedDiscussions.includes(req.params.discussionId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this discussion" });
    }

    user.likedDiscussions.push(req.params.discussionId);
    await user.save();
    res.status(200).json({ message: "Discussion liked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  getDiscussionsByTag,
  getDiscussionsByText,
  likeDiscussion,
};
