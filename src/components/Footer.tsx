import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-8">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p>&copy; 2023 PromptMaster. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <Link href="#" className="hover:text-blue-400 transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-blue-400 transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-blue-400 transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  )
}