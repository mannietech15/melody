import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Player = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <footer className="h-20 bg-[#181818] border-t border-[#282828] px-6 py-2 flex items-center justify-between z-50">
        <div className="flex flex-col justify-center">
          <span className="text-[14px] font-bold text-white hover:underline cursor-pointer">Song Name</span>
          <span className="text-[12px] font-medium text-melody-text hover:underline cursor-pointer">Artist</span>
        </div>
        {/* Placeholder for actual player controls */}
        <div className="text-melody-text font-medium text-sm">
          Player Controls
        </div>
        <div className="w-1/4"></div>
      </footer>
    );
  }

  return (
    <Link to="/signup" className="block">
      <footer className="h-20 bg-gradient-to-r from-[#af2896] to-[#509bf5] px-6 py-2 flex items-center justify-between z-50 cursor-pointer">
        <div className="flex flex-col justify-center">
          <span className="text-[13px] font-bold text-white uppercase tracking-wider mb-1">Preview of Melody</span>
          <span className="text-[15px] font-medium text-white">Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</span>
        </div>

        <button className="bg-white text-black font-bold text-[15px] px-8 py-3 rounded-full hover:scale-105 hover:bg-gray-100 transition-transform whitespace-nowrap">
          Sign up free
        </button>
      </footer>
    </Link>
  );
};
