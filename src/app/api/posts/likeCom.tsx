import { useState } from "react";
import { useSession } from "next-auth/react";

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState(initialLikes);

  async function handleLike() {
    if (!session) return alert("Please login to like");

    const res = await fetch("/api/posts/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId }),
    });

    const updatedPost = await res.json();
    setLikes(updatedPost.likes.length);
  }

  return <button onClick={handleLike}>❤️ {likes} Likes</button>;
}
