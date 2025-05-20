import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "auth";
import LogOut from "@/components/LogOut";
import Image from "next/image";

export async function Header() {
  const session = await auth();
  return (
    <header className="fixed left-1/2 top-8 z-50 mx-auto w-full max-w-5xl -translate-x-1/2 transform">
      <div className="flex items-center justify-between rounded-full border border-second/50 bg-black px-4 py-4 shadow-lg shadow-second/10 backdrop-blur-md">
        <Link href="/" className="flex items-center space-x-2">
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8 bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] bg-clip-text text-transparent"
            fill="none"
            stroke="url(#blue-purple-gradient)"
            strokeWidth="2"
          >
            <defs>
              <linearGradient
                id="blue-purple-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>
            </defs>
            <path d="M5 3l7 7-7 7m7-7h12" />
          </svg>
          <span className="bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] bg-clip-text text-xl font-semibold text-transparent">
            Promptr
          </span>
        </Link>

        <nav className="hidden space-x-6 md:flex">
          <NavLink href="/chat">Chat</NavLink>
          <NavLink href="/features">Features</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/open-source">Open source</NavLink>
          <NavLink href="/docs">Docs</NavLink>
        </nav>

        <div className="flex items-center space-x-4">
          {!session?.user ? (
            <Link href="/sign-in">
              <Button
                variant="ghost"
                className="text-black transition-all duration-300 bg-second"
              >
                Log In
              </Button>
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-x-2 text-sm">
                {/* {session?.user?.name} */}
                {session?.user?.image && (
                  <Image
                    className="rounded-full"
                    width={30}
                    height={30}
                    alt="user image"
                    src={session?.user?.image || ""}
                  />
                )}
              </div>
              <LogOut />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-400 transition-all duration-300 hover:from-blue-400 hover:to-purple-400"
    >
      {children}
    </Link>
  );
}

export default Header;
