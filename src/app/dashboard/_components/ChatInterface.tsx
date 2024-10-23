'use client'

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowUp, Send, Settings2, ChevronRight, ChevronLeft, Zap } from "lucide-react"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import UserInputModal from "./UserInputModal"

interface UserInfo {
  level: string
  expertise: string
  learningStyle: string
  goals: string[]
}

interface Message {
  role: "user" | "assistant"
  content: string
  user_type:UserInfo
}

interface ImprovedPrompt {
  title: string
  prompt: string
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
  onAnalyzePrompt: (prompt: string, userInfo: UserInfo) => Promise<string>
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onAnalyzePrompt }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [promptAnalysis, setPromptAnalysis] = useState<PromptAnalysis | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [promptStrength, setPromptStrength] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (userInfo) {
      const welcomeMessage = `Welcome! I see you're a ${userInfo.level} prompt engineer with expertise in ${userInfo.expertise}. 
        Your ${userInfo.learningStyle} learning style will help us customize feedback for you. 
        Let's work on your goals: ${userInfo.goals.join(", ")}. How can I help you improve your prompts today?`

      setMessages([
        {
          role: "assistant",
          content: welcomeMessage,
          user_type:userInfo
        },
      ])
    }
  }, [userInfo])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleModalClose = (data: UserInfo) => {
    setUserInfo(data)
    setIsModalOpen(false)
  }

  const handleSendMessage = async () => {
    if (inputValue.trim() === "" || !userInfo || isTyping) return;
  
    const newUserMessage = { 
      role: "user", 
      content: inputValue,
      user_type: userInfo 
    } as Message;
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);
  
    try {
      const response = await fetch('http://localhost:8000/analyze-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, newUserMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          user_type: {
            level: userInfo.level,
            expertise: userInfo.expertise,
            learning_style: userInfo.learningStyle,
            goals: userInfo.goals
          }
        })
      });
  
      if (!response.ok) throw new Error('Failed to fetch response');
      const data = await response.json();
      setPromptAnalysis(data);
      
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `${data.feedback}\n\nStrength: ${data.label}\nTags: ${data.tags.join(', ')}`,
        user_type: userInfo
      } as Message]);
  
      // Set prompt strength based on label
      if (data.label === 'STRONG') setPromptStrength(100);
      else if (data.label === 'MODERATE') setPromptStrength(50);
      else setPromptStrength(25);
  
    } catch (error) {
      console.error('Analysis error:', error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Connection interrupted. Please try again.",
        user_type: userInfo
      } as Message]);
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
      <Card className={`max-w-[85%] border-0 ${message.role === "user" ? "bg-indigo-900" : "bg-indigo-900"} text-gray-100`}>
        <CardContent className="p-3">
          <p className="whitespace-pre-wrap text-sm">{message.content}</p>
          {message.role === "user" && promptAnalysis && index === messages.length - 2 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-3 border-t border-gray-700 pt-3"
            >
              {/* Motivation Message */}
              <div className="mb-3 text-sm text-indigo-300 italic">
                {promptAnalysis.motivation}
              </div>
  
              {/* Learning Points */}
              <div className="mb-3">
                <span className="text-xs font-semibold text-indigo-400">Key Learning Points:</span>
                <ul className="mt-1 space-y-1">
                  {promptAnalysis.learning_points.map((point, i) => (
                    <li key={i} className="text-xs text-gray-300">• {point}</li>
                  ))}
                </ul>
              </div>
  
              {/* Improved Versions */}
              <div className="mb-4">
                <span className="text-xs font-semibold text-indigo-400">Improved Versions:</span>
                <div className="mt-2 space-y-3">
                  {promptAnalysis.improved_prompts.map((suggestion, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gray-800 rounded-lg p-3 hover:bg-gray-700 cursor-pointer transition-colors"
                      onClick={() => setInputValue(suggestion.prompt)}
                    >
                      <div className="text-xs font-medium text-indigo-300 mb-1">
                        {suggestion.title}
                      </div>
                      <p className="text-sm text-gray-300">
                        {suggestion.prompt}
                      </p>
                      <div className="mt-2 text-xs text-indigo-200 italic">
                        {suggestion.reasoning}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
  
              {/* Strength Indicator */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Progress 
                  value={promptStrength} 
                  className={`h-2 w-full ${
                    promptAnalysis.label === 'STRONG' ? 'bg-green-500' :
                    promptAnalysis.label === 'MODERATE' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} 
                />
              </motion.div>
  
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                {promptAnalysis.tags.map((tag, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className="bg-indigo-600 px-2 py-1 rounded-md text-xs cursor-pointer hover:bg-indigo-700"
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

  const SidebarContentComponent = () => (
    <>
      <SidebarHeader className="border-b border-gray-700 bg-gray-900 p-4">
        <h2 className="text-lg font-semibold text-white">Your Profile</h2>
      </SidebarHeader>
      <SidebarContent className="bg-gray-900 py-4">
        {userInfo && (
          <SidebarGroup>
            <SidebarGroupLabel className="font-black text-indigo-500">
              Level
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-4 text-sm text-gray-300">
              {userInfo.level}
            </SidebarGroupContent>

            <SidebarGroupLabel className="font-black text-indigo-500">
              Expertise
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-4 text-sm text-gray-300">
              {userInfo.expertise}
            </SidebarGroupContent>

            <SidebarGroupLabel className="font-black text-indigo-500">
              Learning Style
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-4 text-sm text-gray-300">
              {userInfo.learningStyle}
            </SidebarGroupContent>

            <SidebarGroupLabel className="font-black text-indigo-500">
              Goals
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-4">
              <ul className="list-disc pl-4 text-sm text-gray-300">
                {userInfo.goals.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </>
  )

  return (
    <SidebarProvider defaultOpen>
      <div className="fixed inset-0 flex h-screen w-screen overflow-hidden bg-indigo-950 text-gray-100">
        <motion.div
          initial={false}
          animate={{ width: isSidebarOpen ? "20rem" : "0rem" }}
          transition={{ duration: 0.3 }}
          className="border-r border-gray-700 bg-gray-900 overflow-hidden"
        >
          <Sidebar className="w-80">
            <SidebarContentComponent />
          </Sidebar>
        </motion.div>

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <div className="flex items-center justify-between bg-gray-900 px-4 py-2">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-white hover:text-indigo-400"
              >
                {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
              </motion.button>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-indigo-400"
                  >
                    <Settings2 className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 bg-gray-900" ref={scrollRef}>
            <div className="mx-auto max-w-4xl flex-1 space-y-4 p-4">
              <AnimatePresence>
                {messages.map((message, index) => renderMessage(message, index))}
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
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                          className="h-2 w-2 rounded-full bg-violet-950"
                        ></motion.div>
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
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
          <div className="border-t border-gray-700 bg-gray-900 p-4">
            <div className="mx-auto flex max-w-4xl space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your prompt here..."
                className="flex-1 rounded-full border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-400 focus:border-indigo-500"
                onKeyPress={(e) =>
                  e.key === "Enter" && !e.shiftKey && handleSendMessage()
                }
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleSendMessage}
                      disabled={isTyping  || !inputValue.trim()}
                      className="cursor-pointer rounded-full bg-indigo-500 hover:bg-purple-700"
                    >
                      <Send className="h-5 w-5 text-white" />
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
                      onClick={() => {/* Implement AI suggestion feature */}}
                      className="cursor-pointer rounded-full bg-indigo-700 hover:bg-indigo-600"
                    >
                      <Zap className="h-5 w-5 text-white" />
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

        <UserInputModal isOpen={isModalOpen} onClose={handleModalClose} />
      </div>
    </SidebarProvider>
  )
}

export default ChatInterface