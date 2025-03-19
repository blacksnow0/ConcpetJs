const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const tweetRouter = express.Router();

const {
  greeting,
  createTweet,
  getAllTweets,
  likeTweet,
  unlikeTweet,
} = require("../controllers/tweetController");

tweetRouter.get("/greet", greeting);

tweetRouter.post("/create", authMiddleware, createTweet);

tweetRouter.get("/allTweets", getAllTweets);

tweetRouter.put("/:tweetId/like", authMiddleware, likeTweet);

tweetRouter.put("/:tweetId/unlike", authMiddleware, unlikeTweet);

module.exports = tweetRouter;
