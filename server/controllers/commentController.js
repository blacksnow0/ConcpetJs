const Comment = require("../models/CommentModel");

const Tweet = require("../models/TweetModel");

const addComment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { tweetId } = req.params;
    const { content } = req.body;

    const tweetExists = await Tweet.findById(tweetId);
    if (!tweetExists)
      return res.status(404).json({ message: "Tweet not found" });

    const newComment = new Comment({
      userId,
      tweetId,
      content,
    });

    await newComment.save();

    await Tweet.findByIdAndUpdate(tweetId, { $inc: { commentCount: 1 } });

    const populatedComment = await Comment.findById(newComment._id)
      .populate("userId", "_id username")
      .exec();

    res
      .status(200)
      .json({
        message: "Comment",
        comment: populatedComment,
        commentCount: tweetExists.commentCount + 1,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllComment = async (req, res) => {
  try {
    const { tweetId } = req.params;

    const comments = await Comment.find({ tweetId })
      .populate("userId", "username")
      .sort({ created: -1 });

    res.status(200).json({ comments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const greeting = async (req, res) => {
  res.status(200).json({ greeting, tweetId: req.params });
};

module.exports = { greeting, getAllComment, addComment };
