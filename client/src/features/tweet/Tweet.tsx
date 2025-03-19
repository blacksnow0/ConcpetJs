import { useState } from "react";
import { FaRetweet, FaComment, FaHeart } from "react-icons/fa";

import CommentSection from "../comment/CommentSection";
import TweetService from "../../services/tweetService";

interface TweetProps {
  tweetId: string;
  content: string;
  username: string;
  commentCount: number;
  likesCount: number;
}

const Tweet: React.FC<TweetProps> = ({
  tweetId,
  content,
  username,
  commentCount,
  likesCount,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [likes, setLikes] = useState(likesCount);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    try {
      if (isLiked) {
        setLikes((prev) => prev - 1);
        setIsLiked(false);

        const response = await TweetService.unlikeTweet(tweetId);
        console.log(response);
      } else {
        setLikes((prev) => prev + 1);
        setIsLiked(true);

        await TweetService.likeTweet(tweetId);
      }
    } catch (error) {
      console.error("Error updating like:", error);

      setLikes(likesCount);
      setIsLiked(!isLiked);
    }
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-4 border border-gray-200 mb-10">
      {/* Username and Profile */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-red-400 rounded-full flex items-center justify-center text-white font-bold">
          {username.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{username}</p>
          <p className="text-sm text-gray-500">@{username.toLowerCase()}</p>
        </div>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed mb-3">{content}</p>

      <div className="flex space-x-5 justify-end text-gray-500 text-sm">
        <button
          className={`flex items-center gap-1 ${
            isLiked ? "text-red-400" : "hover:text-red-400"
          }`}
          onClick={handleLike}
        >
          {likes}
          <FaHeart className="cursor-pointer" />
        </button>
        <button
          className="flex items-center gap-1 hover:text-red-400"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {commentCount}
          <FaComment className="cursor-pointer " />
        </button>
        <button className="flex items-center gap-1 hover:text-green-500">
          <FaRetweet className="cursor-pointer" />
        </button>
      </div>

      {isExpanded && <CommentSection tweetId={tweetId} />}
    </div>
  );
};

export default Tweet;
