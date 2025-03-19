const Tweet = require("../models/TweetModel");

const createTweet = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Tweet content is required!" });
    }

    const newTweet = new Tweet({
      content,
      userId: req.user.userId,
    });

    await newTweet.save();

    return res.status(201).json({
      tweet: {
        content: newTweet.content,
        userId: {
          _id: req.user.userId,
          username: req.user.username,
        },
      },
      message: "Successfully created",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error. Try again later!" });
  }
};

const getAllTweets = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * 10;
    const tweets = await Tweet.find()
      .populate("userId", "username")
      .sort({
        createdAt: -1,
      })
      .limit(limit)
      .skip(skip);
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ message: "Server error. Try again later!" });
  }
};

const likeTweet = async (req, res) => {
  try {
    const { tweetId } = req.params;

    const tweet = await Tweet.findByIdAndUpdate(
      tweetId,
      {
        $inc: { likesCount: 1 },
      },
      { new: true }
    );
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found!" });
    }
    res.status(200).json({
      likesCount: tweet.likesCount,
      message: "Successfully liked tweet",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error. Try again later!" });
  }
};

const unlikeTweet = async (req, res) => {
  try {
    const { tweetId } = req.params;

    const tweet = await Tweet.findByIdAndUpdate(
      tweetId,
      { $inc: { likesCount: -1 } },
      { new: true }
    );

    if (!tweet) return res.status(404).json({ message: "Tweet not found" });

    res
      .status(200)
      .json({ message: "Tweet unliked", likeCount: tweet.likesCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const greeting = async (req, res) => {
  res.send("HELLO coming from the tweetController!");
};

module.exports = {
  createTweet,
  getAllTweets,
  greeting,
  likeTweet,
  unlikeTweet,
};
