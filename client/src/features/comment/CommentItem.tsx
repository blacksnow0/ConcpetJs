interface CommentItemProps {
  username: string;
  content: string;
}

const CommentItem: React.FC<CommentItemProps> = ({ username, content }) => {
  return (
    <div className="flex gap-2 items-center mb-2">
      <div className="w-8 h-8 bg-red-400 text-white flex items-center justify-center rounded-full text-xs">
        {username.charAt(0).toUpperCase()}
      </div>
      <div className="pb-4">
        <p className="text-xs font-semibold">@{username}</p>
        <p className="text-sm text-gray-100">{content}</p>
      </div>
    </div>
  );
};

export default CommentItem;
