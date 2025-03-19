import { useState } from "react";
import TweetService from "../../services/tweetService";
import { TweetType } from "../../types/tweet";

type Props = {
  addTweet: (tweet: TweetType) => void;
};

export default function TweetForm({ addTweet }: Props) {
  const [content, setContent] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(content);
    if (!content.trim()) return; // Prevent empty tweets

    try {
      // Send to backend
      const newTweet = await TweetService.createTweet(content);
      console.log("Posted tweet:", newTweet);

      // Update UI instantly
      addTweet(newTweet.tweet);
      setContent(""); // Clear input field
    } catch (error) {
      console.error("Error posting tweet:", error);
    }
  };

  return (
    <div className="w-full">
      <form className="flex space-x-4" onSubmit={handleSubmit}>
        <input
          value={content}
          onChange={handleChange}
          type="text"
          placeholder="What's happening?"
          className="w-full px-4 py-2 text-sm border border-neutral-300 rounded-full focus:outline-neutral-200"
        />
        <button
          type="submit"
          className="py-2 px-4 text-xs tracking-wider font-bold text-black bg-red-400 rounded-md cursor-pointer hover:bg-orange-400 focus:outline-none focus:bg-orange-400"
        >
          POST
        </button>
      </form>
    </div>
  );
}
