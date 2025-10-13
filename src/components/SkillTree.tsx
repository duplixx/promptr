"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Lightbulb, 
  BookOpen, 
  Zap, 
  Star,
  Award,
  TrendingUp,
  CheckCircle
} from "lucide-react";

interface SkillNode {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  level: number;
  maxLevel: number;
  unlocked: boolean;
  category: 'clarity' | 'specificity' | 'context' | 'persona';
}

interface SkillTreeProps {
  userLevel: string;
  expertise: string;
  goals: string[];
}

const skillNodes: SkillNode[] = [
  {
    id: 'clarity-basics',
    name: 'Clarity Basics',
    description: 'Write clear, understandable prompts',
    icon: Target,
    level: 2,
    maxLevel: 5,
    unlocked: true,
    category: 'clarity'
  },
  {
    id: 'specificity-intro',
    name: 'Specificity Intro',
    description: 'Add specific details to your prompts',
    icon: Lightbulb,
    level: 1,
    maxLevel: 5,
    unlocked: true,
    category: 'specificity'
  },
  {
    id: 'context-awareness',
    name: 'Context Awareness',
    description: 'Provide relevant background information',
    icon: BookOpen,
    level: 0,
    maxLevel: 5,
    unlocked: true,
    category: 'context'
  },
  {
    id: 'persona-mastery',
    name: 'Persona Mastery',
    description: 'Define clear roles and perspectives',
    icon: Zap,
    level: 0,
    maxLevel: 5,
    unlocked: false,
    category: 'persona'
  },
  {
    id: 'advanced-techniques',
    name: 'Advanced Techniques',
    description: 'Master prompt chaining and optimization',
    icon: Star,
    level: 0,
    maxLevel: 5,
    unlocked: false,
    category: 'clarity'
  }
];

const categoryColors = {
  clarity: 'from-blue-500 to-cyan-500',
  specificity: 'from-purple-500 to-pink-500',
  context: 'from-green-500 to-emerald-500',
  persona: 'from-orange-500 to-red-500'
};

const categoryIcons = {
  clarity: Target,
  specificity: Lightbulb,
  context: BookOpen,
  persona: Zap
};

export default function SkillTree({ userLevel, expertise, goals }: SkillTreeProps) {
  const totalXP = skillNodes.reduce((sum, node) => sum + node.level, 0);
  const maxXP = skillNodes.reduce((sum, node) => sum + node.maxLevel, 0);
  const progressPercentage = (totalXP / maxXP) * 100;

  const getCategoryProgress = (category: string) => {
    const categoryNodes = skillNodes.filter(node => node.category === category);
    const categoryXP = categoryNodes.reduce((sum, node) => sum + node.level, 0);
    const categoryMaxXP = categoryNodes.reduce((sum, node) => sum + node.maxLevel, 0);
    return (categoryXP / categoryMaxXP) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="border-gray-700 bg-gray-900/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">Prompt Engineering Progress</h3>
            </div>
            <Badge variant="outline" className="border-yellow-500/30 bg-yellow-900/20 text-yellow-300">
              {Math.round(progressPercentage)}% Complete
            </Badge>
          </div>
          <Progress value={progressPercentage} className="mb-2" />
          <div className="flex justify-between text-sm text-gray-400">
            <span>{totalXP} XP Earned</span>
            <span>{maxXP} XP Total</span>
          </div>
        </CardContent>
      </Card>

      {/* Category Progress */}
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(categoryIcons).map(([category, Icon]) => {
          const progress = getCategoryProgress(category);
          const colorClass = categoryColors[category as keyof typeof categoryColors];
          
          return (
            <Card key={category} className="border-gray-700 bg-gray-900/50">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`h-4 w-4 bg-gradient-to-r ${colorClass} text-white rounded p-1`} />
                  <span className="text-sm font-medium text-white capitalize">{category}</span>
                </div>
                <Progress value={progress} className="mb-1" />
                <span className="text-xs text-gray-400">{Math.round(progress)}%</span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Skill Nodes */}
      <div className="space-y-3">
        <h4 className="text-md font-semibold text-white flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-emerald-400" />
          Skill Development
        </h4>
        
        {skillNodes.map((node) => {
          const Icon = node.icon;
          const progress = (node.level / node.maxLevel) * 100;
          const colorClass = categoryColors[node.category];
          
          return (
            <Card 
              key={node.id} 
              className={`border-gray-700 ${
                node.unlocked 
                  ? 'bg-gray-900/50' 
                  : 'bg-gray-800/30 opacity-60'
              }`}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 bg-gradient-to-r ${colorClass} text-white rounded p-1`} />
                    <span className="text-sm font-medium text-white">{node.name}</span>
                    {node.unlocked && node.level === node.maxLevel && (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    )}
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${
                      node.unlocked 
                        ? 'border-green-500/30 bg-green-900/20 text-green-300'
                        : 'border-gray-500/30 bg-gray-900/20 text-gray-400'
                    }`}
                  >
                    {node.unlocked ? `${node.level}/${node.maxLevel}` : 'Locked'}
                  </Badge>
                </div>
                
                <p className="text-xs text-gray-400 mb-2">{node.description}</p>
                
                {node.unlocked && (
                  <div className="space-y-1">
                    <Progress value={progress} className="h-1" />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Level {node.level}</span>
                      <span>{node.maxLevel - node.level} to next level</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Personalized Recommendations */}
      <Card className="border-emerald-500/30 bg-emerald-900/10">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-4 w-4 text-emerald-400" />
            <h4 className="text-sm font-semibold text-white">Personalized Recommendations</h4>
          </div>
          <div className="space-y-2 text-sm text-gray-300">
            <p>Based on your <span className="text-emerald-400 font-medium">{expertise}</span> expertise:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Focus on <span className="text-blue-400">context awareness</span> for better teaching prompts</li>
              <li>Develop <span className="text-purple-400">specificity</span> for lesson plan generation</li>
              <li>Master <span className="text-orange-400">persona definition</span> for student feedback</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

