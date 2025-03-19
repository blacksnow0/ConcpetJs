import API, { AUTHENTICATED_API } from "./api";

const CommentService = {
  getAllComment: async (tweetId: string) => {
    const response = await API.get(`comments/${tweetId}/comments`);
    return response.data;
  },

  addComment: async ({
    tweetId,
    content,
  }: {
    tweetId: string;
    content: string;
  }) => {
    const response = await AUTHENTICATED_API.post(
      `comments/${tweetId}/comment`,
      { content },
      { withCredentials: true }
    );
    return response.data;
  },
};

export default CommentService;
