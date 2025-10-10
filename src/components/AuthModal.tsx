"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/lib/simple-store";
import { Sparkles, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "login" | "register";
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  defaultMode = "login" 
}) => {
  const { login, register, isLoading, error } = useUserStore();
  const [mode, setMode] = useState<"login" | "register">(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (mode === "login") {
        await login(formData.email, formData.password);
      } else {
        await register(formData.email, formData.name, formData.password);
      }
      onClose();
    } catch (error) {
      console.error("Authentication error:", error);
      // Error is already handled by the store
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setFormData({ email: "", password: "", name: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-0 bg-black/95 p-0 text-white backdrop-blur-xl sm:max-w-[500px]">
        {/* Header with gradient background */}
        <div className="relative overflow-hidden rounded-t-lg bg-gradient-to-br from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] p-8">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10">
            <DialogHeader className="text-center">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <DialogTitle className="mb-2 text-3xl font-bold text-white">
                {mode === "login" ? "Welcome Back" : "Join Promptr"}
              </DialogTitle>
              <DialogDescription className="text-lg text-white/90">
                {mode === "login" 
                  ? "Sign in to continue your AI journey" 
                  : "Start your personalized learning experience"
                }
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Name field for registration */}
                {mode === "register" && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-300">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        className="h-12 rounded-xl border-gray-700 bg-gray-800/50 pl-10 text-white placeholder:text-gray-400 backdrop-blur-sm"
                        required={mode === "register"}
                      />
                    </div>
                  </div>
                )}

                {/* Email field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email"
                      className="h-12 rounded-xl border-gray-700 bg-gray-800/50 pl-10 text-white placeholder:text-gray-400 backdrop-blur-sm"
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder="Enter your password"
                      className="h-12 rounded-xl border-gray-700 bg-gray-800/50 pl-10 pr-10 text-white placeholder:text-gray-400 backdrop-blur-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400"
              >
                {error}
              </motion.div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] py-6 text-lg font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50"
            >
              <span className="relative z-10">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    {mode === "login" ? "Signing In..." : "Creating Account..."}
                  </div>
                ) : (
                  <>
                    {mode === "login" ? "Sign In" : "Create Account"}
                    <Sparkles className="ml-2 inline h-4 w-4" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#69E1FE] via-[#8D81FF] to-[#FFA9AE] opacity-0 transition-opacity group-hover:opacity-100" />
            </Button>

            {/* Mode toggle */}
            <div className="text-center">
              <button
                type="button"
                onClick={toggleMode}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {mode === "login" ? (
                  <>
                    Don't have an account?{" "}
                    <span className="font-medium text-[#8D81FF]">Sign up</span>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <span className="font-medium text-[#8D81FF]">Sign in</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
