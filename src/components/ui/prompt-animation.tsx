"use client"
import React, { useState, useEffect } from 'react';
import { ArrowRight, Smile, Frown, Meh } from 'lucide-react';

const prompts: [string, string][] = [
  ["Write me an essay", "Write me a well-structured essay on climate change"],
  ["Make website", "Create a responsive website using React and Tailwind CSS"],
  ["How to cook", "Explain how to cook a gourmet Italian pasta dish"],
  ["What is AI", "Explain the fundamentals and applications of artificial intelligence"],
  ["Tell joke", "Share a clever and original joke about programming"]
];

const getEmojiForPrompt = (isImproved: boolean) => {
  return isImproved ? <Smile className="h-5 w-5 text-green-400" /> : <Frown className="h-5 w-5 text-red-400" />;
};

const TypewriterPrompt = () => {
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [promptIndex, setPromptIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isImproved, setIsImproved] = useState(false);

  useEffect(() => {
    const currentPromptPair = prompts[promptIndex % prompts.length] || ["", ""]; 
    const currentPromptText = isImproved ? currentPromptPair[1] : currentPromptPair[0];

    if (charIndex < currentPromptText.length) {
      const timer = setTimeout(() => {
        setCurrentPrompt(prev => prev + currentPromptText[charIndex]);
        setCharIndex(charIndex + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        if (!isImproved) {
          setIsImproved(true);
          setCurrentPrompt('');
          setCharIndex(0);
        } else {
          setIsImproved(false);
          setCurrentPrompt('');
          setCharIndex(0);
          setPromptIndex(prevIndex => (prevIndex + 1) % prompts.length);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [charIndex, promptIndex, isImproved]);

  return (
    <div className="bg-gray-800 rounded-full py-2 px-4 text-sm text-gray-400 flex items-center mt-4 w-full">
      <span className="mr-2">{currentPrompt}</span>
      <span className="ml-auto flex items-center">
        {getEmojiForPrompt(isImproved)}
        <ArrowRight className="h-4 w-4 text-second ml-2" />
      </span>
    </div>
  );
};

export default TypewriterPrompt;