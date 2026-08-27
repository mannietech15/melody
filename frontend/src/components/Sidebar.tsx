import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Library, Plus, Search, ArrowRight, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Sidebar = () => {
  const { user } = useAuth();
  
  // Sidebar state
  const [width, setWidth] = useState(user ? 280 : 320);
  const isResizing = useRef(false);

  // Sync width on auth state change
  useEffect(() => {
    setWidth(user ? 280 : 320);
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
        let newWidth = e.clientX - 8;
        
        if (user) {
          if (newWidth > 200 && newWidth < 600) {
            setWidth(newWidth);
          } else if (newWidth <= 200) {
            setWidth(72);
          }
        } else {
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

  const isCollapsed = width === 72;

  // Mock library items matching the screenshot
  const libraryItems = [
    { id: 1, title: 'Liked Songs', subtitle: 'Playlist • 130 songs', icon: 'heart', color: 'from-indigo-500 to-purple-500', pinned: true },
    { id: 2, title: 'Your Episodes', subtitle: 'Playlist • Saved & downloaded episodes', icon: 'bookmark', color: 'bg-[#006450]', pinned: true },
    { id: 3, title: 'Forrest Frank', subtitle: 'Artist', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=50&h=50&fit=crop', rounded: true },
    { id: 4, title: 'Overwhelmed (Ryan Mack Remix)', subtitle: 'Playlist • mannie tech', image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=50&h=50&fit=crop' },
    { id: 5, title: 'Pentatonix', subtitle: 'Artist', image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f92c?w=50&h=50&fit=crop', rounded: true },
    { id: 6, title: 'Anne Wilson', subtitle: 'Artist', image: 'https://images.unsplash.com/photo-1516280440502-a1f945371a74?w=50&h=50&fit=crop', rounded: true },
    { id: 7, title: 'Frozen - Let It Go', subtitle: 'Playlist • Roman', image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=50&h=50&fit=crop' },
    { id: 8, title: 'Samantha Ebert', subtitle: 'Artist', image: 'https://images.unsplash.com/photo-1520699049698-acd2fce18738?w=50&h=50&fit=crop', rounded: true },
  ];

  return (
    <aside 
      style={{ width: `${width}px` }}
      className="bg-[#121212] rounded-lg flex flex-col h-full text-melody-text relative transition-[width] duration-75 overflow-hidden"
    >
      {/* Resizer Handle */}
      <div 
        onMouseDown={startResizing}
        className="absolute top-0 -right-1 w-2 h-full cursor-col-resize hover:bg-white/20 transition-colors z-50 rounded"
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className={`flex items-center justify-between px-4 py-3 shrink-0 ${isCollapsed ? 'flex-col gap-4 py-4' : ''}`}>
          <div className="flex items-center gap-4 text-melody-text hover:text-white transition-colors cursor-pointer group">
            <Library size={24} className="group-hover:text-white" />
            {!isCollapsed && <span className="font-bold text-[15px] whitespace-nowrap">Your Library</span>}
          </div>
          
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 hover:bg-[#1a1a1a] rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0">
                <Plus size={20} className="text-melody-text hover:text-white" />
              </div>
              <div className="w-8 h-8 hover:bg-[#1a1a1a] rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0">
                <ArrowRight size={20} className="text-melody-text hover:text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Filters & Sorting */}
        {!isCollapsed && (
          <div className="flex flex-col gap-2 shrink-0 px-4">
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
              <button className="bg-[#242424] hover:bg-[#2a2a2a] text-white font-medium text-[13px] px-3 py-1.5 rounded-full whitespace-nowrap transition-colors">Playlists</button>
              <button className="bg-[#242424] hover:bg-[#2a2a2a] text-white font-medium text-[13px] px-3 py-1.5 rounded-full whitespace-nowrap transition-colors">Artists</button>
              <button className="bg-[#242424] hover:bg-[#2a2a2a] text-white font-medium text-[13px] px-3 py-1.5 rounded-full whitespace-nowrap transition-colors">Albums</button>
              <button className="bg-[#242424] hover:bg-[#2a2a2a] text-white font-medium text-[13px] px-3 py-1.5 rounded-full whitespace-nowrap transition-colors">Podcasts</button>
            </div>
            
            <div className="flex items-center justify-between mt-1 mb-2">
              <div className="w-8 h-8 hover:bg-[#1a1a1a] rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0">
                <Search size={16} className="text-melody-text hover:text-white" />
              </div>
              <div className="flex items-center gap-2 text-melody-text hover:text-white font-bold text-sm cursor-pointer hover:scale-105 transition-transform">
                <span>Recents</span>
                <List size={16} />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className={`flex-1 overflow-y-auto w-full flex flex-col no-scrollbar ${isCollapsed ? 'items-center px-0' : 'px-2 pb-2'}`}>
          {user ? (
            <div className="flex flex-col gap-1 w-full">
              {libraryItems.map(item => (
                <div key={item.id} className={`flex items-center gap-3 cursor-pointer hover:bg-[#1a1a1a] rounded-md transition-colors ${!isCollapsed ? 'p-2' : 'p-3 w-fit'}`}>
                  
                  {item.icon ? (
                    <div className={`w-12 h-12 rounded-md flex items-center justify-center shrink-0 ${item.color.includes('from') ? 'bg-gradient-to-br ' + item.color : item.color}`}>
                      {item.icon === 'heart' && (
                        <svg viewBox="0 0 16 16" className="w-5 h-5 fill-white"><path d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-1.15-1.464l-.004-.01L.69 8.31a4.542 4.542 0 01-1.01-3.84A4.618 4.618 0 011.69 2z"/></svg>
                      )}
                      {item.icon === 'bookmark' && (
                        <svg viewBox="0 0 16 16" className="w-5 h-5 fill-white"><path d="M2.75 1a.75.75 0 00-.75.75v12.5c0 .76.845 1.206 1.464.76l4.536-3.264 4.536 3.264c.619.445 1.464-.001 1.464-.76V1.75A.75.75 0 0013.25 1h-10z"></path></svg>
                      )}
                    </div>
                  ) : (
                    <img src={item.image} alt={item.title} className={`w-12 h-12 shrink-0 object-cover ${item.rounded ? 'rounded-full' : 'rounded-md'}`} />
                  )}

                  {!isCollapsed && (
                    <div className="flex flex-col min-w-0 flex-1 justify-center">
                      <span className="text-white font-medium whitespace-nowrap truncate text-[15px]">{item.title}</span>
                      <div className="flex items-center gap-1.5 text-[13px] text-melody-text whitespace-nowrap truncate">
                        {item.pinned && (
                          <svg viewBox="0 0 16 16" className="w-3 h-3 fill-[#1ed760] shrink-0"><path d="M8.822.797a2.72 2.72 0 013.847 0l2.534 2.533a2.72 2.72 0 010 3.848l-3.678 3.678-1.337 4.988-4.486-4.486L1.28 15.78a.75.75 0 01-1.06-1.06l4.422-4.422L.156 5.812l4.987-1.337L8.822.797z"></path></svg>
                        )}
                        <span className="truncate">{item.subtitle}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* CTA Boxes */}
              <div className="bg-[#242424] rounded-lg p-4 flex flex-col gap-4 m-2">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-[15px] text-white tracking-tight">Create your first playlist</span>
                  <span className="font-medium text-[13px]">It's easy, we'll help you</span>
                </div>
                <button className="bg-white text-black font-bold text-[13px] px-4 py-1.5 rounded-full w-fit hover:scale-105 transition-transform whitespace-nowrap">
                  Create playlist
                </button>
              </div>

              <div className="bg-[#242424] rounded-lg p-4 flex flex-col gap-4 m-2 mt-2">
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
