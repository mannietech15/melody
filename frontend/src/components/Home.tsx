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

  const topGridItems = [
    { title: 'Liked Songs', image: 'https://picsum.photos/seed/liked/64', isLiked: true },
    { title: 'Forrest Frank', image: 'https://picsum.photos/seed/forrest/64' },
    { title: 'Sad times', image: 'https://picsum.photos/seed/sad/64' },
    { title: 'Human Being Not Human Race', image: 'https://picsum.photos/seed/human/64' },
    { title: 'Curtain Call: The Hits (Deluxe Edition)', image: 'https://picsum.photos/seed/curtain/64' },
    { title: 'Mansion', image: 'https://picsum.photos/seed/mansion/64' },
    { title: 'Meta Agrees to Change Its Ways, But...', image: 'https://picsum.photos/seed/meta/64', hasDot: true },
    { title: 'Frozen - Let It Go', image: 'https://picsum.photos/seed/frozen/64' },
  ];

  return (
    <div className={`flex flex-col gap-8 pb-20 relative z-10 min-h-full ${!user ? 'px-4 mt-4' : 'px-6 pt-16 bg-gradient-to-b from-[#2e0964] via-[#121212] to-[#121212] bg-[length:100%_300px] bg-no-repeat'}`}>
      
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
          {/* Filter Chips - Positioned Absolute or sticky at the very top */}
          <div className="absolute top-4 left-6 flex gap-2 z-20">
            <button className="bg-white text-black font-medium text-sm px-4 py-1.5 rounded-full hover:scale-105 transition-transform">
              All
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white font-medium text-sm px-4 py-1.5 rounded-full transition-colors">
              Music
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white font-medium text-sm px-4 py-1.5 rounded-full transition-colors">
              Podcasts
            </button>
          </div>

          {/* Recently Played Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {topGridItems.map((item, index) => {
              // using mock song matching for playability if needed, or just standard play button
              const mockSongId = (index + 1).toString();
              const isThisPlaying = currentSong?.id === mockSongId && isPlaying;
              return (
                <div 
                  key={index} 
                  className="group bg-white/10 hover:bg-white/20 transition-all rounded-md flex items-center cursor-pointer overflow-hidden h-16 relative"
                >
                  {item.isLiked ? (
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shrink-0 shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
                      <svg viewBox="0 0 16 16" className="w-6 h-6 fill-white"><path d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-1.15-1.464l-.004-.01L.69 8.31a4.542 4.542 0 01-1.01-3.84A4.618 4.618 0 011.69 2z"/></svg>
                    </div>
                  ) : (
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover shadow-[0_8px_24px_rgba(0,0,0,0.5)] shrink-0" />
                  )}
                  
                  <div className="flex-1 font-bold text-white px-4 text-[15px] leading-tight line-clamp-2 pr-14 relative flex items-center">
                    {item.title}
                    {item.hasDot && (
                      <div className="w-2 h-2 bg-[#3d91f4] rounded-full absolute right-6"></div>
                    )}
                  </div>
                  
                  <button 
                    className={`absolute right-3 h-11 w-11 bg-melody-red rounded-full flex items-center justify-center shadow-xl hover:scale-105 hover:bg-[#f40612] transition-all
                      ${isThisPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    onClick={(e) => handlePlay(mockSongId, e)}
                  >
                    {isThisPlaying ? (
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black ml-1"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Getting started */}
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-[24px] font-bold text-white hover:underline cursor-pointer tracking-tight">
                Getting started
              </h2>
            </div>
            
            {/* The Getting started container has a left right arrows and a specific video UI in the screenshot */}
            <div className="flex gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative">
              <div className="flex-none w-full max-w-[500px] h-[220px] bg-gradient-to-br from-[#0e7490] to-[#083344] rounded-lg relative overflow-hidden group cursor-pointer flex">
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="text-[32px] font-black text-white leading-tight mb-2 tracking-tighter">3. Watch a video</h3>
                  <p className="text-white/80 font-medium text-sm mb-6 max-w-[200px]">Play videos from your favorite artists and creators.</p>
                  <div className="flex items-center gap-4">
                    <button className="bg-[#1ed760] text-black font-bold text-[13px] px-4 py-2 rounded-full hover:scale-105 transition-transform">Browse videos</button>
                    <button className="text-white font-bold text-[13px] hover:underline">Show more tips</button>
                  </div>
                </div>
                <div className="w-[180px] h-full bg-[#083344] flex items-center justify-center shrink-0 border-l border-white/10 relative">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform">
                      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-black ml-1"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                    </div>
                </div>
              </div>
              
              {/* Other sections visible in screenshot right next to getting started */}
              <div className="flex-1 min-w-[400px]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[24px] font-bold text-white hover:underline cursor-pointer tracking-tight">
                    Pre-save upcoming releases
                  </h2>
                  <span className="text-sm font-bold text-melody-text hover:underline cursor-pointer">Show all</span>
                </div>
                <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {[
                    { title: 'Damascus Road', subtitle: 'Josiah Queen', seed: 'damascus' },
                    { title: 'Christmas in the City', subtitle: 'Pentatonix', seed: 'christmas' },
                    { title: 'WILDCHILD', subtitle: 'Alex Warren', seed: 'wildchild' },
                    { title: 'The Fall', subtitle: 'Bryce Vine', seed: 'fall' },
                    { title: 'New Heights', subtitle: 'Jason Derulo', seed: 'heights' },
                    { title: 'Lost Boy', subtitle: 'Ruth B.', seed: 'lost' },
                    { title: 'Home', subtitle: 'Michael Bublé', seed: 'home' },
                    { title: 'Yellow', subtitle: 'Coldplay', seed: 'yellow' },
                  ].map((item, i) => (
                    <div key={i} className="flex-none w-[160px] bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-all cursor-pointer group">
                      <div className="relative mb-4">
                        <img src={`https://picsum.photos/seed/${item.seed}/200`} alt={item.title} className="w-full aspect-square object-cover rounded-md shadow-lg" />
                        <button className="absolute right-2 bottom-2 translate-y-2 h-12 w-12 bg-melody-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 hover:bg-[#f40612]">
                          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black ml-1"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                        </button>
                      </div>
                      <h3 className="font-bold text-white mb-1 truncate text-[15px]">{item.title}</h3>
                      <p className="text-sm text-melody-text truncate">{item.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Episodes you might like */}
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[24px] font-bold text-white hover:underline cursor-pointer tracking-tight">
                Episodes you might like
              </h2>
              <span className="text-sm font-bold text-melody-text hover:underline cursor-pointer">Show all</span>
            </div>
            <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {['Bloomberg Tech', 'Dolby ATMOS', 'FT News', '5', 'The Mindset', 'The Pragmatic Engineer', 'Tech News Briefing', 'Planet Money'].map((item, i) => (
                <div key={i} className="flex-none w-[180px] bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-all cursor-pointer group relative">
                  <div className="relative mb-4">
                    <img 
                      src={`https://picsum.photos/seed/podcast${i}/200`} 
                      alt="Cover" 
                      className="w-full aspect-square object-cover rounded-xl shadow-lg"
                    />
                    <button className="absolute right-2 bottom-2 translate-y-2 h-12 w-12 bg-melody-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 hover:bg-[#f40612]">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black ml-1"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                    </button>
                  </div>
                  <h3 className="font-bold text-white mb-1 truncate text-[15px]">{item}</h3>
                  <p className="text-sm text-melody-text line-clamp-2">Podcast subtitle...</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="h-10"></div>
          
        </>
      )}

    </div>
  );
};
