const Comment = require("../model/commentModel");
const Discussion = require("../model/discussionModel");

// POST : http://localhost:8000/api/activity/comment/:discussionID
const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const newComment = new Comment({
      user: req.user._id,
      discussion: req.params.discussionId,
      text,
    });
    await newComment.save();
    res.status(201).json({
      message: `comment successful on ${newComment.user} discussion`,
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST :  http://localhost:8000/api/activity/comment/like/:commentId
const likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if user already liked the comment
    if (comment.likes.includes(req.user._id)) {
      return res
        .status(400)
        .json({ message: "You have already liked this comment" });
    }

    comment.likes.push(req.user._id);
    await comment.save();
    res.status(200).json({
      message: `your comment liked by ${req.user._id} `,
      comment: comment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST : http://localhost:8000/api/activity/comment/reply/:commentId
const replyToComment = async (req, res) => {
  try {
    const parentComment = await Comment.findById(req.params.commentId);
    if (!parentComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const newReply = new Comment({
      user: req.user._id,
      discussion: parentComment.discussion,
      text: req.body.text,
      replies: [],
    });

    const reply = await newReply.save();
    parentComment.replies.push(reply._id);
    await parentComment.save();

    res.status(201).json({
      message: `${req.user.name} replied to your comment`,
      reply: reply,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE : http://localhost:8000/api/activity/comment/delete/commentId
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT : http://localhost:8000/api/activity/comment/update/commentId
const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.text = req.body.text;
    await comment.save();

    res.status(200).json({ message: "updated successfully", comment: comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addComment,
  likeComment,
  replyToComment,
  deleteComment,
  updateComment,
};
