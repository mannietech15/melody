import React from 'react';
import { Play, SkipBack, SkipForward, Shuffle, Repeat, Mic2, LayoutList, MonitorSpeaker, Volume2, Maximize2, Heart } from 'lucide-react';

export const Player = () => {
  return (
    <footer className="h-[90px] bg-black border-t border-[#282828] px-4 flex items-center justify-between z-50">
      {/* Track Info */}
      <div className="w-[30%] min-w-[180px] flex items-center gap-4">
        <img src="https://picsum.photos/seed/currenttrack/56/56" alt="Cover" className="w-14 h-14 rounded shadow-md" />
        <div className="flex flex-col justify-center">
          <a href="#" className="text-sm font-bold text-white hover:underline line-clamp-1">Song Title Placeholder</a>
          <a href="#" className="text-[11px] text-spotify-text hover:underline hover:text-white line-clamp-1">Artist Name Placeholder</a>
        </div>
        <button className="text-spotify-text hover:text-white ml-2">
          <Heart size={16} />
        </button>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center max-w-[722px] w-[40%] px-4">
        <div className="flex items-center gap-6 mb-2">
          <button className="text-spotify-text hover:text-white transition-colors"><Shuffle size={20} /></button>
          <button className="text-spotify-text hover:text-white transition-colors"><SkipBack size={20} fill="currentColor" /></button>
          <button className="bg-white rounded-full p-2 text-black hover:scale-105 transition-transform"><Play size={20} fill="currentColor" className="ml-1" /></button>
          <button className="text-spotify-text hover:text-white transition-colors"><SkipForward size={20} fill="currentColor" /></button>
          <button className="text-spotify-text hover:text-white transition-colors"><Repeat size={20} /></button>
        </div>
        <div className="w-full flex items-center gap-2 text-[11px] text-spotify-text font-medium">
          <span>0:00</span>
          <div className="h-1 bg-[#4d4d4d] rounded-full flex-1 group cursor-pointer">
            <div className="h-full bg-white rounded-full w-1/3 group-hover:bg-spotify-green relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow"></div>
            </div>
          </div>
          <span>3:45</span>
        </div>
      </div>

      {/* Right Controls / Volume */}
      <div className="w-[30%] min-w-[180px] flex justify-end items-center gap-4 text-spotify-text">
        <button className="hover:text-white transition-colors"><Mic2 size={16} /></button>
        <button className="hover:text-white transition-colors"><LayoutList size={16} /></button>
        <button className="hover:text-white transition-colors"><MonitorSpeaker size={16} /></button>
        <div className="flex items-center gap-2 w-24 group cursor-pointer">
          <button className="hover:text-white transition-colors"><Volume2 size={16} /></button>
          <div className="h-1 bg-[#4d4d4d] rounded-full flex-1">
            <div className="h-full bg-white rounded-full w-2/3 group-hover:bg-spotify-green relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow"></div>
            </div>
          </div>
        </div>
        <button className="hover:text-white transition-colors"><Maximize2 size={16} /></button>
      </div>
    </footer>
  );
};
