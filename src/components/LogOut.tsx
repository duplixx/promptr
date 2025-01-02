"use client";
import React from "react";
import { Button } from "./ui/button";
import { logout } from "@/actions/auth";

const LogOut = () => {
  return (
    <div>
      {" "}
      <Button
        onClick={() => logout()}
        variant="ghost"
        className="bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent transition-all duration-300 hover:from-white hover:to-blue-400"
      >
        Log Out
      </Button>
    </div>
  );
};

export default LogOut;
