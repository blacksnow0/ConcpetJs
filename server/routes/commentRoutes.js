const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  greeting,
  addComment,
  getAllComment,
} = require("../controllers/commentController");

const commentRouter = express.Router();

commentRouter.post("/:tweetId/comment", authMiddleware, addComment);

commentRouter.get("/:tweetId/comments", getAllComment);

commentRouter.get("/:tweetId/greet", greeting);

module.exports = commentRouter;
