import React from 'react';
import { Home, Search, Library } from 'lucide-react';

export const Sidebar = () => {
  return (
    <aside className="w-80 bg-black flex flex-col p-2 gap-2 h-full text-spotify-text">
      {/* Top Nav Section */}
      <div className="bg-spotify-dark rounded-lg p-4 flex flex-col gap-5">
        <a href="#" className="flex items-center gap-4 text-spotify-white font-bold transition-colors hover:text-white">
          <Home size={24} />
          Home
        </a>
        <a href="#" className="flex items-center gap-4 font-semibold transition-colors hover:text-white">
          <Search size={24} />
          Search
        </a>
      </div>

      {/* Library Section */}
      <div className="bg-spotify-dark rounded-lg flex-1 p-2 flex flex-col">
        <div className="p-2 flex items-center justify-between">
          <button className="flex items-center gap-2 font-bold hover:text-white transition-colors">
            <Library size={24} />
            Your Library
          </button>
        </div>
        
        {/* Playlists placeholder */}
        <div className="flex-1 overflow-y-auto mt-2">
          {/* We will implement the playlist section in the next steps */}
        </div>
      </div>
    </aside>
  );
};
