"use client";

import { cn } from "@/lib/utils";
import { ProblemsListItem } from "@/types/problem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider
} from "@/components/ui/sidebar";

interface ProblemSidebarProps {
  problems: ProblemsListItem[];
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export function ProblemSidebar({ problems, isSidebarOpen, setIsSidebarOpen }: ProblemSidebarProps) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
    <motion.div
      initial={false}
      animate={{
        width: isSidebarOpen ? "240px" : "60px",
        transition: { duration: 0.3 },
      }}
      className="overflow-hidden border-r border-gray-700 bg-gray-900"
    >
      <Sidebar className={`h-full ${isSidebarOpen ? "w-[400px]" : "w-[80px]"}`}>
        <SidebarHeader className="border-b border-gray-700 bg-gray-800 p-4">
          <div className="flex items-center justify-between">
            <h2 className={`text-lg font-semibold ${!isSidebarOpen && "hidden"} text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500`}>
              Problems
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-white hover:text-indigo-400"
            >
              {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
            </motion.button>
          </div>
        </SidebarHeader>

        <SidebarContent className="bg-gray-900 py-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {problems.map((problem) => (
                  <SidebarMenuItem key={problem.id}>
                    <Link href={`/problems/${problem.id}`}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-between px-4 py-2 hover:bg-gray-800 flex",
                          pathname === `/problems/${problem.id}` && "bg-gray-800"
                        )}
                      >
                        {isSidebarOpen ? (
                          <>
                            <span className="flex items-center gap-2">
                              <span className="text-sm text-gray-300">
                                {problem.id}. {problem.title}
                              </span>
                            </span>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  problem.difficulty === "Easy"
                                    ? "default"
                                    : problem.difficulty === "Medium"
                                      ? "secondary"
                                      : "destructive"
                                }
                                className="text-xs"
                              >
                                {problem.difficulty}
                              </Badge>
                              {problem.solved && (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                          </>
                        ) : (
                          <span className="text-sm text-gray-300 text-center items-center">{problem.id}</span>
                        )}
                      </Button>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </motion.div>
    </SidebarProvider>
  );
}