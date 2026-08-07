import React, { useState, useEffect } from 'react';
import { Home, Search, Library, Plus, ArrowRight } from 'lucide-react';

interface Playlist {
  id: number;
  name: string;
  author: string;
}

export const Sidebar = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/playlists')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setPlaylists(data);
      })
      .catch(err => console.error("Error fetching playlists", err));
  }, []);

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

        {/* Playlists */}
        <div className="flex-1 overflow-y-auto mt-2">
          <ul className="px-2 pb-2">
            {playlists.map((item) => (
              <li key={item.id} className="p-2 flex items-center gap-3 hover:bg-[#1A1A1A] rounded-md cursor-pointer group transition-colors">
                <img 
                  src={`https://picsum.photos/seed/playlist${item.id}/50/50`} 
                  alt="Playlist Cover" 
                  className="w-12 h-12 rounded flex-shrink-0"
                />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-white font-medium truncate">{item.name}</span>
                  <div className="flex items-center gap-1 text-sm text-spotify-text truncate">
                    <span className="flex-shrink-0">Playlist</span>
                    <span className="text-[10px] mx-1">•</span>
                    <span className="truncate">{item.author}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};
