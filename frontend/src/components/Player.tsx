import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePlayer } from '../context/PlayerContext';

export const Player = () => {
  const { user } = useAuth();
  const { 
    currentSong, isPlaying, progress, duration, volume, 
    togglePlayPause, seek, setVolume, toggleRightSidebar, toggleLyrics,
    playNext, playPrev, isRightSidebarOpen, isLyricsOpen
  } = usePlayer();

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  if (user) {
    return (
      <footer className="h-[90px] bg-black border-t border-[#282828] px-4 flex items-center justify-between z-50">
        {/* Left: Song Info */}
        <div className="flex items-center w-[30%] min-w-[180px]">
          {currentSong ? (
            <>
              <div className="w-14 h-14 bg-[#282828] rounded flex-shrink-0 relative group">
                <img src={currentSong.coverUrl} alt="Cover" className="w-full h-full object-cover rounded" />
                <button className="absolute top-1 right-1 w-6 h-6 bg-black/70 rounded-full items-center justify-center hidden group-hover:flex">
                  <svg viewBox="0 0 16 16" className="w-4 h-4 fill-white"><path d="M2.47 2.47a.75.75 0 011.06 0L8 6.94l4.47-4.47a.75.75 0 111.06 1.06L9.06 8l4.47 4.47a.75.75 0 11-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 01-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 010-1.06z"/></svg>
                </button>
              </div>
              <div className="ml-3 flex flex-col justify-center max-w-[200px]">
                <span className="text-sm font-bold text-white hover:underline cursor-pointer truncate">{currentSong.title}</span>
                <span className="text-[11px] text-melody-text hover:underline cursor-pointer truncate">{currentSong.artist}</span>
              </div>
              <button className="ml-4 text-melody-red hover:scale-105 transition-transform shrink-0">
                <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current"><path d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-1.15-1.464l-.004-.01L.69 8.31a4.542 4.542 0 01-1.01-3.84A4.618 4.618 0 011.69 2z"/></svg>
              </button>
            </>
          ) : (
            <div className="w-14 h-14 bg-[#282828] rounded"></div>
          )}
        </div>

        {/* Center: Controls */}
        <div className="flex flex-col items-center justify-center max-w-[40%] flex-1">
          <div className="flex items-center gap-6 mb-2">
            <button className="text-melody-text hover:text-white transition-colors disabled:opacity-50">
              <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current"><path d="M13.151.922a.75.75 0 10-1.06 1.06L13.109 3H11.16a3.75 3.75 0 00-2.873 1.34l-6.173 7.356A2.25 2.25 0 01.39 12.5H0V14h.391a3.75 3.75 0 002.873-1.34l6.173-7.356a2.25 2.25 0 011.724-.804h1.947l-1.017 1.018a.75.75 0 001.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.59 2.765 1.5l2.457 3.684-1.246 1.485L2.124 5.385A2.25 2.25 0 00.39 3.5zM15.98 12.25L13.151 15.078a.75.75 0 11-1.06-1.06l1.018-1.018H11.16a2.25 2.25 0 01-1.724-.804L8.19 10.712l1.246-1.485 1.245 1.485a3.75 3.75 0 002.873 1.34h1.947l-1.017-1.018a.75.75 0 111.06-1.06l2.83 2.828z"/></svg>
            </button>
            <button className="text-melody-text hover:text-white transition-colors" onClick={playPrev}>
              <svg viewBox="0 0 16 16" className="w-5 h-5 fill-current"><path d="M3.3 1a.7.7 0 01.7.7v5.15l9.95-5.744a.7.7 0 011.05.606v12.575a.7.7 0 01-1.05.607L4 9.149V14.3a.7.7 0 01-1.4 0V1.7a.7.7 0 01.7-.7z"/></svg>
            </button>
            <button 
              className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current"><path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"/></svg>
              ) : (
                <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current ml-1"><path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"/></svg>
              )}
            </button>
            <button className="text-melody-text hover:text-white transition-colors" onClick={playNext}>
              <svg viewBox="0 0 16 16" className="w-5 h-5 fill-current"><path d="M12.7 1a.7.7 0 00-.7.7v5.15L2.05 1.106A.7.7 0 001 1.712v12.575a.7.7 0 001.05.607L12 9.149V14.3a.7.7 0 001.4 0V1.7a.7.7 0 00-.7-.7z"/></svg>
            </button>
            <button className="text-melody-text hover:text-white transition-colors disabled:opacity-50">
              <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current"><path d="M0 4.75A3.75 3.75 0 013.75 1h8.5A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l3.118 3.118a.75.75 0 11-1.06 1.06L8 13.84l-3.868 3.837a.75.75 0 11-1.06-1.06l3.118-3.118H3.75A3.75 3.75 0 010 9.75v-5zM3.75 2.5a2.25 2.25 0 00-2.25 2.25v5a2.25 2.25 0 002.25 2.25h8.5a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25h-8.5z"/></svg>
            </button>
          </div>
          <div className="flex items-center w-full gap-2 max-w-[500px]">
            <span className="text-[11px] text-melody-text w-10 text-right">{formatTime(progress)}</span>
            <input 
              type="range" 
              min="0" 
              max={duration || 100} 
              value={progress} 
              onChange={handleSeek}
              className="flex-1 h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:bg-melody-red [&::-moz-range-thumb]:bg-white hover:[&::-moz-range-thumb]:bg-melody-red [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3"
            />
            <span className="text-[11px] text-melody-text w-10">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end w-[30%] min-w-[180px] gap-3">
          <button 
            className={`${isRightSidebarOpen && !isLyricsOpen ? 'text-melody-red' : 'text-melody-text'} hover:text-white transition-colors`}
            onClick={toggleRightSidebar}
          >
            <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current"><path d="M11.196 8l-4.47 4.47a.75.75 0 01-1.06-1.06l3.41-3.41-3.41-3.41a.75.75 0 111.06-1.06L11.196 8z"/></svg>
          </button>
          <button 
            className={`${isLyricsOpen ? 'text-melody-red' : 'text-melody-text'} hover:text-white transition-colors`}
            onClick={toggleLyrics}
          >
            <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current"><path d="M13.426 2.574a2.868 2.868 0 00-4.057 0l-7.46 7.46a2.851 2.851 0 00-.775 1.341l-1.085 4.34a.75.75 0 00.911.91l4.34-1.084a2.854 2.854 0 001.34-.775l7.46-7.461a2.868 2.868 0 000-4.057l-6.74 6.74a.75.75 0 101.06 1.06l6.741-6.741zm-2.996 1.06l6.74-6.74a1.368 1.368 0 011.936 1.935l-6.74 6.74a.75.75 0 001.06 1.06l6.74-6.74c.937-.937.937-2.457 0-3.394a2.4 2.4 0 00-3.394 0l-6.74 6.74a.75.75 0 001.06 1.06z"/></svg>
          </button>
          <button className="text-melody-text hover:text-white transition-colors">
            <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current"><path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 013.5 1h9a2.5 2.5 0 010 5h-9A2.5 2.5 0 011 3.5zm2.5-1a1 1 0 000 2h9a1 1 0 100-2h-9z"/></svg>
          </button>
          <div className="flex items-center gap-2 group w-24">
            <button className="text-melody-text hover:text-white transition-colors shrink-0">
              <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current"><path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 00-1.042 1.85 2.14 2.14 0 001.042 1.851l5.425 3.133V2.017L2.817 6.15zM13.5 12.5a.75.75 0 01-1.5 0V3.5a.75.75 0 111.5 0v9z"/></svg>
            </button>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume} 
              onChange={handleVolume}
              className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:bg-melody-red [&::-moz-range-thumb]:bg-white hover:[&::-moz-range-thumb]:bg-melody-red [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 hidden group-hover:block"
            />
            <div className="w-full h-1 bg-white rounded-full group-hover:hidden"></div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <Link to="/signup" className="block relative z-50">
      <footer className="h-[72px] bg-gradient-to-r from-[#af2896] to-[#509bf5] px-4 py-2 flex items-center justify-between cursor-pointer">
        <div className="flex flex-col justify-center">
          <span className="text-[13px] font-bold text-white uppercase tracking-wider mb-0.5">Preview of Melody</span>
          <span className="text-[15px] font-medium text-white tracking-wide">Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</span>
        </div>

        <button className="bg-white text-black font-bold text-[15px] px-8 py-3 rounded-full hover:scale-105 hover:bg-gray-100 transition-transform whitespace-nowrap">
          Sign up free
        </button>
      </footer>
    </Link>
  );
};
