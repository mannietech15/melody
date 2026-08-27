import { usePlayer } from '../context/PlayerContext';
import { useAuth } from '../context/AuthContext';
import { Footer } from './Footer';
import { Section } from './Section';

export const Home = () => {
  const { playSong, currentSong, isPlaying, togglePlayPause, songs } = usePlayer();
  const { user } = useAuth();
  const items = [1, 2, 3, 4, 5, 6, 7, 8];

  const handlePlay = (songId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const song = songs.find(s => s.id === songId);
    if (song) {
      if (currentSong?.id === song.id) {
        togglePlayPause();
      } else {
        playSong(song);
      }
    }
  };

  return (
    <div className={`flex flex-col gap-8 pb-20 mt-4 relative z-10 ${!user ? 'px-4' : ''}`}>
      
      {!user ? (
        <>
          <Section title="Trending songs" />
          <Section title="Popular artists" isCircular />
          <Section title="Popular albums and singles" />
          <Section title="Popular radio" />
          <Section title="Featured Charts" />
          
          {/* Footer */}
          <Footer />
        </>
      ) : (
        <>
          {/* Filter Chips */}
          <div className="flex gap-2">
            <button className="bg-white text-black font-medium text-sm px-4 py-1.5 rounded-full hover:scale-105 transition-transform">
              All
            </button>
            <button className="bg-[#242424] hover:bg-[#2a2a2a] text-white font-medium text-sm px-4 py-1.5 rounded-full transition-colors">
              Music
            </button>
            <button className="bg-[#242424] hover:bg-[#2a2a2a] text-white font-medium text-sm px-4 py-1.5 rounded-full transition-colors">
              Podcasts
            </button>
          </div>

          {/* Recently Played Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {songs.map((song) => {
              const isThisPlaying = currentSong?.id === song.id && isPlaying;
              return (
                <div 
                  key={song.id} 
                  className="group bg-white/5 hover:bg-white/20 transition-all rounded-md flex items-center cursor-pointer overflow-hidden h-16 relative"
                  onClick={() => playSong(song)}
                >
                  <img src={song.coverUrl} alt={song.title} className="w-16 h-16 shadow-[0_8px_24px_rgba(0,0,0,0.5)]" />
                  <div className="flex-1 font-bold text-white px-4 line-clamp-1">{song.title}</div>
                  <button 
                    className={`absolute right-4 h-12 w-12 bg-melody-red rounded-full flex items-center justify-center shadow-xl hover:scale-105 hover:bg-[#f40612] transition-all
                      ${isThisPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}
                    onClick={(e) => handlePlay(song.id, e)}
                  >
                    {isThisPlaying ? (
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                    )}
                  </button>
                </div>
              );
            })}
            {/* Fill the rest of the grid with placeholders */}
            {items.slice(0, 4).map(item => (
              <div key={`placeholder-${item}`} className="group bg-white/5 hover:bg-white/20 transition-all rounded-md flex items-center cursor-pointer overflow-hidden h-16 relative">
                <img src={`https://picsum.photos/seed/recent${item}/64/64`} alt="Playlist" className="w-16 h-16 shadow-[0_8px_24px_rgba(0,0,0,0.5)]" />
                <div className="flex-1 font-bold text-white px-4 line-clamp-1">Playlist {item}</div>
              </div>
            ))}
          </div>

          {/* Getting started */}
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-bold text-white hover:underline cursor-pointer tracking-tight">
                Getting started
              </h2>
              <span className="text-sm font-bold text-melody-text hover:underline cursor-pointer">Show all</span>
            </div>
            <div className="flex gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex-none w-[340px] bg-gradient-to-br from-[#0e7490] to-[#083344] p-6 rounded-lg relative overflow-hidden group cursor-pointer">
                <div className="relative z-10 flex flex-col justify-between h-[180px]">
                  <div>
                    <h3 className="text-[40px] font-black text-white leading-tight mb-2 tracking-tighter">3. Watch a video</h3>
                    <p className="text-white/80 font-medium">Play videos from your favorite artists and creators.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="bg-melody-red text-black font-bold text-sm px-4 py-2 rounded-full hover:scale-105 transition-transform">Browse videos</button>
                    <button className="text-white font-bold text-sm hover:underline">Show more tips</button>
                  </div>
                </div>
              </div>
              
              <div className="flex-none w-[340px] bg-gradient-to-br from-[#5b21b6] to-[#2e1065] p-6 rounded-lg relative overflow-hidden group cursor-pointer">
                <div className="relative z-10 flex flex-col justify-between h-[180px]">
                  <div>
                    <h3 className="text-[40px] font-black text-white leading-tight mb-2 tracking-tighter">Follow friends</h3>
                    <p className="text-white/80 font-medium">See what they're listening to in the Friend Activity tab.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="bg-melody-red text-black font-bold text-sm px-4 py-2 rounded-full hover:scale-105 transition-transform">Find friends</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pre-save upcoming releases */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-bold text-white hover:underline cursor-pointer tracking-tight">
                Pre-save upcoming releases
              </h2>
              <span className="text-sm font-bold text-melody-text hover:underline cursor-pointer">Show all</span>
            </div>
            <div className="flex gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {items.map((item) => (
                <div key={item} className="flex-none w-[160px] xl:w-[180px] bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-all cursor-pointer group relative">
                  <div className="relative mb-4">
                    <img 
                      src={`https://picsum.photos/seed/presave${item}/200/200`} 
                      alt="Cover" 
                      className="w-full aspect-square object-cover rounded-md shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                  <h3 className="font-bold text-white mb-1 truncate text-[15px]">Release {item}</h3>
                  <p className="text-sm text-melody-text line-clamp-2">Artist Name</p>
                </div>
              ))}
            </div>
          </div>

          {/* Made For User */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-bold text-white hover:underline cursor-pointer tracking-tight">
                Made For you
              </h2>
              <span className="text-sm font-bold text-melody-text hover:underline cursor-pointer">Show all</span>
            </div>
            <div className="flex gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {items.map((item) => (
                <div key={item} className="flex-none w-[160px] xl:w-[180px] bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-all cursor-pointer group relative">
                  <div className="relative mb-4">
                    <img 
                      src={`https://picsum.photos/seed/mix${item}/200/200`} 
                      alt="Cover" 
                      className="w-full aspect-square object-cover rounded-md shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
                    />
                    <button className="absolute right-2 bottom-2 translate-y-2 h-12 w-12 bg-melody-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 hover:bg-[#f40612]">
                      <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" fill="black">
                        <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path>
                      </svg>
                    </button>
                  </div>
                  <h3 className="font-bold text-white mb-1 truncate text-[15px]">Daily Mix {item}</h3>
                  <p className="text-sm text-melody-text line-clamp-2">Mix of artists {item}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

    </div>
  );
};
// update 0
// update 1
// update 2
// update 3
// update 4
// update 5
// update 6
// update 7
// update 8
// update 9
