"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Settings2, ChevronRight, ChevronLeft, Zap } from "lucide-react";
import MainSidebar from "./Sidebar";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarProvider,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import UserInputModal from "./UserInputModal";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface UserInfo {
  level: string;
  expertise: string;
  learningStyle: string;
  goals: string[];
}

interface Message {
  role: "user" | "assistant";
  content: string;
  user_type: UserInfo;
}

interface ImprovedPrompt {
  title: string;
  prompt: string;
}

interface PromptAnalysis {
  label: string;
  feedback: string;
  motivation: string;
  tags: string[];
  content: string;
  learning_points: string[];
  improved_prompts: {
    title: string;
    prompt: string;
    reasoning: string;
  }[];
}

interface ChatInterfaceProps {
  onAnalyzePrompt: (prompt: string, userInfo: UserInfo) => Promise<string>;
}

interface Track {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  completed: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onAnalyzePrompt }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [promptAnalysis, setPromptAnalysis] = useState<PromptAnalysis | null>(
    null,
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [promptStrength, setPromptStrength] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [tracks, setTracks] = useState<Track[]>([
    {
      id: "1",
      title: "Fundamentals",
      lessons: [
        { id: "1-1", title: "Introduction to Prompts", completed: false },
        { id: "1-2", title: "Basic Prompt Structure", completed: false },
      ],
    },
    {
      id: "2",
      title: "Advanced Techniques",
      lessons: [
        { id: "2-1", title: "Chain of Thought", completed: false },
        { id: "2-2", title: "Zero-shot Prompting", completed: false },
      ],
    },
  ]);

  const { data: session } = useSession();
  const userInitial = session?.user?.name?.[0];

  useEffect(() => {
    if (userInfo) {
      const welcomeMessage = `Welcome! I see you're a ${userInfo.level} prompt engineer with expertise in ${userInfo.expertise}. 
        Your ${userInfo.learningStyle} learning style will help us customize feedback for you. 
        Let's work on your goals: ${userInfo.goals.join(", ")}. How can I help you improve your prompts today?`;

      setMessages([
        {
          role: "assistant",
          content: welcomeMessage,
          user_type: userInfo,
        },
      ]);
    }
  }, [userInfo]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleModalClose = async (data: UserInfo) => {
    setUserInfo(data);
    setIsModalOpen(false);

    // Store in MongoDB
    try {
      const response = await fetch("/api/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save user profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  // Modify the useEffect that fetches user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/user/profile");
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
          setIsModalOpen(false);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);
  const handleSendMessage = async () => {
    if (inputValue.trim() === "" || !userInfo || isTyping) return;

    const newUserMessage = {
      role: "user",
      content: inputValue,
      user_type: userInfo,
    } as Message;

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:8000/analyze-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, newUserMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          user_type: {
            level: userInfo.level,
            expertise: userInfo.expertise,
            learning_style: userInfo.learningStyle,
            goals: userInfo.goals,
          },
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch response");
      const data = await response.json();
      setPromptAnalysis(data);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `${data.feedback}\n\nStrength: ${data.label}\nTags: ${data.tags.join(", ")}`,
          user_type: userInfo,
        } as Message,
      ]);

      // Set prompt strength based on label
      if (data.label === "STRONG") setPromptStrength(100);
      else if (data.label === "MODERATE") setPromptStrength(50);
      else setPromptStrength(25);
    } catch (error) {
      console.error("Analysis error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection interrupted. Please try again.",
          user_type: userInfo,
        } as Message,
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const renderMessage = (message: Message, index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
    >
      <Card
        className={`max-w-[85%] border-0 ${message.role === "user" ? "bg-indigo-800" : "bg-indigo-900"} text-gray-100`}
      >
        <CardContent className="p-3">
          <p className="whitespace-pre-wrap text-sm">{message.content}</p>
          {message.role === "user" &&
            promptAnalysis &&
            index === messages.length - 2 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-3 border-t border-gray-700 pt-3"
              >
                {/* Motivation Message */}
                <div className="mb-3 text-sm italic text-indigo-300">
                  {promptAnalysis.motivation}
                </div>

                {/* Learning Points */}
                <div className="mb-3">
                  <span className="text-xs font-semibold text-indigo-400">
                    Key Learning Points:
                  </span>
                  <ul className="mt-1 space-y-1">
                    {promptAnalysis.learning_points.map((point, i) => (
                      <li key={i} className="text-xs text-gray-300">
                        • {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improved Versions */}
                <div className="mb-4">
                  <span className="text-xs font-semibold text-indigo-400">
                    Improved Versions:
                  </span>
                  <div className="mt-2 space-y-3">
                    {promptAnalysis.improved_prompts.map((suggestion, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="cursor-pointer rounded-lg bg-gray-800 p-3 transition-colors hover:bg-gray-700"
                        onClick={() => setInputValue(suggestion.prompt)}
                      >
                        <div className="mb-1 text-xs font-medium text-indigo-300">
                          {suggestion.title}
                        </div>
                        <p className="text-sm text-gray-300">
                          {suggestion.prompt}
                        </p>
                        <div className="mt-2 text-xs italic text-indigo-200">
                          {suggestion.reasoning}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Strength Indicator */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Progress
                    value={promptStrength}
                    className={`h-2 w-full ${
                      promptAnalysis.label === "STRONG"
                        ? "bg-green-500"
                        : promptAnalysis.label === "MODERATE"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  />
                </motion.div>

                {/* Tags */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {promptAnalysis.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      className="cursor-pointer rounded-md bg-indigo-600 px-2 py-1 text-xs hover:bg-indigo-700"
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <SidebarProvider defaultOpen>
      <div className="fixed inset-0 flex h-screen w-screen overflow-hidden bg-gray-700 text-gray-100">
        <MainSidebar
          tracks={tracks}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <div className="flex items-center justify-end bg-gray-800 px-4 py-2">
            <div className="flex items-center space-x-4">
            <Link href="/problems/1">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-4 rounded-[40px] text-md font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out">
              Challenge Mode
            </Button>
            </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full p-0 m-1">
                    <Avatar>
                      <AvatarImage src="" alt="User Avatar" />
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-white">
                        {userInitial?.toUpperCase()}
                      </span>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem
                    onClick={() => (window.location.href = "/profile")}
                  >
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 bg-gray-800" ref={scrollRef}>
            <div className="mx-auto max-w-4xl flex-1 space-y-4 p-4">
              <AnimatePresence>
                {messages.map((message, index) =>
                  renderMessage(message, index),
                )}
              </AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex justify-start"
                >
                  <Card className="max-w-[85%] border-0 bg-gray-700">
                    <CardContent className="p-3">
                      <div className="flex space-x-2">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6 }}
                          className="h-2 w-2 rounded-full bg-violet-950"
                        ></motion.div>
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.6,
                            delay: 0.2,
                          }}
                          className="h-2 w-2 rounded-full bg-violet-950"
                        ></motion.div>
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.6,
                            delay: 0.4,
                          }}
                          className="h-2 w-2 rounded-full bg-violet-950"
                        ></motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-gray-700 bg-gray-800 p-10">
            <div className="mx-auto flex max-w-4xl items-center space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your prompt here..."
                className="flex-1 rounded-full border-gray-700 bg-gray-800 p-7 text-gray-100 placeholder-gray-400 focus:border-indigo-500"
                onKeyPress={(e) =>
                  e.key === "Enter" && !e.shiftKey && handleSendMessage()
                }
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleSendMessage}
                      disabled={isTyping || !inputValue.trim()}
                      className="cursor-pointer rounded-full bg-indigo-500 hover:bg-purple-700"
                    >
                      <Send className="h-6 w-6 text-white" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send message</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => {
                        /* Implement AI suggestion feature */
                      }}
                      className="cursor-pointer rounded-full bg-indigo-700 hover:bg-indigo-600"
                    >
                      <Zap className="h-6 w-6 text-white" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Get AI suggestion</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {!isLoading && (
          <UserInputModal isOpen={isModalOpen} onClose={handleModalClose} />
        )}
      </div>
    </SidebarProvider>
  );
};

export default ChatInterface;
