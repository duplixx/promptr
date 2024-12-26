import React from 'react';
import ChatInterface from './_components/ChatInterface';
import analyzePrompt from '@/utils/analyzePrompt';
import { auth } from 'auth';
import {redirect } from "next/navigation";

const MainPage: React.FC = async () => {
  const session = await auth();

  if(!session?.user){
    redirect("/sign-in")
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-4">
        AI-based Prompt Engineering Learning Platform
      </h1>
      <ChatInterface onAnalyzePrompt={analyzePrompt} />
    </div>
  );
};

export default MainPage;