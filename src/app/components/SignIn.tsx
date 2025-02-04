import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const SignIn = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-blue-600">{session.user.name}</p>
        <Button
          className="bg-red-600 text-white w-full"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>
    );
  }
  return (
    <div>
      <Button
        className="bg-green-600 text-white w-full"
        onClick={() => signIn()}
      >
        Sign In
      </Button>
    </div>
  );
};

export default SignIn;
