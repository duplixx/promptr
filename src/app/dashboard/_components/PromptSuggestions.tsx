"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Code, MessageSquare, Lightbulb } from "lucide-react";

interface PromptSuggestionsProps {
  onSelectPrompt: (prompt: string) => void;
}

const suggestions = [
  {
    icon: MessageSquare,
    title: "Creative Writing",
    prompt: "Write a short story about a time traveler who discovers that changing the past has unexpected consequences.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Code,
    title: "Code Generation",
    prompt: "Create a React component that displays a responsive card with hover effects and smooth animations.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Lightbulb,
    title: "Problem Solving",
    prompt: "Explain the concept of machine learning to a 10-year-old using simple analogies and everyday examples.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Sparkles,
    title: "Creative Ideas",
    prompt: "Generate 5 innovative startup ideas that combine AI technology with sustainable living practices.",
    color: "from-green-500 to-emerald-500",
  },
];

const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ onSelectPrompt }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-400">
        Try these example prompts:
      </h3>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className="cursor-pointer border-gray-700/50 bg-gray-800/30 backdrop-blur-sm transition-all hover:border-indigo-500/50 hover:bg-gray-800/50"
              onClick={() => onSelectPrompt(suggestion.prompt)}
            >
              <CardContent className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div
                    className={`rounded-lg bg-gradient-to-br ${suggestion.color} p-2`}
                  >
                    <suggestion.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {suggestion.title}
                  </span>
                </div>
                <p className="line-clamp-2 text-xs text-gray-400">
                  {suggestion.prompt}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PromptSuggestions;

