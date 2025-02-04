import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import connectDB from "../../../lib/dbConnect";
import Post from "@/app/models/Post";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  const session = await getSession({ req });

  if (!session || session.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  if (req.method === "DELETE") {
    const { postId } = req.body;
    if (!postId)
      return res.status(400).json({ message: "Post ID is required" });

    await Post.findByIdAndDelete(postId);
    return res.status(200).json({ message: "Post deleted" });
  }

  res.status(405).end();
}
