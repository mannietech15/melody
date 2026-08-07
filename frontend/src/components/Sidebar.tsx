import React from 'react';
import { Home, Search, Library, Plus, ArrowRight } from 'lucide-react';

export const Sidebar = () => {
  return (
    <aside className="w-[420px] bg-black flex flex-col p-2 gap-2 h-full text-spotify-text">
      {/* Top Nav Section */}
      <div className="bg-spotify-dark rounded-lg px-6 py-5 flex flex-col gap-6">
        <div className="flex items-center gap-1 mb-2 text-white font-bold text-xl cursor-pointer">
          {/* Simple Spotify Logo text placeholder */}
          <span className="text-white text-2xl tracking-tighter">Spotify</span>
        </div>
        
        <a href="#" className="flex items-center gap-4 text-spotify-white font-bold transition-colors hover:text-white">
          <Home size={26} />
          Home
        </a>
        <a href="#" className="flex items-center gap-4 font-semibold text-spotify-text transition-colors hover:text-white">
          <Search size={26} />
          Search
        </a>
      </div>

      {/* Library Section */}
      <div className="bg-spotify-dark rounded-lg flex-1 flex flex-col min-h-0">
        <div className="px-6 pt-4 pb-2 flex items-center justify-between">
          <button className="flex items-center gap-4 font-bold text-spotify-text hover:text-white transition-colors">
            <Library size={26} />
            Your Library
          </button>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-[#1A1A1A] rounded-full text-spotify-text hover:text-white transition-all">
              <Plus size={20} />
            </button>
            <button className="p-2 hover:bg-[#1A1A1A] rounded-full text-spotify-text hover:text-white transition-all">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
        
        {/* Filters/Pills */}
        <div className="px-6 py-2 flex gap-2">
          <button className="bg-[#2a2a2a] hover:bg-[#333333] transition-colors text-white px-4 py-1.5 rounded-full text-sm font-semibold">
            Playlists
          </button>
          <button className="bg-[#2a2a2a] hover:bg-[#333333] transition-colors text-white px-4 py-1.5 rounded-full text-sm font-semibold">
            Artists
          </button>
        </div>

        {/* Playlists placeholder */}
        <div className="flex-1 overflow-y-auto px-2 mt-2">
          {/* We will implement the playlist section in the next steps */}
        </div>
      </div>
    </aside>
  );
};
