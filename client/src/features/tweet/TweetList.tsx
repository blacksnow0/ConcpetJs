import { TweetType } from "../../types/tweet";
import Tweet from "./Tweet";

type Props = {
  tweets: TweetType[];
};

export default function TweetList({ tweets }: Props) {
  return (
    <div className="w-full">
      <h2 className="font-mono font-medium text-xl mb-5">
        What's the world's perception!
      </h2>
      {tweets.length > 0 ? (
        tweets.map((tweet, index) => (
          <div key={index}>
            <Tweet
              content={tweet.content}
              username={tweet.userId.username}
              tweetId={tweet._id}
              commentCount={tweet.commentCount}
              likesCount={tweet.likesCount}
            />
          </div>
        ))
      ) : (
        <p className="text-gray-500">No tweets yet. Be the first to post!</p>
      )}
    </div>
  );
}
