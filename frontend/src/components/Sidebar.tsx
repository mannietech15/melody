import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Library, Plus, Search, Home, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Sidebar = () => {
  const { user } = useAuth();
  
  // Sidebar state
  const [width, setWidth] = useState(user ? 72 : 280);
  const isResizing = useRef(false);

  // Sync width on auth state change
  useEffect(() => {
    setWidth(user ? 72 : 280);
  }, [user]);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
  }, []);

  const stopResizing = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = 'default';
  }, []);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing.current) {
        let newWidth = e.clientX - 8; // 8px padding from App.tsx container
        
        if (user) {
          if (newWidth > 200 && newWidth < 600) {
            setWidth(newWidth);
          } else if (newWidth <= 200) {
            setWidth(72);
          }
        } else {
          // Logged out constraints
          if (newWidth >= 280 && newWidth < 600) {
            setWidth(newWidth);
          } else if (newWidth < 280) {
            setWidth(280);
          }
        }
      }
    },
    [user]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  // If width is 72, it's the collapsed state (only possible when user is true)
  const isCollapsed = width === 72;

  return (
    <aside 
      style={{ width: `${width}px` }}
      className={`bg-[#121212] rounded-lg flex flex-col h-full text-melody-text relative transition-[width] duration-75 ${isCollapsed ? 'items-center py-4 gap-4' : 'p-2 gap-2'}`}
    >
      {/* Resizer Handle */}
      <div 
        onMouseDown={startResizing}
        className="absolute top-0 -right-1 w-2 h-full cursor-col-resize hover:bg-white/20 transition-colors z-50 rounded"
      />

      {/* Top Section */}
      {!isCollapsed && (
        <div className="bg-[#121212] rounded-lg p-4 flex flex-col gap-5">
          <Link to="/" className="flex items-center gap-4 text-white hover:text-white transition-colors cursor-pointer group">
            <Home size={24} />
            <span className="font-bold">Home</span>
          </Link>
          <div className="flex items-center gap-4 text-melody-text hover:text-white transition-colors cursor-pointer group">
            <Search size={24} className="group-hover:text-white" />
            <span className="font-bold">Search</span>
          </div>
        </div>
      )}

      {/* Library Section */}
      <div className={`flex-1 flex flex-col overflow-hidden ${!isCollapsed ? 'bg-[#121212] rounded-lg' : ''}`}>
        
        {/* Header */}
        {isCollapsed ? (
          <>
            <Link to="/" className="w-12 h-12 bg-[#242424] hover:bg-[#2a2a2a] rounded-lg flex items-center justify-center transition-colors mb-2 shrink-0">
              <Home size={24} className="text-white" />
            </Link>
            <div className="w-12 h-12 hover:bg-[#1a1a1a] rounded-lg flex items-center justify-center transition-colors cursor-pointer group shrink-0">
              <Search size={24} className="group-hover:text-white" />
            </div>
            <div className="w-10 border-t border-[#282828] my-2 shrink-0"></div>
            <div className="w-12 h-12 hover:bg-[#1a1a1a] rounded-lg flex items-center justify-center transition-colors cursor-pointer group shrink-0">
              <Library size={24} className="group-hover:text-white" />
            </div>
            <div className="w-12 h-12 hover:bg-[#1a1a1a] rounded-lg flex items-center justify-center transition-colors cursor-pointer group shrink-0">
              <Plus size={24} className="group-hover:text-white" />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between px-4 py-3 shrink-0">
            <div className="flex items-center gap-4 text-melody-text hover:text-white transition-colors cursor-pointer group">
              <Library size={24} className="group-hover:text-white" />
              <span className="font-bold text-[15px] whitespace-nowrap">Your Library</span>
            </div>
            <div className="w-8 h-8 hover:bg-[#1a1a1a] rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0">
              <Plus size={20} className="text-melody-text hover:text-white" />
            </div>
          </div>
        )}

        {/* Content */}
        <div className={`flex-1 overflow-y-auto w-full flex flex-col no-scrollbar ${isCollapsed ? 'items-center gap-2 mt-4' : 'px-2 py-2 gap-4'}`}>
          {user ? (
            <>
              {/* Liked Songs */}
              <div className={`flex items-center gap-4 cursor-pointer hover:bg-[#1a1a1a] rounded-md transition-colors ${!isCollapsed ? 'p-2' : ''}`}>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-md flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 16 16" className="w-5 h-5 fill-white"><path d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-1.15-1.464l-.004-.01L.69 8.31a4.542 4.542 0 01-1.01-3.84A4.618 4.618 0 011.69 2z"/></svg>
                </div>
                {!isCollapsed && (
                  <div className="flex flex-col min-w-0">
                    <span className="text-white font-medium whitespace-nowrap truncate">Liked Songs</span>
                    <span className="text-[13px] text-melody-text whitespace-nowrap truncate">Playlist • 120 songs</span>
                  </div>
                )}
              </div>
              
              {/* Playlists */}
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`flex items-center gap-4 cursor-pointer hover:bg-[#1a1a1a] rounded-md transition-colors ${!isCollapsed ? 'p-2' : ''}`}>
                  <div className="w-12 h-12 bg-neutral-800 rounded-md shrink-0 overflow-hidden">
                    <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=50&h=50&fit=crop`} alt="Playlist" className="w-full h-full object-cover opacity-80 hover:opacity-100" />
                  </div>
                  {!isCollapsed && (
                    <div className="flex flex-col min-w-0">
                      <span className="text-white font-medium whitespace-nowrap truncate">My Playlist #{i}</span>
                      <span className="text-[13px] text-melody-text whitespace-nowrap truncate">Playlist • MannieTech</span>
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <>
              {/* CTA Boxes */}
              <div className="bg-[#242424] rounded-lg p-4 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-[15px] text-white tracking-tight">Create your first playlist</span>
                  <span className="font-medium text-[13px]">It's easy, we'll help you</span>
                </div>
                <button className="bg-white text-black font-bold text-[13px] px-4 py-1.5 rounded-full w-fit hover:scale-105 transition-transform whitespace-nowrap">
                  Create playlist
                </button>
              </div>

              <div className="bg-[#242424] rounded-lg p-4 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-[15px] text-white tracking-tight">Let's find some podcasts to follow</span>
                  <span className="font-medium text-[13px]">We'll keep you updated on new episodes</span>
                </div>
                <button className="bg-white text-black font-bold text-[13px] px-4 py-1.5 rounded-full w-fit hover:scale-105 transition-transform whitespace-nowrap">
                  Browse podcasts
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer (Logged out only) */}
        {!user && (
          <div className="px-6 pb-8 pt-4 flex flex-col gap-6 mt-auto">
            <div className="flex flex-wrap gap-x-4 gap-y-3">
              {['Legal', 'Safety & Privacy Center', 'Privacy Policy', 'Cookies', 'About Ads', 'Accessibility'].map((link) => (
                <a key={link} href="#" className="text-[11px] font-medium text-melody-text hover:underline whitespace-nowrap">{link}</a>
              ))}
            </div>
            <button className="border border-[#878787] hover:border-white rounded-full flex items-center gap-1 px-3 py-1.5 w-fit hover:scale-105 transition-transform">
              <Globe size={16} className="text-white" />
              <span className="text-white text-sm font-bold whitespace-nowrap">English</span>
            </button>
          </div>
        )}
      </div>

    </aside>
  );
};
