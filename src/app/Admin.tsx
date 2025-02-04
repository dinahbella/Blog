import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Post {
  _id: string;
  title: string;
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("/api/posts");
      setPosts(await res.json());
    }
    fetchPosts();
  }, []);

  async function deletePost(postId: string) {
    if (!confirm("Are you sure?")) return;

    await fetch("/api/admin/posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId }),
    });

    setPosts(posts.filter((post) => post._id !== postId));
  }

  if (!session || session.user?.role !== "admin") {
    return <p>Access denied</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <button onClick={() => deletePost(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
