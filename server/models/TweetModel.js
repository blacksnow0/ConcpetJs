const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema(
  {
    content: { type: String, require: true, maxlength: 280 },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tweet", TweetSchema);
