import React from 'react';
import { Github } from 'lucide-react';

interface FooterProps {
  isLoading?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isLoading }) => {
  return (
    <footer className={`bg-white border-t border-gray-200 mt-auto transition-all duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="text-sm text-gray-500">© 2024 MyDashboard. All rights reserved.</span>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">Privacy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">Terms</a>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;