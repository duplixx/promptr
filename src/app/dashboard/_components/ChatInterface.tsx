"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUp, Send, Settings2 } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import UserInputModal from './UserInputModal';

interface UserInfo {
  level: string;
  expertise: string;
  learningStyle: string;
  goals: string[];
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  onAnalyzePrompt: (prompt: string, userInfo: UserInfo) => Promise<string>;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onAnalyzePrompt }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userInfo) {
      const welcomeMessage = `Welcome! I see you're a ${userInfo.level} prompt engineer with expertise in ${userInfo.expertise}. 
        Your ${userInfo.learningStyle} learning style will help us customize feedback for you. 
        Let's work on your goals: ${userInfo.goals.join(', ')}. How can I help you improve your prompts today?`;
      
      setMessages([{
        role: 'assistant',
        content: welcomeMessage
      }]);
    }
  }, [userInfo]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || !userInfo || isTyping) return;

    const newMessages = [
      ...messages,
      { role: 'user', content: inputValue } as Message
    ];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      const analysis = await onAnalyzePrompt(inputValue, userInfo);
      setMessages([...newMessages, { role: 'assistant', content: analysis } as Message]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { 
          role: 'assistant', 
          content: 'Sorry, there was an error analyzing your prompt. Please try again.' 
        } as Message
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleModalClose = (data: UserInfo) => {
    setUserInfo(data);
    setIsModalOpen(false);
  };

  const SidebarContentComponent = () => (
    <>
      <SidebarHeader className="border-b border-gray-700 p-4 bg-gray-900">
        <h2 className="text-lg font-semibold text-white">Your Profile</h2>
      </SidebarHeader>
      <SidebarContent className="py-4 bg-gray-900">
        {userInfo && (
          <SidebarGroup>
            <SidebarGroupLabel className='font-black text-indigo-500'>Level</SidebarGroupLabel>
            <SidebarGroupContent className="px-4 text-sm text-gray-300">
              {userInfo.level}
            </SidebarGroupContent>
  
            <SidebarGroupLabel className='font-black text-indigo-500'>Expertise</SidebarGroupLabel>
            <SidebarGroupContent className="px-4 text-sm text-gray-300">
              {userInfo.expertise}
            </SidebarGroupContent>
  
            <SidebarGroupLabel className='font-black text-indigo-500'>Learning Style</SidebarGroupLabel>
            <SidebarGroupContent className="px-4 text-sm text-gray-300">
              {userInfo.learningStyle}
            </SidebarGroupContent>
  
            <SidebarGroupLabel className='font-black text-indigo-500'>Goals</SidebarGroupLabel>
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
  );

  return (
    <SidebarProvider defaultOpen>
      <div className="fixed inset-0 flex h-screen w-screen overflow-hidden bg-indigo-950 text-gray-100">
        <Sidebar className="w-80 border-r border-gray-700 bg-gray-900">
          <SidebarContentComponent />
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="px-4 flex items-center justify-between bg-gray-900">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-black"
            >
              <Settings2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 bg-gray-900" ref={scrollRef}>
            <div className="mx-auto max-w-4xl flex-1 space-y-4 p-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <Card
                    className={`max-w-[85%] border-0 ${
                      message.role === "user"
                        ? "bg-indigo-900 text-gray-100"
                        : "bg-indigo-900 text-gray-100"
                    }`}
                  >
                    <CardContent className="p-3">
                      <p className="whitespace-pre-wrap text-sm">
                        {message.content}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <Card className="max-w-[85%] border-0 bg-gray-700">
                    <CardContent className="p-3">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-violet-950"></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-violet-950"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-violet-950"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
                className="flex-1 border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-400 focus:border-indigo-500 rounded-full"
                onKeyPress={(e) =>
                  e.key === "Enter" && !e.shiftKey && handleSendMessage()
                }
              />
              <Button
                onClick={handleSendMessage}
                disabled={isTyping || !inputValue.trim()}
                className="hover:bg-purple-700 rounded-full bg-indigo-500 cursor-pointer"
              >
                <ArrowUp className="h-6 w-6 text-white" />
              </Button>
            </div>
          </div>
        </div>

        <UserInputModal isOpen={isModalOpen} onClose={handleModalClose} />
      </div>
    </SidebarProvider>
  );
};

export default ChatInterface;
