import { useEffect, useState } from "react";
import TweetService from "../services/tweetService";
import { TweetType } from "../types/tweet";
import TweetForm from "../features/tweet/TweetForm";
import TweetList from "../features/tweet/TweetList";

export default function Home() {
  const [tweets, setTweets] = useState<TweetType[]>([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const data = await TweetService.getAllTweets();
        setTweets(data);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };

    fetchTweets();
  }, []);

  // Function to add a new tweet
  const addTweet = (newTweet: TweetType) => {
    setTweets((prevTweets) => [newTweet, ...prevTweets]); // Add new tweet to top
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4 space-y-6">
      <h1 className="text-2xl font-bold text-neutral-100">ConceptsJs!</h1>
      <TweetForm addTweet={addTweet} />
      <TweetList tweets={tweets} />
    </div>
  );
}
