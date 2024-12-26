import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import GradientBackground from "@/components/ui/gradient-background";

export const metadata: Metadata = {
  title: "Promptr",
  description: "Learn from best",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-black">
        <GradientBackground>{children}</GradientBackground>
      </body>
    </html>
  );
}
