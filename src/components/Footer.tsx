import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';

const Footer = () => {
  return (
    <footer className="bg-black border-t-2 border-second">
      <MaxWidthWrapper>
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="bg-gradient-to-r from-[#FFA9AE] via-second to-[#69E1FE] text-3xl font-bold mb-2 text-transparent bg-clip-text">Promptr</h3>
            <p className="text-sm">
              Empowering developers with AI-driven code assistance and learning tools.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/features">Features</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/integrations">Integrations</Link></li>
              <li><Link href="/changelog">Changelog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/docs">Documentation</Link></li>
              <li><Link href="/api">API</Link></li>
              <li><Link href="/guides">Guides</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/legal">Legal</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© 2024 Promptr. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="text-sm hover:text-white">Terms of Service</Link>
            <Link href="/cookies" className="text-sm hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
