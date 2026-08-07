import React from 'react';

export const Player = () => {
  return (
    <footer className="h-[90px] bg-black border-t border-[#282828] px-4 flex items-center justify-between z-50">
      {/* Track Info */}
      <div className="w-[30%] min-w-[180px]">
        Track Info Placeholder
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center max-w-[722px] w-[40%]">
        Controls Placeholder
      </div>

      {/* Right Controls / Volume */}
      <div className="w-[30%] min-w-[180px] flex justify-end">
        Volume Placeholder
      </div>
    </footer>
  );
};
