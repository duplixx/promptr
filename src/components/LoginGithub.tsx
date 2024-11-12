"use client";
import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const LoginGithub = () => {
  return (
    <div className="mt-2">
      <Button
        variant="outline"
        type="button"
        className="w-full border-black"
        onClick={() => login("github")}
      >
        <Github className="mr-2 h-4 w-4" />
        Login with Github
      </Button>
    </div>
  );
};

export default LoginGithub;
