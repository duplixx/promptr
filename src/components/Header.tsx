"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: <Sparkles className="h-4 w-4" /> },
    { href: "/problems/1", label: "Challenges", icon: <Zap className="h-4 w-4" /> },
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          isScrolled ? "py-3" : "py-6"
        )}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className={cn(
              "mx-auto flex max-w-6xl items-center justify-between rounded-full border px-6 py-3 backdrop-blur-xl transition-all duration-300",
              isScrolled
                ? "border-gray-800 bg-black/90 shadow-xl"
                : "border-gray-800/50 bg-black/50 shadow-lg"
            )}
          >
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <div className="relative">
                <Sparkles className="h-6 w-6 text-[#8D81FF] transition-transform group-hover:rotate-12" />
                <div className="absolute inset-0 animate-pulse blur-lg">
                  <Sparkles className="h-6 w-6 text-[#8D81FF] opacity-50" />
                </div>
              </div>
              <span className="bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] bg-clip-text text-xl font-bold text-transparent transition-all group-hover:tracking-wide">
                Promptr
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </span>
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFA9AE]/10 via-[#8D81FF]/10 to-[#69E1FE]/10 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden items-center gap-3 md:flex">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/problems/1">
                <Button
                  size="sm"
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] px-6 text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
                >
                  <span className="relative z-10">Try Challenges</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#69E1FE] via-[#8D81FF] to-[#FFA9AE] opacity-0 transition-opacity group-hover:opacity-100" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center rounded-lg p-2 text-gray-300 transition-colors hover:bg-gray-800 hover:text-white md:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-24 z-40 md:hidden"
          >
            <div className="container mx-auto px-4">
              <motion.div
                className="rounded-2xl border border-gray-800 bg-black/95 p-6 shadow-2xl backdrop-blur-xl"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
              >
                <nav className="flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-300 transition-all hover:bg-gray-800 hover:text-white"
                      >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-6 flex flex-col gap-3">
                  <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/problems/1" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] text-white hover:shadow-lg hover:shadow-purple-500/50">
                      Try Challenges
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
