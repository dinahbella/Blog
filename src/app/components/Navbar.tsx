"use client";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="p-4 shadow-md flex justify-between">
      <h1 className="text-xl font-bold">My Awesome Blog</h1>
      {session ? (
        <div className="flex gap-4">
          <p>{session.user?.name || "Guest"}</p>
          <Button
            onClick={() => signOut()}
            className="bg-red-500 px-4 py-2 text-white rounded"
          >
            Logout
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => signIn("google")}
          className="bg-blue-500 px-4 py-2 text-white rounded"
        >
          Login with Google
        </Button>
      )}
    </nav>
  );
}
