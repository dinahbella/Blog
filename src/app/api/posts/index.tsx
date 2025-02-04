import Post from "@/app/models/Post";
import connectDB from "../../../lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler({ req, res }: any) {
  await connectDB();

  if (req.method === "GET") {
    const posts = await Post.find().populate("author");
    return res.status(200).json(posts);
  }

  if (req.method === "POST") {
    const session = await getSession({ req });
    if (!session || !session.user) {
      return res
        .status(401)
        .json({ message: "Not authenticated or user not found" });
    }

    const { title, content } = req.body;
    const post = new Post({ title, content, author: session.user });
    await post.save();
    return res.status(201).json(post);
  }

  res.status(405).end(); // Method Not Allowed
}
