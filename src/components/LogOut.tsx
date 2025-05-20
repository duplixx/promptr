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
        className="text-black bg-textcolor transition-all duration-300 bg-second"
      >
        Log Out
      </Button>
    </div>
  );
};

export default LogOut;
