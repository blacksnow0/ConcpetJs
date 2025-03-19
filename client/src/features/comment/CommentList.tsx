import CommentItem from "./CommentItem";

interface CommentListProps {
  comments: {
    userId: {
      username: string;
    };
    content: string;
  }[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <>
      {comments.length === 0 ? (
        <p className="text-sm text-neutral-200">No comments yet.</p>
      ) : (
        comments.map((comment, index) => (
          <CommentItem
            key={index}
            username={comment.userId.username}
            content={comment.content}
          />
        ))
      )}
    </>
  );
};

export default CommentList;
