"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const productLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/problems/1", label: "Challenges" },
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
  ];

  const resourceLinks = [
    { href: "/docs", label: "Documentation" },
    { href: "/api", label: "API" },
    { href: "/guides", label: "Guides" },
    { href: "/blog", label: "Blog" },
  ];

  const companyLinks = [
    { href: "/about", label: "About" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
    { href: "/legal", label: "Legal" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hello@promptr.ai", label: "Email" },
  ];

  return (
    <footer className="relative border-t border-gray-800 bg-black">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-[#8D81FF]" />
              <h3 className="bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] bg-clip-text text-2xl font-bold text-transparent">
                Promptr
              </h3>
            </Link>
            <p className="mb-6 text-gray-400">
              Master the art of prompt engineering with AI-powered feedback and
              real-time streaming. Join thousands learning the future of AI
              interaction.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-800 bg-gray-900/50 text-gray-400 transition-colors hover:border-gray-700 hover:text-white"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Product
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Resources
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row">
          <p className="text-sm text-gray-400">
            © 2025 Promptr. All rights reserved.
          </p>
          <div className="mt-4 flex flex-wrap gap-6 md:mt-0">
            <Link
              href="/privacy"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              Cookie Policy
            </Link>
          </div>
        </div>

        {/* Badge */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-600">
            Made with ❤️ by engineers, for engineers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
