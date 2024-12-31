import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-8">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p>&copy; 2023 PromptMaster. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <Link href="#" className="transition-colors hover:text-blue-400">
            Privacy Policy
          </Link>
          <Link href="#" className="transition-colors hover:text-blue-400">
            Terms of Service
          </Link>
          <Link href="#" className="transition-colors hover:text-blue-400">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
