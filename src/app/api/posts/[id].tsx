import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Comment {
  _id: string;
  content: string;
  author: {
    name: string;
  };
}

interface CommentsProps {
  postId: string;
}

export default function Comments({ postId }: CommentsProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    async function fetchComments() {
      const res = await fetch(`/api/comments?postId=${postId}`);
      setComments(await res.json());
    }
    fetchComments();
  }, [postId]);

  async function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newComment, postId }),
    });
    setNewComment("");
    // Optionally refetch comments instead of reloading the page
    const res = await fetch(`/api/comments?postId=${postId}`);
    setComments(await res.json());
  }

  return (
    <div>
      <h3>Comments</h3>
      {session && (
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          />
          <button type="submit">Add Comment</button>
        </form>
      )}
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.content}</p>
          <p>By: {comment.author.name}</p>
        </div>
      ))}
    </div>
  );
}
