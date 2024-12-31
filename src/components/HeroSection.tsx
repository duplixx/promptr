import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import TypewriterPrompt from "@/components/ui/prompt-animation";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex min-h-screen items-center justify-center p-8">
      <div className="max-w-8xl flex w-full flex-col rounded-3xl p-12 lg:flex-row">
        <div className="mb-8 flex-1 pr-8 text-left lg:mb-0">
          <h1 className="mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-6xl font-bold leading-tight text-transparent lg:text-8xl">
            Master the Art of Prompt Engineering
          </h1>
          <p className="mb-6 bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-xl text-transparent">
            Learn, practice, and perfect your prompt engineering skills with our
            interactive platform. Get real-time feedback and improve your AI
            interactions.
          </p>
          <div className="flex items-center">
            <Link href="/dashboard">
              <Button className="rounded-[40px] bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-8 text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:from-blue-600 hover:to-purple-700">
                Start Learning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <div className="h-full rounded-xl border border-purple-500/20 bg-black p-4 text-white shadow-2xl shadow-purple-500/10">
            <div className="mb-4 flex items-center">
              <div className="mr-2 h-3 w-3 rounded-full bg-blue-400"></div>
              <span className="text-sm">Practice your prompts...</span>
            </div>
            <div className="mb-4 space-y-2">
              <div className="rounded-full bg-gray-800 px-4 py-2 text-sm">
                Generate a creative story about a time-traveling chef
              </div>
              <div className="rounded-full bg-gray-800 px-4 py-2 text-sm">
                Explain quantum computing to a 10-year-old
              </div>
            </div>
            <div className="mt-72">
              <TypewriterPrompt />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
