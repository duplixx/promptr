"use client";
import React, { useState } from "react";
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

const steps = ["Level", "Expertise", "Learning Style", "Goals"];

const UserInputModal: React.FC<UserInputModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    level: "",
    expertise: "",
    learningStyle: "",
    goals: [],
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose(userInfo);
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
        >
          {(() => {
            switch (currentStep) {
              case 0:
                return (
                  <>
                    <h4 className="mb-3 text-xl font-semibold">
                      Select your level
                    </h4>
                    <Select
                      onValueChange={(value) => updateUserInfo("level", value)}
                      value={userInfo.level}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </>
                );
              case 1:
                return (
                  <>
                    <h4 className="mb-3 text-xl font-semibold">
                      What&apos;s your area of expertise?
                    </h4>
                    <Input
                      value={userInfo.expertise}
                      onChange={(e) =>
                        updateUserInfo("expertise", e.target.value)
                      }
                      placeholder="Enter your area of expertise"
                    />
                  </>
                );
              case 2:
                return (
                  <>
                    <h4 className="mb-3 text-xl font-semibold">
                      Choose your learning style
                    </h4>
                    <RadioGroup
                      onValueChange={(value) =>
                        updateUserInfo("learningStyle", value)
                      }
                      value={userInfo.learningStyle}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="visual"
                          id="visual"
                          className="bg-white"
                        />
                        <Label htmlFor="visual">Visual</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="auditory"
                          id="auditory"
                          className="bg-white"
                        />
                        <Label htmlFor="auditory">Auditory</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="kinesthetic"
                          id="kinesthetic"
                          className="bg-white"
                        />
                        <Label htmlFor="kinesthetic">Kinesthetic</Label>
                      </div>
                    </RadioGroup>
                  </>
                );
              case 3:
                return (
                  <>
                    <h4 className="mb-3 text-xl font-semibold">
                      Select your goals
                    </h4>
                    <div className="space-y-2">
                      {[
                        "Improve writing skills",
                        "Learn advanced techniques",
                        "Increase efficiency",
                        "Explore creative applications",
                      ].map((goal) => (
                        <div className="flex items-center space-x-2" key={goal}>
                          <Checkbox
                            id={goal}
                            checked={userInfo.goals.includes(goal)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateUserInfo("goals", [
                                  ...userInfo.goals,
                                  goal,
                                ]);
                              } else {
                                updateUserInfo(
                                  "goals",
                                  userInfo.goals.filter((g) => g !== goal),
                                );
                              }
                            }}
                            className="bg-white"
                          />
                          <Label htmlFor={goal}>{goal}</Label>
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
      <DialogContent className="bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 text-white sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="mb-4 text-4xl font-bold leading-tight lg:text-5xl">
            Personalize Your AI Journey
          </DialogTitle>
          <DialogDescription className="text-xl text-white opacity-90">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
          </DialogDescription>
        </DialogHeader>
        <div className="py-8">
          <div className="rounded-xl border border-purple-500/20 bg-black bg-opacity-30 p-6 shadow-2xl shadow-purple-500/10">
            {renderStepContent()}
          </div>
        </div>
        <DialogFooter>
          <div className="flex w-full justify-between">
            <Button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="rounded-[20px] bg-white px-6 py-3 text-purple-600 hover:bg-gray-100"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 0 && !userInfo.level) ||
                (currentStep === 1 && !userInfo.expertise) ||
                (currentStep === 2 && !userInfo.learningStyle) ||
                (currentStep === 3 && userInfo.goals.length === 0)
              }
              className="rounded-[20px] bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:from-blue-600 hover:to-purple-700"
            >
              {currentStep === steps.length - 1
                ? "Start Your Journey"
                : "Next Step"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserInputModal;
