import { usePlayer } from '../context/PlayerContext';
import { Play } from 'lucide-react';

export const Search = () => {
  const { playSong, currentSong, isPlaying, togglePlayPause, songs } = usePlayer();
  const categories = [
    { title: 'Podcasts', color: 'bg-[#27856A]' },
    { title: 'Live Events', color: 'bg-[#8400E7]' },
    { title: 'Made For You', color: 'bg-[#1E3264]' },
    { title: 'New Releases', color: 'bg-[#E8115B]' },
    { title: 'Pop', color: 'bg-[#148A08]' },
    { title: 'Hip-Hop', color: 'bg-[#BC5900]' },
    { title: 'Dance/Electronic', color: 'bg-[#D84000]' },
    { title: 'Rock', color: 'bg-[#E91429]' },
    { title: 'Indie', color: 'bg-[#E1118C]' },
    { title: 'Discover', color: 'bg-[#8D67AB]' },
    { title: 'R&B', color: 'bg-[#DC148C]' },
    { title: 'K-Pop', color: 'bg-[#148A08]' },
  ];

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
    <div className="flex flex-col gap-8 pb-20 mt-4 relative z-10">
      
      {/* Search Results (shows if there are songs fetched that might be filtered) */}
      <div className="flex flex-col gap-4">
        <h2 className="text-[22px] font-bold text-white tracking-tight">
          Browse all
        </h2>
        
        {/* We can show songs here if we wanted to build a real-time search result list */}
        {songs.length > 0 && (
           <div className="mb-8">
             <h3 className="text-xl font-bold text-white mb-4">Top Results</h3>
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {songs.map(song => (
                  <div 
                    key={song.id} 
                    className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-all cursor-pointer group relative"
                    onClick={() => playSong(song)}
                  >
                    <div className="relative mb-4">
                      <img 
                        src={song.coverUrl} 
                        alt={song.title} 
                        className="w-full aspect-square object-cover rounded-md shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
                      />
                      <button 
                        className={`absolute right-2 bottom-2 translate-y-2 h-12 w-12 bg-melody-red rounded-full flex items-center justify-center transition-all shadow-xl hover:scale-105 hover:bg-[#f40612]
                          ${currentSong?.id === song.id && isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 group-hover:opacity-100 group-hover:translate-y-0'}`}
                        onClick={(e) => handlePlay(song.id, e)}
                      >
                         {currentSong?.id === song.id && isPlaying ? (
                          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>
                        ) : (
                          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                        )}
                      </button>
                    </div>
                    <h3 className="font-bold text-white mb-1 truncate text-[15px]">{song.title}</h3>
                    <p className="text-sm text-melody-text line-clamp-1">{song.artist}</p>
                  </div>
                ))}
             </div>
           </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categories.map((cat, i) => (
            <div 
              key={i} 
              className={`${cat.color} rounded-lg p-4 h-[180px] relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform`}
            >
              <h3 className="font-bold text-white text-xl">{cat.title}</h3>
              {/* Fake rotating image for category card */}
              <div className="absolute -bottom-4 -right-4 w-[100px] h-[100px] bg-black/20 rotate-[25deg] rounded-md shadow-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
