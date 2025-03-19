// import { useState, useEffect } from "react";
// import CommentService from "../../services/commentService";

// interface CommentProps {
//   tweetId: string;
// }

// const CommentSection: React.FC<CommentProps> = ({ tweetId }) => {
//   const [comments, setComments] = useState<
//     {
//       userId: {
//         username: string;
//       };
//       content: string;
//     }[]
//   >([]);
//   const [newComment, setNewComment] = useState("");

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         console.log("this is the tweetId", tweetId);
//         const res = await CommentService.getAllComment(tweetId);
//         console.log(res.comments);
//         setComments(res.comments);
//       } catch (error) {
//         console.error("Error fetching comments", error);
//       }
//     };
//     fetchComments();
//   }, [tweetId]);

//   const handleCommentSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newComment.trim()) return;
//     try {
//       const res = await CommentService.addComment({
//         tweetId,
//         content: newComment,
//       });
//       console.log("this is the response", res.comment);
//       setComments([...comments, res.comment]); // Add new comment instantly
//       setNewComment("");
//     } catch (error) {
//       console.error("Error adding comment", error);
//     }
//   };

//   return (
//     <div className="mt-3 bg-neutral-800 p-3 rounded-lg border border-gray-200">
//       <p className="text-sm text-gray-100 mb-2 font-semibold">Comments</p>

//       {/* List Comments */}
//       {comments.length === 0 ? (
//         <p className="text-sm text-gray-200">No comments yet.</p>
//       ) : (
//         comments.map((comment, index) => (
//           <div key={index} className="flex gap-2 items-center mb-2">
//             <div className="w-8 h-8 bg-red-400 text-white flex items-center justify-center rounded-full text-xs">
//               {comment.userId.username.charAt(0).toUpperCase()}
//             </div>
//             <div className="pb-4">
//               <p className="text-xs font-semibold">
//                 @{comment.userId.username}
//               </p>
//               <p className="text-sm text-gray-100">{comment.content}</p>
//             </div>
//           </div>
//         ))
//       )}

//       {/* Add Comment Input */}
//       <form onSubmit={handleCommentSubmit} className="mt-2 flex">
//         <input
//           type="text"
//           className="flex-1  px-3 py-1 text-sm border border-gray-300 rounded-l-lg focus:outline-none"
//           placeholder="Add a comment..."
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//         />
//         <button
//           type="submit"
//           className="bg-red-400 cursor-pointer text-white px-3 py-1 text-sm rounded-r-lg hover:bg-red-500"
//         >
//           Post
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CommentSection;

import { useState, useEffect } from "react";
import CommentService from "../../services/commentService";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

interface CommentProps {
  tweetId: string;
}

const CommentSection: React.FC<CommentProps> = ({ tweetId }) => {
  const [comments, setComments] = useState<
    {
      userId: {
        username: string;
      };
      content: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        console.log("this is the tweetId", tweetId);
        const res = await CommentService.getAllComment(tweetId);
        console.log(res.comments);
        setComments(res.comments);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };
    fetchComments();
  }, [tweetId]);

  const handleAddComment = async (content: string) => {
    try {
      const res = await CommentService.addComment({
        tweetId,
        content,
      });
      setComments([...comments, res.comment]);
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  return (
    <div className="mt-3 bg-neutral-800 p-3 rounded-lg border border-gray-200">
      <p className="text-sm text-gray-100 mb-2 font-semibold">Comments</p>

      {/* List of comments */}
      <CommentList comments={comments} />

      {/* Comment input form */}
      <CommentForm onSubmit={handleAddComment} />
    </div>
  );
};

export default CommentSection;
