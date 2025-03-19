import { useState } from "react";

interface CommentFormProps {
  onSubmit: (content: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onSubmit(newComment);
    setNewComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex">
      <input
        type="text"
        className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-l-lg focus:outline-none"
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button
        type="submit"
        className="bg-red-400 cursor-pointer text-white px-3 py-1 text-sm rounded-r-lg hover:bg-red-500"
      >
        Post
      </button>
    </form>
  );
};

export default CommentForm;
