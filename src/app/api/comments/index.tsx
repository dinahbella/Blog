import connectDB from "../../../lib/dbConnect";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import Comment from "@/app/models/Comment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method === "POST") {
    const session = await getSession({ req });
    if (!session) return res.status(401).json({ message: "Not authenticated" });

    const { content, postId } = req.body;
    const comment = await Comment.create({
      content,
      author: session.user,
      post: postId,
    });

    return res.status(201).json(comment);
  }

  if (req.method === "GET") {
    const { postId } = req.query;
    const comments = await Comment.find({ post: postId }).populate("author");
    return res.status(200).json(comments);
  }

  res.status(405).end();
}
