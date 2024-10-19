import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-8 left-1/2 transform -translate-x-1/2 w-full max-w-5xl mx-auto z-50">
      <div className="bg-black backdrop-blur-md rounded-full border border-purple-500/20 shadow-lg shadow-purple-500/10 px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500" fill="none" stroke="url(#blue-purple-gradient)" strokeWidth="2">
            <defs>
              <linearGradient id="blue-purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>
            </defs>
            <path d="M5 3l7 7-7 7m7-7h12" />
          </svg>
          <span className="font-semibold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">PromptMaster</span>
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <NavLink href="/chat">Chat</NavLink>
          <NavLink href="/features">Features</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/open-source">Open source</NavLink>
          <NavLink href="/docs">Docs</NavLink>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-blue-300 hover:from-white hover:to-blue-400 transition-all duration-300">Log In</Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300">Sign up</Button>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-blue-300 hover:from-blue-400 hover:to-purple-400 transition-all duration-300">
      {children}
    </Link>
  );
}

export default Header;