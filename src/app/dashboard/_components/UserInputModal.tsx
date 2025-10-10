"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/lib/simple-store";
import { Sparkles, Target, Brain, Zap, CheckCircle2 } from "lucide-react";

interface UserInputModalProps {
  isOpen: boolean;
  onClose: (data: UserInfo) => void;
}

interface UserInfo {
  level: string;
  expertise: string;
  learningStyle: string;
  goals: string[];
}

const steps = [
  { 
    title: "Level", 
    icon: <Target className="h-5 w-5" />,
    description: "Choose your experience level"
  },
  { 
    title: "Expertise", 
    icon: <Brain className="h-5 w-5" />,
    description: "What's your area of focus?"
  },
  { 
    title: "Learning Style", 
    icon: <Zap className="h-5 w-5" />,
    description: "How do you learn best?"
  },
  { 
    title: "Goals", 
    icon: <CheckCircle2 className="h-5 w-5" />,
    description: "What do you want to achieve?"
  }
];

  const UserInputModal: React.FC<UserInputModalProps> = ({ isOpen, onClose }) => {
  const { profile, hasCompletedOnboarding, createProfile } = useUserStore();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    level: profile?.level ?? "",
    expertise: profile?.expertise ?? "",
    learningStyle: profile?.learningStyle ?? "",
    goals: profile?.goals ?? [],
  });

  // Memoize the onClose callback to prevent infinite loops
  const handleClose = useCallback((data: UserInfo) => {
    onClose(data);
  }, [onClose]);

  // Check if user has already completed onboarding
  useEffect(() => {
    if (hasCompletedOnboarding && profile) {
      handleClose({
        level: profile.level,
        expertise: profile.expertise,
        learningStyle: profile.learningStyle,
        goals: profile.goals,
      });
    }
  }, [hasCompletedOnboarding, profile]);

         const handleNext = async () => {
           if (currentStep < steps.length - 1) {
             setCurrentStep(currentStep + 1);
           } else {
             try {
               // Save to backend API via Zustand store
               await createProfile({
                 level: userInfo.level,
                 expertise: userInfo.expertise,
                 learning_style: userInfo.learningStyle,
                 goals: userInfo.goals,
               });
               
               handleClose(userInfo);
             } catch (error) {
               console.error('Failed to save profile:', error);
               // You could show an error message to the user here
             }
           }
         };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateUserInfo = (key: keyof UserInfo, value: string | string[]) => {
    setUserInfo({ ...userInfo, [key]: value });
  };

  const renderStepContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {(() => {
            switch (currentStep) {
              case 0:
                return (
                  <>
                    <div className="text-center">
                      <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                        <Target className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="mb-2 text-2xl font-bold text-white">
                        What&apos;s your experience level?
                      </h4>
                      <p className="text-gray-400">
                        This helps us tailor content to your needs
                      </p>
                    </div>
                    <Select
                      onValueChange={(value) => updateUserInfo("level", value)}
                      value={userInfo.level}
                    >
                      <SelectTrigger className="h-12 rounded-xl border-gray-700 bg-gray-800/50 text-white backdrop-blur-sm">
                        <SelectValue placeholder="Select your level" />
                      </SelectTrigger>
                      <SelectContent className="border-gray-700 bg-gray-800">
                        <SelectItem value="beginner" className="text-white hover:bg-gray-700">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <div>
                              <div className="font-medium">Beginner</div>
                              <div className="text-sm text-gray-400">New to prompt engineering</div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="intermediate" className="text-white hover:bg-gray-700">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-yellow-500" />
                            <div>
                              <div className="font-medium">Intermediate</div>
                              <div className="text-sm text-gray-400">Some experience with AI</div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="advanced" className="text-white hover:bg-gray-700">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-red-500" />
                            <div>
                              <div className="font-medium">Advanced</div>
                              <div className="text-sm text-gray-400">Expert in AI tools</div>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </>
                );
              case 1:
                return (
                  <>
                    <div className="text-center">
                      <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600">
                        <Brain className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="mb-2 text-2xl font-bold text-white">
                        What&apos;s your area of expertise?
                      </h4>
                      <p className="text-gray-400">
                        This helps us provide relevant examples
                      </p>
                    </div>
                    <Input
                      value={userInfo.expertise}
                      onChange={(e) =>
                        updateUserInfo("expertise", e.target.value)
                      }
                      placeholder="e.g., Software Development, Marketing, Data Science..."
                      className="h-12 rounded-xl border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-400 backdrop-blur-sm"
                    />
                  </>
                );
              case 2:
                return (
                  <>
                    <div className="text-center">
                      <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-teal-600">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="mb-2 text-2xl font-bold text-white">
                        How do you learn best?
                      </h4>
                      <p className="text-gray-400">
                        Choose your preferred learning style
                      </p>
                    </div>
                    <RadioGroup
                      onValueChange={(value) =>
                        updateUserInfo("learningStyle", value)
                      }
                      value={userInfo.learningStyle}
                      className="space-y-3"
                    >
                      {[
                        { value: "visual", label: "Visual", desc: "I learn through diagrams, charts, and visual examples" },
                        { value: "auditory", label: "Auditory", desc: "I learn through listening and verbal explanations" },
                        { value: "kinesthetic", label: "Hands-on", desc: "I learn by doing and practicing" },
                      ].map((style) => (
                        <div key={style.value} className="group">
                          <div className="flex items-start space-x-3 rounded-xl border border-gray-700 bg-gray-800/30 p-4 transition-all hover:border-gray-600 hover:bg-gray-800/50">
                            <RadioGroupItem
                              value={style.value}
                              id={style.value}
                              className="mt-1 border-gray-600 bg-gray-700 text-purple-600"
                            />
                            <div className="flex-1">
                              <Label htmlFor={style.value} className="cursor-pointer">
                                <div className="font-medium text-white">{style.label}</div>
                                <div className="text-sm text-gray-400">{style.desc}</div>
                              </Label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </>
                );
              case 3:
                return (
                  <>
                    <div className="text-center">
                      <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600">
                        <CheckCircle2 className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="mb-2 text-2xl font-bold text-white">
                        What do you want to achieve?
                      </h4>
                      <p className="text-gray-400">
                        Select all that apply to personalize your experience
                      </p>
                    </div>
                    <div className="space-y-3">
                      {[
                        { id: "improve-writing", label: "Improve writing skills", desc: "Better prompts and communication" },
                        { id: "learn-techniques", label: "Learn advanced techniques", desc: "Master complex prompt patterns" },
                        { id: "increase-efficiency", label: "Increase efficiency", desc: "Work faster and smarter" },
                        { id: "creative-applications", label: "Explore creative applications", desc: "Art, storytelling, and innovation" },
                      ].map((goal) => (
                        <div key={goal.id} className="group">
                          <div className="flex items-start space-x-3 rounded-xl border border-gray-700 bg-gray-800/30 p-4 transition-all hover:border-gray-600 hover:bg-gray-800/50">
                            <Checkbox
                              id={goal.id}
                              checked={userInfo.goals.includes(goal.label)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  updateUserInfo("goals", [
                                    ...userInfo.goals,
                                    goal.label,
                                  ]);
                                } else {
                                  updateUserInfo(
                                    "goals",
                                    userInfo.goals.filter((g) => g !== goal.label),
                                  );
                                }
                              }}
                              className="mt-1 border-gray-600 bg-gray-700 text-purple-600"
                            />
                            <div className="flex-1">
                              <Label htmlFor={goal.id} className="cursor-pointer">
                                <div className="font-medium text-white">{goal.label}</div>
                                <div className="text-sm text-gray-400">{goal.desc}</div>
                              </Label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                );
              default:
                return null;
            }
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="border-0 bg-black/95 p-0 text-white backdrop-blur-xl sm:max-w-[700px]">
        {/* Header with gradient background */}
        <div className="relative overflow-hidden rounded-t-lg bg-gradient-to-br from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] p-8">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10">
            <DialogHeader className="text-center">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <DialogTitle className="mb-2 text-3xl font-bold text-white lg:text-4xl">
                Personalize Your AI Journey
              </DialogTitle>
              <DialogDescription className="text-lg text-white/90">
                Let&apos;s customize your experience for better results
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-8 pt-6">
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-700">
              <motion.div
                className="h-2 rounded-full bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE]"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Step indicator */}
          <div className="mb-6 flex justify-center space-x-2">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                  index <= currentStep
                    ? "border-[#8D81FF] bg-[#8D81FF] text-white"
                    : "border-gray-600 bg-gray-800 text-gray-400"
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {index < currentStep ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          <div className="rounded-2xl border border-gray-700 bg-gray-900/50 p-8 backdrop-blur-sm">
            {renderStepContent()}
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="border-t border-gray-800 bg-gray-900/50 px-8 py-6">
          <div className="flex w-full items-center justify-between">
            <Button
              onClick={handleBack}
              disabled={currentStep === 0}
              variant="outline"
              className="rounded-xl border-gray-600 bg-transparent px-6 py-3 text-gray-300 transition-all hover:border-gray-500 hover:bg-gray-800 hover:text-white disabled:opacity-50"
            >
              Back
            </Button>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">
                {currentStep === steps.length - 1 ? "Ready to start?" : "Continue"}
              </span>
              <Button
                onClick={handleNext}
                disabled={
                  (currentStep === 0 && !userInfo.level) ||
                  (currentStep === 1 && !userInfo.expertise) ||
                  (currentStep === 2 && !userInfo.learningStyle) ||
                  (currentStep === 3 && userInfo.goals.length === 0)
                }
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] px-8 py-3 text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50"
              >
                <span className="relative z-10 font-semibold">
                  {currentStep === steps.length - 1 ? (
                    <>
                      Start Your Journey
                      <Sparkles className="ml-2 inline h-4 w-4" />
                    </>
                  ) : (
                    "Next Step"
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#69E1FE] via-[#8D81FF] to-[#FFA9AE] opacity-0 transition-opacity group-hover:opacity-100" />
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserInputModal;
