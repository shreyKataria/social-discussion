const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  discussion: {
    type: Schema.Types.ObjectId,
    ref: "Discussion",
    required: true,
  },
  text: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
