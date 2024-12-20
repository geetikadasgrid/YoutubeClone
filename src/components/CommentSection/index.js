import React, { useState } from "react";

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "John Doe",
      text: "This is a great video!",
      replies: [
        { id: 2, user: "Jane Smith", text: "I agree!" },
        { id: 3, user: "Sam Merchant", text: "Same here!" },
      ],
    },
    {
      id: 4,
      user: "Alice Brown",
      text: "Thanks for sharing this content!",
      replies: [],
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([
        ...comments,
        { id: Date.now(), user: "You", text: newComment, replies: [] },
      ]);
      setNewComment("");
    }
  };

  const handleReply = (parentId, replyText) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === parentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                { id: Date.now(), user: "You", text: replyText },
              ],
            }
          : comment
      )
    );
  };

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {/* Add Comment */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-grow border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          onClick={handleAddComment}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Post
        </button>
      </div>

      {/* Render Comments */}
      <div>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} onReply={handleReply} />
        ))}
      </div>
    </div>
  );
};

const Comment = ({ comment, onReply }) => {
  const [replyText, setReplyText] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleReplySubmit = () => {
    if (replyText.trim() !== "") {
      onReply(comment.id, replyText);
      setReplyText("");
      setShowReplyInput(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-start space-x-3">
        {/* <div className="w-10 h-10 rounded-full bg-gray-300">
          <svg
            class="absolute w-12 h-12 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div> */}
        <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg
            class="absolute w-12 h-12 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div>
          <p className="font-medium">{comment.user}</p>
          <p className="text-gray-700">{comment.text}</p>
          <button
            onClick={() => setShowReplyInput(!showReplyInput)}
            className="text-sm text-blue-500 hover:underline"
          >
            Reply
          </button>

          {/* Reply Input */}
          {showReplyInput && (
            <div className="mt-2 flex items-center">
              <input
                type="text"
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-grow border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                onClick={handleReplySubmit}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Reply
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      <div className="ml-12 mt-2">
        {comment.replies.map((reply) => (
          <div key={reply.id} className="flex items-start space-x-3 mb-2">
            {/* <div className="w-8 h-8 rounded-full bg-gray-300">

            </div> */}
            <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              {reply.user === "Jane Smith" ? (
                <span class="font-medium text-gray-600 dark:text-gray-300">
                  JS
                </span>
              ) : (
                <span class="font-medium text-gray-600 dark:text-gray-300">
                  SM
                </span>
              )}
            </div>
            <div>
              <p className="font-medium">{reply.user}</p>
              <p className="text-gray-700">{reply.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
