import React from 'react';
import { Menu, Terminal } from 'lucide-react';

export const Navbar: React.FC<{ onLogin: () => void; user: any }> = ({ onLogin, user }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed w-full z-50 bg-[#071024]/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Terminal className="h-8 w-8 text-[#FFB703]" />
            <span className="text-xl font-bold font-mono tracking-tighter text-white">
              Code<span className="text-[#06B6D4]">Craft</span>
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#features" className="hover:text-[#FFB703] transition-colors px-3 py-2 rounded-md text-sm font-medium">Features</a>
              <a href="#how-it-works" className="hover:text-[#FFB703] transition-colors px-3 py-2 rounded-md text-sm font-medium">How it Works</a>
              <a href="#demo" className="hover:text-[#FFB703] transition-colors px-3 py-2 rounded-md text-sm font-medium">AI Demo</a>
              
              {user ? (
                 <span className="text-[#06B6D4] font-mono text-sm px-4 py-2 border border-[#06B6D4] rounded">
                   {user.displayName}
                 </span>
              ) : (
                <button 
                  onClick={onLogin}
                  className="bg-[#FFB703] text-black hover:bg-[#ffc94d] px-4 py-2 rounded-md text-sm font-bold transition-all shadow-[0_4px_0_rgb(180,120,0)] active:shadow-none active:translate-y-[4px]"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0a1630]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a 
              href="#features" 
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              How it Works
            </a>
            <a 
              href="#demo" 
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              AI Demo
            </a>
             <button 
                  onClick={() => {
                    onLogin();
                    setIsOpen(false);
                  }}
                  className="w-full text-left text-[#FFB703] font-bold block px-3 py-2 rounded-md text-base"
                >
                  {user ? `Hi, ${user.displayName}` : 'Sign In'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};