import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About section */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold mb-4 text-primary-dark">DRIP Tools</h3>
            <p className="text-text-secondary mb-4">
              DRIP Tools helps Canadian investors discover, research, and track stocks and ETFs 
              with Dividend Reinvestment Plans (DRIP) that match their budget and investment goals.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:contact@driptools.ca" className="text-text-secondary hover:text-primary-dark transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://github.com" className="text-text-secondary hover:text-primary-dark transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-text-secondary hover:text-primary-dark transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary-dark">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-text-secondary hover:text-primary-dark transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/search" className="text-text-secondary hover:text-primary-dark transition-colors">Search Stocks</Link>
              </li>
              <li>
                <Link to="/learn" className="text-text-secondary hover:text-primary-dark transition-colors">Learn About DRIP</Link>
              </li>
              <li>
                <Link to="/watchlist" className="text-text-secondary hover:text-primary-dark transition-colors">My Watchlist</Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary-dark">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.questrade.com/" 
                  className="text-text-secondary hover:text-primary-dark transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Open a Questrade Account
                </a>
              </li>
              <li>
                <Link to="/learn/tax-considerations" className="text-text-secondary hover:text-primary-dark transition-colors">
                  Tax Considerations
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-text-secondary hover:text-primary-dark transition-colors">
                  Investment Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-text-secondary hover:text-primary-dark transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-text-secondary">
              &copy; {new Date().getFullYear()} DRIP Tools. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <Link to="/privacy" className="text-sm text-text-secondary hover:text-primary-dark transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-text-secondary hover:text-primary-dark transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;