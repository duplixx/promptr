"use client";

import React, { useState, useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Sparkles,
  ChevronRight,
  Zap,
  Lightbulb,
  TrendingUp,
  Award,
  Target,
  BookOpen,
  Menu,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import UserInputModal from "./UserInputModal";
import PromptSuggestions from "./PromptSuggestions";
import ReactMarkdown from "react-markdown";
import { useUserStore } from "@/lib/simple-store";

interface UserInfo {
  level: string;
  expertise: string;
  learningStyle: string;
  goals: string[];
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system" | "function" | "data" | "tool";
  content: string;
}

const ModernChatInterface: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { logout } = useUserStore();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setInput,
  } = useChat({
    api: "/api/chat",
    body: {
      userInfo,
    },
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });

  const userInitial = userInfo?.level ? userInfo.level.charAt(0) : "U";

  // useEffect(() => {
  //   // Auto-scroll to bottom when new messages are added
  //   const scrollContainer = document.querySelector('[data-radix-scroll-area-viewport]');
  //   if (scrollContainer) {
  //     scrollContainer.scrollTop = scrollContainer.scrollHeight;
  //   }
  // }, [messages]);

  const handleModalClose = (data: UserInfo) => {
    setUserInfo(data);
    setIsModalOpen(false);
  };

  const renderMessage = (message: ChatMessage, index: number) => {
    const isUser = message.role === "user";

    return (
      <motion.div
        key={message.id ?? `message-${index}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`group flex ${isUser ? "justify-end" : "justify-start"} gap-3`}
      >
        {!isUser && (
          <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border border-indigo-500 bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
            <Sparkles className="h-4 w-4" />
          </div>
        )}
        <Card
          className={`max-w-[85%] border-0 shadow-lg ${
            isUser
              ? "bg-gradient-to-br from-indigo-600 to-purple-600"
              : "bg-gray-800/50 backdrop-blur-sm"
          } text-gray-100`}
        >
          <CardContent className="p-4">
            <div className="prose prose-invert max-w-none text-sm">
              {isUser ? (
                <p className="whitespace-pre-wrap text-white">{message.content}</p>
              ) : (
                <ReactMarkdown
                  className="text-gray-100"
                  components={{
                    p: ({ children }) => <p className="mb-2 text-gray-100">{children}</p>,
                    ul: ({ children }) => <ul className="mb-2 ml-4 list-disc text-gray-100">{children}</ul>,
                    ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal text-gray-100">{children}</ol>,
                    li: ({ children }) => <li className="text-gray-100">{children}</li>,
                    strong: ({ children }) => <strong className="font-semibold text-indigo-300">{children}</strong>,
                    em: ({ children }) => <em className="italic text-purple-300">{children}</em>,
                    code: ({ children }) => (
                      <code className="rounded bg-gray-900 px-1 py-0.5 text-xs text-purple-300">{children}</code>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              )}
            </div>
          </CardContent>
        </Card>
        {isUser && (
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src="" alt="User Avatar" />
            <span className="bg-second flex h-full w-full items-center justify-center rounded-full text-xs font-medium text-white">
              {userInitial?.toUpperCase()}
            </span>
          </Avatar>
        )}
      </motion.div>
    );
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-900">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative flex w-80 flex-col border-r border-gray-700/50 bg-gray-900/30 backdrop-blur-md"
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between border-b border-gray-700/50 p-4">
              <h2 className="bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] bg-clip-text text-lg font-bold text-transparent">
                Your Profile
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Sidebar Content */}
            <ScrollArea className="flex-1 p-4">
              {userInfo && (
                <div className="space-y-6">
                  {/* Level Card */}
                  <Card className="border-indigo-500/30 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Award className="h-4 w-4 text-indigo-400" />
                        <span className="text-xs font-semibold uppercase tracking-wide text-indigo-400">
                          Level
                        </span>
                      </div>
                      <p className="text-lg font-bold text-white">{userInfo.level}</p>
                    </CardContent>
                  </Card>

                  {/* Expertise Card */}
                  <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Target className="h-4 w-4 text-purple-400" />
                        <span className="text-xs font-semibold uppercase tracking-wide text-purple-400">
                          Expertise
                        </span>
                      </div>
                      <p className="text-lg font-bold text-white">{userInfo.expertise}</p>
                    </CardContent>
                  </Card>

                  {/* Learning Style Card */}
                  <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-cyan-400" />
                        <span className="text-xs font-semibold uppercase tracking-wide text-cyan-400">
                          Learning Style
                        </span>
                      </div>
                      <p className="text-lg font-bold text-white">{userInfo.learningStyle}</p>
                    </CardContent>
                  </Card>

                  <Separator className="bg-gray-700/50" />

                  {/* Goals Section */}
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
                        Your Goals
                      </span>
                    </div>
                    <div className="space-y-2">
                      {userInfo.goals.map((goal, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2 rounded-lg bg-gray-800/50 p-3 backdrop-blur-sm"
                        >
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                          <span className="text-sm text-gray-300">{goal}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-gray-700/50" />

                  {/* Quick Tips */}
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-400" />
                      <span className="text-xs font-semibold uppercase tracking-wide text-yellow-400">
                        Quick Tips
                      </span>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="outline" className="border-yellow-500/30 bg-yellow-900/20 text-yellow-300">
                        Be specific in your prompts
                      </Badge>
                      <Badge variant="outline" className="border-blue-500/30 bg-blue-900/20 text-blue-300">
                        Provide context
                      </Badge>
                      <Badge variant="outline" className="border-green-500/30 bg-green-900/20 text-green-300">
                        Iterate and improve
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </ScrollArea>

            {/* Sidebar Footer */}
            <div className="border-t border-gray-700/50 p-4">
              <Link href="/problems/1">
                <Button className="w-full rounded-lg bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] font-semibold text-black transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/50">
                  <Zap className="mr-2 h-4 w-4" />
                  Challenge Mode
                </Button>
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="border-b border-gray-700/50 bg-gray-900/30 backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              {!isSidebarOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(true)}
                  className="text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              <div>
                <h1 className="bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] bg-clip-text text-xl font-bold text-transparent">
                  Prompt Engineering Studio
                </h1>
                <p className="text-xs text-gray-400">Master the art of AI communication</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                New Chat
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full p-0">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="" alt="User Avatar" />
                      <span className="bg-second flex h-full w-full items-center justify-center rounded-full text-sm font-medium text-white">
                        {userInitial?.toUpperCase()}
                      </span>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 border-gray-700 bg-gray-900 text-gray-100">
                  <DropdownMenuItem
                    onClick={() => (window.location.href = "/profile")}
                    className="hover:bg-gray-800"
                  >
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => logout} className="hover:bg-gray-800">
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="mx-auto max-w-4xl space-y-6 pb-32">
            {messages?.length === 0 && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center space-y-8 py-20 text-center"
              >
                <div className="rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-6 shadow-2xl">
                  <Sparkles className="h-12 w-12 text-white" />
                </div>
                <div className="space-y-2">
                  <h2 className="bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] bg-clip-text text-3xl font-bold text-transparent">
                    Welcome to Prompt Engineering Studio
                  </h2>
                  <p className="text-gray-400">
                    Start crafting amazing prompts and get instant AI-powered feedback
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {[
                    { icon: Target, text: "Set clear objectives", color: "from-indigo-500 to-purple-600" },
                    { icon: Lightbulb, text: "Provide context", color: "from-purple-500 to-pink-600" },
                    { icon: TrendingUp, text: "Iterate & improve", color: "from-pink-500 to-orange-600" },
                  ].map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-center gap-3 rounded-lg border border-gray-700/50 bg-gray-800/30 p-4 backdrop-blur-sm"
                    >
                      <div className={`rounded-full bg-gradient-to-br ${tip.color} p-2`}>
                        <tip.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm text-gray-300">{tip.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Prompt Suggestions */}
                <div className="w-full max-w-3xl pt-8">
                  <PromptSuggestions onSelectPrompt={(prompt) => setInput(prompt)} />
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {messages?.map((message, index) => renderMessage(message, index))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex justify-start gap-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-indigo-500 bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
                  <Sparkles className="h-4 w-4" />
                </div>
                <Card className="max-w-[85%] border-0 bg-gray-800/50 backdrop-blur-sm shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex space-x-2">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -8, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.6,
                            delay: i * 0.2,
                          }}
                          className="h-2 w-2 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-red-500/50 bg-red-900/20 p-4 text-red-300"
              >
                <p className="text-sm">
                  Oops! Something went wrong. Please try again.
                </p>
              </motion.div>
            )}

            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-gray-700/50 bg-gray-900/30 p-4 backdrop-blur-md">
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-4xl items-center gap-3"
          >
            <div className="relative flex-1">
              <textarea
                value={input}
                onChange={handleInputChange}
                placeholder="Type your prompt here... (Press Enter to send, Shift+Enter for new line)"
                className="w-full resize-none rounded-2xl border border-gray-700 bg-gray-800/50 px-6 py-4 text-gray-100 placeholder-gray-500 backdrop-blur-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="h-14 w-14 shrink-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg transition-all hover:shadow-indigo-500/50 disabled:opacity-50"
            >
              <Send className="h-5 w-5 text-white" />
            </Button>
          </form>
          <div className="mx-auto mt-2 max-w-4xl">
            <p className="text-center text-xs text-gray-500">
              Powered by Google Gemini AI • Your conversations are private
            </p>
          </div>
        </div>
      </div>

      <UserInputModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default ModernChatInterface;

