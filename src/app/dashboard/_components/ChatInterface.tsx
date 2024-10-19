"use client"
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserInputModal from './UserInputModal';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  onAnalyzePrompt: (prompt: string) => Promise<string>;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onAnalyzePrompt }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [userInfo, setUserInfo] = useState<{ level: string; expertise: string } | null>(null);

  useEffect(() => {
    if (userInfo) {
      setMessages([
        {
          role: 'assistant',
          content: `Welcome! I see you're a ${userInfo.level} prompt engineer with expertise in ${userInfo.expertise}. How can I help you improve your prompts today?`
        }
      ]);
    }
  }, [userInfo]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const newMessages = [
      ...messages,
      { role: 'user', content: inputValue } as Message
    ];
    setMessages(newMessages);
    setInputValue('');

    const analysis = await onAnalyzePrompt(inputValue);
    setMessages([...newMessages, { role: 'assistant', content: analysis } as Message]);
  };

  const handleModalClose = (data: { level: string; expertise: string }) => {
    setUserInfo(data);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <UserInputModal isOpen={isModalOpen} onClose={handleModalClose} />
      <ScrollArea className="flex-grow p-4">
        {messages.map((message, index) => (
          <Card key={index} className={`mb-4 ${message.role === 'user' ? 'bg-blue-100' : 'bg-green-100'}`}>
            <CardContent className="p-4">
              <p className="font-semibold">{message.role === 'user' ? 'You' : 'Assistant'}:</p>
              <p>{message.content}</p>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your prompt here..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;