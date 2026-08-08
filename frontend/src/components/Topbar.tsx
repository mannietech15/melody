import React from 'react';
import { Home, Search, Download, Globe } from 'lucide-react';

export const Topbar = () => {
  return (
    <header className="h-16 bg-black flex items-center justify-between px-6 sticky top-0 z-10 w-full">
      {/* Left: Logo */}
      <div className="flex items-center w-[20%] min-w-fit">
        <div className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform">
          <img src="/logo.png" alt="Melody Logo" className="w-10 h-10 object-contain rounded-md" />
          <span className="text-white text-2xl tracking-tighter font-bold">
            Melody
          </span>
        </div>
      </div>

      {/* Center: Search & Home */}
      <div className="flex items-center gap-2 flex-1 justify-center max-w-2xl">
        <button className="bg-[#1f1f1f] hover:bg-[#2a2a2a] rounded-full p-3 text-white transition-colors cursor-pointer group">
          <Home size={24} className="group-hover:scale-105 transition-transform" fill="currentColor" />
        </button>
        <div className="flex items-center bg-[#1f1f1f] hover:bg-[#2a2a2a] hover:border-[#333] border border-transparent transition-all rounded-full px-4 py-3 w-full max-w-md group">
          <Search size={22} className="text-melody-text group-hover:text-white transition-colors mr-3" />
          <input 
            type="text" 
            placeholder="What do you want to play?" 
            className="bg-transparent text-white focus:outline-none w-full placeholder:text-melody-text font-medium"
          />
          <div className="border-l border-[#444] pl-3 ml-2 flex items-center cursor-pointer hover:scale-105 transition-transform">
            <Globe size={20} className="text-melody-text hover:text-white transition-colors" />
          </div>
        </div>
      </div>

      {/* Right: Auth & Links */}
      <div className="flex items-center gap-6 w-[35%] justify-end min-w-fit">
        <div className="hidden lg:flex items-center gap-4 text-melody-text font-bold text-sm">
          <a href="#" className="hover:text-white hover:scale-105 transition-all">Premium</a>
          <a href="#" className="hover:text-white hover:scale-105 transition-all">Support</a>
          <a href="#" className="hover:text-white hover:scale-105 transition-all">Download</a>
        </div>
        
        <div className="hidden lg:block h-6 w-px bg-white/20"></div>

        <div className="flex items-center gap-4">
          <button className="hidden xl:flex items-center gap-1 text-melody-text hover:text-white font-bold text-sm hover:scale-105 transition-all">
            <Download size={16} />
            Install App
          </button>
          <button className="text-melody-text hover:text-white font-bold text-[15px] hover:scale-105 transition-all">
            Sign up
          </button>
          <button className="bg-white text-black font-bold text-[15px] px-8 py-3 rounded-full hover:scale-105 hover:bg-gray-100 transition-all">
            Log in
          </button>
        </div>
      </div>
    </header>
  );
};
