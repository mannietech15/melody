import { Home, Search, Download, Globe, Bell, Users, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="h-16 flex items-center justify-between px-6 py-2 sticky top-0 z-10 w-full bg-[#121212] rounded-t-lg">
      
      {/* Left (Empty space for balance since logo is usually in sidebar now, but let's keep a tiny logo or just back/fwd arrows) */}
      <div className="hidden md:flex items-center gap-2 w-[20%] min-w-fit">
        <button className="w-8 h-8 bg-black/40 rounded-full flex items-center justify-center text-white/60 cursor-not-allowed">
          <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current"><path d="M11.03.47a.75.75 0 010 1.06L4.56 8l6.47 6.47a.75.75 0 11-1.06 1.06L2.44 8 9.97.47a.75.75 0 011.06 0z"/></svg>
        </button>
        <button className="w-8 h-8 bg-black/40 rounded-full flex items-center justify-center text-white/60 cursor-not-allowed">
          <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current"><path d="M4.97.47a.75.75 0 000 1.06L11.44 8l-6.47 6.47a.75.75 0 101.06 1.06L13.56 8 6.03.47a.75.75 0 00-1.06 0z"/></svg>
        </button>
      </div>

      {/* Center: Search & Home */}
      <div className="flex items-center gap-2 flex-1 justify-center max-w-2xl">
        <Link to="/" className="bg-[#1f1f1f] hover:bg-[#2a2a2a] rounded-full p-3 text-white transition-colors cursor-pointer group">
          <Home size={24} className="group-hover:scale-105 transition-transform" fill="currentColor" />
        </Link>
        <div className="flex items-center bg-[#242424] hover:bg-[#2a2a2a] hover:border-[#333] border border-transparent transition-all rounded-full px-4 py-3 w-full max-w-md group">
          <Search size={22} className="text-melody-text group-hover:text-white transition-colors mr-3" />
          <input 
            type="text" 
            placeholder="What do you want to play?" 
            className="bg-transparent text-white focus:outline-none w-full placeholder:text-melody-text font-medium text-sm"
            onFocus={() => navigate('/search')}
          />
          <div className="hidden md:flex border-l border-[#444] pl-3 ml-2 items-center cursor-pointer hover:scale-105 transition-transform">
            <Globe size={20} className="text-melody-text hover:text-white transition-colors" />
          </div>
        </div>
      </div>

      {/* Right: Auth & Links */}
      <div className="flex items-center gap-2 lg:gap-4 w-auto md:w-[35%] justify-end min-w-fit">
        
        {user ? (
          <>
            <button className="hidden md:block bg-white text-black font-bold text-sm px-4 py-1.5 rounded-full hover:scale-105 transition-all">
              Explore Premium
            </button>
            <button className="hidden lg:flex items-center gap-1 text-melody-text hover:text-white font-bold text-sm hover:scale-105 transition-all mr-2">
              <Download size={16} />
              Install App
            </button>
            <button className="hidden md:block text-melody-text hover:text-white hover:scale-105 transition-transform">
              <Bell size={18} />
            </button>
            <button className="hidden md:block text-melody-text hover:text-white hover:scale-105 transition-transform">
              <Users size={18} />
            </button>
            <div 
              className="w-8 h-8 bg-[#1f1f1f] hover:bg-[#2a2a2a] rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform border-4 border-[#121212]"
              onClick={logout}
              title="Log out"
            >
              <User size={16} className="text-white" />
            </div>
          </>
        ) : (
          <>
            <div className="hidden lg:flex items-center gap-4 text-melody-text font-bold text-sm mr-4">
              <a href="#" className="hover:text-white hover:scale-105 transition-all">Premium</a>
              <a href="#" className="hover:text-white hover:scale-105 transition-all">Support</a>
              <a href="#" className="hover:text-white hover:scale-105 transition-all">Download</a>
            </div>
            <div className="hidden lg:block h-6 w-px bg-white/20"></div>
            <Link to="/signup" className="text-melody-text hover:text-white font-bold text-[15px] hover:scale-105 transition-all ml-4">
              Sign up
            </Link>
            <Link to="/login" className="bg-white text-black font-bold text-[15px] px-8 py-3 rounded-full hover:scale-105 hover:bg-gray-100 transition-all">
              Log in
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
