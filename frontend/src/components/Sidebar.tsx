import React from 'react';
import { Library, Plus, ArrowRight, Globe } from 'lucide-react';

export const Sidebar = () => {
  return (
    <aside className="w-[340px] bg-black flex flex-col p-2 h-full text-spotify-text">
      {/* Library Section */}
      <div className="bg-spotify-dark rounded-lg flex-1 flex flex-col min-h-0 relative">
        <div className="px-4 pt-4 pb-2 flex items-center justify-between shadow-sm z-10">
          <button className="flex items-center gap-4 font-bold text-spotify-text hover:text-white transition-colors py-2 px-2">
            <Library size={24} />
            Your Library
          </button>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-[#1A1A1A] rounded-full text-spotify-text hover:text-white transition-all">
              <Plus size={20} />
            </button>
          </div>
        </div>
        
        {/* Playlists / Podcasts Call to Action */}
        <div className="flex-1 overflow-y-auto px-2 mt-2 flex flex-col gap-6">
          <div className="bg-[#242424] rounded-lg p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-white font-bold text-[15px]">Create your first playlist</span>
              <span className="text-sm font-medium">It's easy, we'll help you</span>
            </div>
            <button className="bg-white text-black font-bold text-sm px-4 py-1.5 rounded-full w-fit hover:scale-105 transition-transform">
              Create playlist
            </button>
          </div>

          <div className="bg-[#242424] rounded-lg p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-white font-bold text-[15px]">Let's find some podcasts to follow</span>
              <span className="text-sm font-medium">We'll keep you updated on new episodes</span>
            </div>
            <button className="bg-white text-black font-bold text-sm px-4 py-1.5 rounded-full w-fit hover:scale-105 transition-transform">
              Browse podcasts
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="px-6 pb-8 pt-4 flex flex-col gap-8">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-medium text-spotify-text">
            <a href="#" className="hover:underline">Legal</a>
            <a href="#" className="hover:underline">Safety & Privacy Center</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Cookie Settings</a>
            <a href="#" className="hover:underline">About Ads</a>
            <a href="#" className="hover:underline">Accessibility</a>
            <a href="#" className="hover:underline">Cookies</a>
          </div>
          
          <button className="flex items-center gap-1 border border-[#878787] hover:border-white hover:scale-105 transition-all text-white text-sm font-bold px-3 py-1 rounded-full w-fit">
            <Globe size={16} />
            English
          </button>
        </div>
      </div>
    </aside>
  );
};
