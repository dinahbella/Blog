import Post from "@/app/models/Post";
import connectDB from "../../../lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler({ req, res }: any) {
  await connectDB();

  if (req.method === "POST") {
    const session = await getSession({ req });
    if (!session) return res.status(401).json({ message: "Not authenticated" });

    const { postId } = req.body;
    const post = await Post.findById(postId);

    if (post.likes.includes(session.user.id)) {
      post.likes = post.likes.filter((id: string) => id !== session.user.id);
    } else {
      post.likes.push(session.user.id);
    }

    await post.save();
    return res.status(200).json(post);
  }

  res.status(405).end();
}
