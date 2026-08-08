import { Library, Plus, Search, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <aside className="w-[72px] bg-[#121212] rounded-lg flex flex-col items-center py-4 gap-4 h-full text-melody-text">
      <Link to="/" className="w-12 h-12 bg-[#242424] hover:bg-[#2a2a2a] rounded-lg flex items-center justify-center transition-colors mb-2">
        <Home size={24} className="text-white" />
      </Link>
      
      <div className="w-12 h-12 hover:bg-[#1a1a1a] rounded-lg flex items-center justify-center transition-colors cursor-pointer group">
        <Search size={24} className="group-hover:text-white transition-colors" />
      </div>

      <div className="w-10 border-t border-[#282828] my-2"></div>

      <div className="w-12 h-12 hover:bg-[#1a1a1a] rounded-lg flex items-center justify-center transition-colors cursor-pointer group">
        <Library size={24} className="group-hover:text-white transition-colors" />
      </div>

      <div className="w-12 h-12 hover:bg-[#1a1a1a] rounded-lg flex items-center justify-center transition-colors cursor-pointer group">
        <Plus size={24} className="group-hover:text-white transition-colors" />
      </div>

      <div className="flex-1 overflow-y-auto w-full flex flex-col items-center gap-2 mt-4 no-scrollbar">
        {/* Liked Songs */}
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-md flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shrink-0">
          <svg viewBox="0 0 16 16" className="w-5 h-5 fill-white"><path d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-1.15-1.464l-.004-.01L.69 8.31a4.542 4.542 0 01-1.01-3.84A4.618 4.618 0 011.69 2z"/></svg>
        </div>
        
        {/* Playlists */}
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="w-12 h-12 bg-neutral-800 rounded-md shrink-0 cursor-pointer hover:scale-105 transition-transform overflow-hidden">
            <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=50&h=50&fit=crop`} alt="Playlist" className="w-full h-full object-cover opacity-80 hover:opacity-100" />
          </div>
        ))}
      </div>
    </aside>
  );
};
