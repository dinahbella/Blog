import { useState } from "react";
import { useRouter } from "next/router";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="border p-2 w-full"
      />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
        className="border p-2 w-full mt-2"
      />
      <Button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
      >
        Create Post
      </Button>
    </form>
  );
}
