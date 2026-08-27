import { Home, Search as SearchIcon, Download, Bell, Users, Disc3 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="h-12 flex items-center justify-between px-2 w-full bg-black shrink-0">
      
      {/* Left: Spotify (Melody) Logo */}
      <div className="flex items-center gap-1 w-1/4 min-w-fit pl-2">
        <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform text-white">
          <img src="/logo.png" alt="Melody" className="w-8 h-8 object-contain" />
        </Link>
      </div>

      {/* Center: Search & Home */}
      <div className="flex items-center gap-2 flex-1 justify-center max-w-2xl">
        <Link to="/" className="bg-[#242424] hover:bg-[#2a2a2a] hover:scale-105 rounded-full p-3 text-white transition-all cursor-pointer">
          <Home size={22} fill="currentColor" />
        </Link>
        <div className="flex items-center bg-[#242424] hover:bg-[#2a2a2a] hover:border-[#333] border border-transparent transition-all rounded-full px-4 py-2.5 w-full max-w-[480px] group group-focus-within:border-white">
          <SearchIcon size={22} className="text-melody-text group-hover:text-white group-focus-within:text-white transition-colors mr-3 shrink-0" />
          <input 
            type="text" 
            placeholder="What do you want to play?" 
            className="bg-transparent text-white focus:outline-none w-full placeholder:text-melody-text font-medium text-sm"
            onFocus={() => navigate('/search')}
          />
          <div className="border-l border-[#444] pl-3 ml-2 items-center cursor-pointer hover:scale-105 transition-transform shrink-0">
            <Disc3 size={20} className="text-melody-text hover:text-white transition-colors" />
          </div>
        </div>
      </div>

      {/* Right: Auth & Links */}
      <div className="flex items-center gap-4 w-1/4 justify-end min-w-fit pr-2">
        {user ? (
          <>
            <button className="hidden lg:block bg-white text-black font-bold text-sm px-3.5 py-1.5 rounded-full hover:scale-105 transition-all whitespace-nowrap">
              Explore Premium
            </button>
            <button className="hidden xl:flex items-center gap-1.5 text-melody-text hover:text-white font-bold text-[13px] hover:scale-105 transition-all">
              <Download size={16} />
              Install App
            </button>
            <button className="hidden sm:block text-melody-text hover:text-white hover:scale-105 transition-transform">
              <Bell size={18} />
            </button>
            <button className="hidden sm:block text-melody-text hover:text-white hover:scale-105 transition-transform">
              <Users size={18} />
            </button>
            <div 
              className="w-9 h-9 bg-[#242424] hover:bg-[#2a2a2a] rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform border-[3px] border-black ml-1"
              onClick={logout}
              title="Log out"
            >
              <div className="w-[26px] h-[26px] rounded-full bg-[#008f51] flex items-center justify-center text-[12px] font-bold text-white">
                M
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/signup" className="text-melody-text hover:text-white font-bold text-[15px] hover:scale-105 transition-all">
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
