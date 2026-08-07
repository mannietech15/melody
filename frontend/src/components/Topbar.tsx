import React from 'react';
import { ChevronLeft, ChevronRight, User, Bell, Download } from 'lucide-react';

export const Topbar = () => {
  return (
    <header className="h-16 bg-transparent flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <button className="bg-black/70 rounded-full p-1 text-white/70 hover:text-white transition-colors">
          <ChevronLeft size={24} />
        </button>
        <button className="bg-black/70 rounded-full p-1 text-white/70 hover:text-white transition-colors cursor-not-allowed">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button className="bg-white text-black text-sm font-bold px-4 py-1.5 rounded-full hover:scale-105 transition-transform">
          Explore Premium
        </button>
        <button className="bg-black/70 text-white text-sm font-bold px-4 py-1.5 rounded-full flex items-center gap-2 hover:scale-105 transition-transform">
          <Download size={16} />
          Install App
        </button>
        <button className="bg-black/70 text-spotify-text hover:text-white rounded-full p-2 transition-colors">
          <Bell size={18} />
        </button>
        <button className="bg-black/70 text-spotify-text hover:text-white rounded-full p-1.5 transition-colors ml-2">
          <div className="bg-[#282828] rounded-full p-1">
            <User size={18} />
          </div>
        </button>
      </div>
    </header>
  );
};
