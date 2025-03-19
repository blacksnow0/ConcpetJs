import API, { AUTHENTICATED_API } from "./api";

const TweetService = {
  getAllTweets: async () => {
    console.log("this will get called");
    const response = await API.get("tweets/allTweets");
    return response.data;
  },
  createTweet: async (content: string) => {
    const response = await AUTHENTICATED_API.post(
      "tweets/create",
      { content },
      {
        withCredentials: true,
      }
    );
    return response.data;
  },

  likeTweet: async (tweetId: string) => {
    const response = await AUTHENTICATED_API.put(
      `tweets/${tweetId}/like`,
      {},
      { withCredentials: true }
    );
    console.log("this waas called", response.data);
    return response.data;
  },

  unlikeTweet: async (tweetId: string) => {
    const response = await AUTHENTICATED_API.put(
      `tweets/${tweetId}/unlike`,
      {},
      { withCredentials: true }
    );
    return response.data;
  },
};

export default TweetService;
