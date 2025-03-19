export interface TweetType {
  _id: string;
  content: string;
  userId: {
    _id: string;
    username: string;
  };
  commentCount: number;
  likesCount: number;
}
