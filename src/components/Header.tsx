import React, { useState } from 'react';
import { Bell, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSignup = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('signup');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // close menu on mobile after click
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Alertora</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#architecture" className="text-gray-600 hover:text-blue-600 transition-colors">Architecture</a>
            <a href="#docs" className="text-gray-600 hover:text-blue-600 transition-colors">Docs</a>
            <button
              onClick={scrollToSignup}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Sign Up
            </button>
            <button
              onClick={scrollToSignup}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Get Started
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#architecture" className="text-gray-600 hover:text-blue-600 transition-colors">Architecture</a>
              <a href="#docs" className="text-gray-600 hover:text-blue-600 transition-colors">Docs</a>
              <button
                onClick={scrollToSignup}
                className="text-left text-gray-600 hover:text-blue-600 transition-colors"
              >
                Sign Up
              </button>
              <button
                onClick={scrollToSignup}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 w-fit"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
