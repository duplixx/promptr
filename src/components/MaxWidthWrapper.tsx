import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface MaxWidthWrapperProps {
  className?: string;
  children: ReactNode;
}

export default function MaxWidthWrapper({
  className,
  children,
}: MaxWidthWrapperProps) {
  return (
    <div
      className={cn(
        "max-w-screen-3xl mx-auto w-full px-2.5 md:px-20",
        className,
      )}
    >
      {children}
    </div>
  );
}
