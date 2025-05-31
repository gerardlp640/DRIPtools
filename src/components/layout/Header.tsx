import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, LogIn, UserCircle } from 'lucide-react';
import Button from '../ui/Button';
import { DollarSign } from 'lucide-react';
import TokenPurchaseModal from '../tokens/TokenPurchaseModal';

interface NavLink {
  name: string;
  path: string;
  children?: NavLink[];
  adminOnly?: boolean;
}

const navLinks: NavLink[] = [
  { name: 'Recommendations', path: '/dashboard' },
  { name: 'Search', path: '/search' },
  { name: 'Watchlist', path: '/watchlist' },
  { name: 'Tokens', path: '/tokens' },
  { name: 'Help', path: '/help' },
  { name: 'Control Panel', path: '/control-panel', adminOnly: true },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const location = useLocation();
  
  // For demo purposes, assuming user is a super admin
  const isSuperAdmin = true;
  
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredNavLinks = navLinks.filter(link => 
    !link.adminOnly || (link.adminOnly && isSuperAdmin)
  );

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? 'shadow-md py-2' : 'py-4'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-primary-dark" />
              <span className="text-xl font-bold text-primary-dark">DRIP Tools</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              {filteredNavLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-text-primary hover:text-primary-dark transition-colors ${
                    location.pathname === link.path ? 'font-medium' : ''
                  } ${link.adminOnly ? 'font-bold' : ''}`}
                  onClick={link.path === '/tokens' ? () => setIsTokenModalOpen(true) : undefined}
                >
                  {link.name}
                </Link>
              ))}
              <Button
                variant="text"
                onClick={() => {}}
                className="text-text-primary hover:text-primary-dark"
              >
                Logout
              </Button>
            </nav>
            
            <button
              className="md:hidden p-2 rounded-md text-text-primary hover:text-primary-dark"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="container mx-auto px-4 py-2">
              <div className="space-y-2">
                {filteredNavLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block py-2 text-text-primary hover:text-primary-dark transition-colors ${
                      location.pathname === link.path ? 'font-medium' : ''
                    } ${link.adminOnly ? 'font-bold' : ''}`}
                    onClick={link.path === '/tokens' ? () => setIsTokenModalOpen(true) : undefined}
                  >
                    {link.name}
                  </Link>
                ))}
                <Button
                  variant="text"
                  onClick={() => {}}
                  fullWidth
                  className="justify-start px-0 text-text-primary hover:text-primary-dark"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <TokenPurchaseModal
        isOpen={isTokenModalOpen}
        onClose={() => setIsTokenModalOpen(false)}
        currentTokens={10}
      />
    </>
  );
};

export default Header;