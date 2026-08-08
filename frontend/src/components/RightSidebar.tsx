import { usePlayer } from '../context/PlayerContext';

export const RightSidebar = () => {
  const { isRightSidebarOpen, isLyricsOpen, currentSong } = usePlayer();

  if (!isRightSidebarOpen) return null;

  return (
    <aside className="w-[340px] bg-[#121212] rounded-lg m-2 ml-0 p-4 flex flex-col text-white overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-bold">
          {currentSong ? currentSong.album : "Now Playing"}
        </h2>
        <div className="flex gap-4 text-melody-text">
          <button className="hover:text-white hover:scale-105 transition-all">
            <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current"><path d="M2.47 2.47a.75.75 0 011.06 0L8 6.94l4.47-4.47a.75.75 0 111.06 1.06L9.06 8l4.47 4.47a.75.75 0 11-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 01-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 010-1.06z"/></svg>
          </button>
        </div>
      </div>

      {currentSong ? (
        <>
          {/* Artwork */}
          <div className="w-full aspect-square bg-neutral-800 rounded-lg mb-4 overflow-hidden">
            <img src={currentSong.coverUrl} alt="Album Cover" className="w-full h-full object-cover" />
          </div>

          {/* Song Info */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold hover:underline cursor-pointer">{currentSong.title}</h3>
              <p className="text-melody-text hover:underline cursor-pointer text-base">{currentSong.artist}</p>
            </div>
            <button className="text-melody-red hover:scale-105 transition-all mt-1">
              <svg viewBox="0 0 16 16" className="w-5 h-5 fill-current"><path d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-1.15-1.464l-.004-.01L.69 8.31a4.542 4.542 0 01-1.01-3.84A4.618 4.618 0 011.69 2z"/></svg>
            </button>
          </div>

          {/* Lyrics View */}
          {isLyricsOpen && (
            <div className="bg-[#242424] p-4 rounded-xl flex-1 mt-2">
              <h4 className="font-bold mb-4 text-sm tracking-wide">Lyrics</h4>
              <div className="space-y-6">
                {currentSong.lyrics.map((line, idx) => (
                  <p key={idx} className="text-lg font-bold text-white/80 leading-tight">
                    {line.text}
                  </p>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-melody-text">
          <p className="font-medium">Play a song to view lyrics</p>
        </div>
      )}
    </aside>
  );
};
