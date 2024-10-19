import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import TypewriterPrompt from '@/components/ui/prompt-animation'
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-8xl w-full rounded-3xl p-12 flex flex-col lg:flex-row">
        <div className="flex-1 text-left pr-8 mb-8 lg:mb-0">
          <h1 className="text-6xl lg:text-8xl font-bold mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Master the Art of Prompt Engineering
          </h1>
          <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-blue-300 mb-6">
            Learn, practice, and perfect your prompt engineering skills with our interactive platform. Get real-time feedback and improve your AI interactions.
          </p>
          <div className="flex items-center">
            <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-8 rounded-[40px] text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out">
              Start Learning Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-black rounded-xl p-4 text-white h-full border border-purple-500/20 shadow-2xl shadow-purple-500/10">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
              <span className="text-sm">Practice your prompts...</span>
            </div>
            <div className="space-y-2 mb-4">
              <div className="bg-gray-800 rounded-full py-2 px-4 text-sm">
                Generate a creative story about a time-traveling chef
              </div>
              <div className="bg-gray-800 rounded-full py-2 px-4 text-sm">
                Explain quantum computing to a 10-year-old
              </div>
            </div>
            <div className='mt-72'>
            <TypewriterPrompt />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}