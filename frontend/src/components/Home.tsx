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
          
          {/* Shows you might like */}
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[24px] font-bold text-white hover:underline cursor-pointer tracking-tight">
                Shows you might like
              </h2>
              <span className="text-sm font-bold text-melody-text hover:underline cursor-pointer">Show all</span>
            </div>
            <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {[
                { title: 'Bloomberg News Now', subtitle: 'Bloomberg', seed: 'news' },
                { title: 'Dolby Atmos', subtitle: 'NullPL', seed: 'dolby' },
                { title: 'FT News Briefing', subtitle: 'Financial Times', seed: 'ft' },
                { title: 'The Mindset Mentor', subtitle: 'Rob Dial', seed: 'mentor' },
                { title: 'The Pragmatic Engineer', subtitle: 'Gergely Orosz', seed: 'pragmatic' },
                { title: 'WSJ Tech News Briefing', subtitle: 'The Wall Street Journal', seed: 'wsj' },
              ].map((item, i) => (
                <div key={i} className="flex-none w-[180px] bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-all cursor-pointer group relative">
                  <div className="relative mb-4">
                    <img 
                      src={`https://picsum.photos/seed/${item.seed}/200`} 
                      alt="Cover" 
                      className="w-full aspect-square object-cover rounded-xl shadow-lg"
                    />
                    <button className="absolute right-2 bottom-2 translate-y-2 h-12 w-12 bg-melody-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 hover:bg-[#f40612]">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black ml-1"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                    </button>
                  </div>
                  <h3 className="font-bold text-white mb-1 truncate text-[15px]">{item.title}</h3>
                  <p className="text-sm text-melody-text line-clamp-2">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Stations */}
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] text-melody-text font-medium">Non-stop music based on your favorite songs and artists.</span>
              <div className="flex items-center justify-between">
                <h2 className="text-[24px] font-bold text-white hover:underline cursor-pointer tracking-tight">
                  Recommended Stations
                </h2>
                <span className="text-sm font-bold text-melody-text hover:underline cursor-pointer">Show all</span>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {[
                { title: 'maryjo', subtitle: 'With Sofia Camara, Gigi...', color: 'bg-[#f0e335]', seed: 'maryjo' },
                { title: 'HALLELUJAH', subtitle: 'With Forrest Frank...', color: 'bg-[#b685ff]', seed: 'halle' },
                { title: 'Anne Wilson', subtitle: 'With Micah Tyler...', color: 'bg-[#df7bff]', seed: 'anne' },
                { title: 'Lauren Daigle', subtitle: 'With Katy Nichole...', color: 'bg-[#ff5d8f]', seed: 'lauren' },
                { title: 'Samantha Ebert', subtitle: 'With Amanda Nolan...', color: 'bg-[#b0c4de]', seed: 'sam' },
                { title: 'Ruth B.', subtitle: 'With Alec Benjamin...', color: 'bg-[#93a8ff]', seed: 'ruth' },
                { title: 'Duncan Laurence', subtitle: 'With Alec Benjamin...', color: 'bg-[#40e0d0]', seed: 'duncan' },
              ].map((item, i) => (
                <div key={i} className="flex-none w-[180px] bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-all cursor-pointer group relative">
                  <div className={`relative mb-4 w-full aspect-square rounded-lg ${item.color} flex flex-col p-3 overflow-hidden shadow-lg`}>
                    <div className="flex justify-between items-start z-10 relative">
                      <img src="/logo.png" className="w-5 h-5 invert mix-blend-screen opacity-80" alt="logo" />
                      <span className="text-black font-black text-[11px] tracking-widest">RADIO</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img src={`https://picsum.photos/seed/${item.seed}/150`} className="w-[85%] h-[85%] rounded-full object-cover shadow-2xl" alt="artist" />
                    </div>
                    <div className="mt-auto z-10 relative">
                      <h3 className="font-black text-black text-xl leading-tight truncate">{item.title}</h3>
                    </div>
                    <button className="absolute right-2 bottom-2 translate-y-2 h-12 w-12 bg-melody-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 hover:bg-[#f40612] z-20">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black ml-1"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                    </button>
                  </div>
                  <p className="text-sm text-melody-text line-clamp-2 mt-2">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Albums featuring songs you like */}
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[24px] font-bold text-white hover:underline cursor-pointer tracking-tight">
                Albums featuring songs you like
              </h2>
              <span className="text-sm font-bold text-melody-text hover:underline cursor-pointer">Show all</span>
            </div>
            <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {[
                { title: 'CHILD OF GOD II', subtitle: 'Forrest Frank', seed: 'child2' },
                { title: 'CHILD OF GOD', subtitle: 'Forrest Frank', seed: 'child1' },
                { title: 'The Waiting', subtitle: 'Samantha Ebert', seed: 'waiting' },
                { title: 'CRY', subtitle: 'Hulvey', seed: 'cry' },
                { title: 'Mansion', subtitle: 'NF', seed: 'mansion2' },
                { title: 'Curtain Call', subtitle: 'Eminem', seed: 'curtain2' },
              ].map((item, i) => (
                <div key={i} className="flex-none w-[180px] bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-all cursor-pointer group relative">
                  <div className="relative mb-4">
                    <img src={`https://picsum.photos/seed/${item.seed}/200`} alt="Cover" className="w-full aspect-square object-cover rounded-md shadow-lg" />
                    <button className="absolute right-2 bottom-2 translate-y-2 h-12 w-12 bg-melody-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 hover:bg-[#f40612]">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black ml-1"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                    </button>
                  </div>
                  <h3 className="font-bold text-white mb-1 truncate text-[15px]">{item.title}</h3>
                  <p className="text-sm text-melody-text line-clamp-1">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Your playlists */}
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[24px] font-bold text-white hover:underline cursor-pointer tracking-tight">
                Your playlists
              </h2>
              <span className="text-sm font-bold text-melody-text hover:underline cursor-pointer">Show all</span>
            </div>
            <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {[
                { title: 'Dusty Bibles', subtitle: 'By mannie tech', seed: 'dusty1' },
                { title: 'MannieTech', subtitle: 'my store for songs', seed: 'mannie' },
                { title: 'My Playlist #4', subtitle: 'By mannie tech', seed: 'play4' },
                { title: 'Overwhelmed (Ryan Mack)', subtitle: 'By mannie tech', seed: 'overwhelmed2' },
                { title: 'Eternity', subtitle: 'By mannie tech', seed: 'eternity' },
                { title: 'Dusty Bibles', subtitle: 'By mannie tech', seed: 'dusty2' },
              ].map((item, i) => (
                <div key={i} className="flex-none w-[180px] bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-all cursor-pointer group relative">
                  <div className="relative mb-4">
                    <img src={`https://picsum.photos/seed/${item.seed}/200`} alt="Cover" className="w-full aspect-square object-cover rounded-md shadow-lg" />
                    <button className="absolute right-2 bottom-2 translate-y-2 h-12 w-12 bg-melody-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 hover:bg-[#f40612]">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black ml-1"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                    </button>
                  </div>
                  <h3 className="font-bold text-white mb-1 truncate text-[15px]">{item.title}</h3>
                  <p className="text-sm text-melody-text line-clamp-1">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* More like Forrest Frank */}
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="https://picsum.photos/seed/forrest/50" className="w-12 h-12 rounded-full" alt="Forrest Frank" />
                <div className="flex flex-col">
                  <span className="text-[13px] text-melody-text font-medium">More like</span>
                  <h2 className="text-[24px] font-bold text-white hover:underline cursor-pointer tracking-tight leading-tight">
                    Forrest Frank
                  </h2>
                </div>
              </div>
              <span className="text-sm font-bold text-melody-text hover:underline cursor-pointer">Show all</span>
            </div>
            <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              
              {/* Radio Card */}
              <div className="flex-none w-[180px] bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-all cursor-pointer group relative">
                <div className="relative mb-4 w-full aspect-square rounded-lg bg-[#f6aa80] flex flex-col p-3 overflow-hidden shadow-lg">
                  <div className="flex justify-between items-start z-10 relative">
                    <img src="/logo.png" className="w-5 h-5 invert mix-blend-screen opacity-80" alt="logo" />
                    <span className="text-black font-black text-[11px] tracking-widest">RADIO</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src="https://picsum.photos/seed/forrest/150" className="w-[85%] h-[85%] rounded-full object-cover shadow-2xl" alt="artist" />
                  </div>
                  <div className="mt-auto z-10 relative">
                    <h3 className="font-black text-black text-xl leading-tight truncate">Forrest Frank</h3>
                  </div>
                  <button className="absolute right-2 bottom-2 translate-y-2 h-12 w-12 bg-melody-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 hover:bg-[#f40612] z-20">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black ml-1"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                  </button>
                </div>
                <p className="text-sm text-melody-text line-clamp-2 mt-2">With Josiah Queen, LOST & FOUND...</p>
              </div>

              {/* Square Playlists */}
              {[
                { title: 'Christian Hits', subtitle: 'Recent hits from your favorite...', seed: 'christhits' },
                { title: 'Worship Hits', subtitle: 'All of your recent Worship hits...', seed: 'worshiphits' },
                { title: 'Praise and Worship', subtitle: 'Praise and Worship the Almighty...', seed: 'praise' },
              ].map((item, i) => (
                <div key={i} className="flex-none w-[180px] bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-all cursor-pointer group relative">
                  <div className="relative mb-4">
                    <img src={`https://picsum.photos/seed/${item.seed}/200`} alt="Cover" className="w-full aspect-square object-cover rounded-md shadow-lg" />
                    <button className="absolute right-2 bottom-2 translate-y-2 h-12 w-12 bg-melody-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 hover:bg-[#f40612]">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black ml-1"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                    </button>
                  </div>
                  <h3 className="font-bold text-white mb-1 truncate text-[15px]">{item.title}</h3>
                  <p className="text-sm text-melody-text line-clamp-2">{item.subtitle}</p>
                </div>
              ))}

              {/* Circular Artists */}
              {[
                { title: 'The Figs', subtitle: 'Artist', seed: 'figs' },
                { title: 'Taylor Hill', subtitle: 'Artist', seed: 'taylor' },
                { title: 'Josiah Queen', subtitle: 'Artist', seed: 'josiah' },
                { title: 'glo.', subtitle: 'Artist', seed: 'glo' },
              ].map((item, i) => (
                <div key={i} className="flex-none w-[180px] bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-all cursor-pointer group relative flex flex-col items-center text-center">
                  <div className="relative mb-4 w-full">
                    <img src={`https://picsum.photos/seed/${item.seed}/200`} alt="Cover" className="w-full aspect-square object-cover rounded-full shadow-lg" />
                    <button className="absolute right-2 bottom-2 translate-y-2 h-12 w-12 bg-melody-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 hover:bg-[#f40612]">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black ml-1"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                    </button>
                  </div>
                  <h3 className="font-bold text-white mb-1 truncate text-[15px] w-full">{item.title}</h3>
                  <p className="text-sm text-melody-text line-clamp-1 w-full">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Large Cards Row 1 */}
          <div className="flex gap-6 mt-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex-none w-[360px] flex flex-col gap-3">
              <span className="text-[13px] text-melody-text font-medium hover:underline cursor-pointer">For fans of Forrest Frank</span>
              <div className="h-[280px] rounded-lg bg-gradient-to-br from-[#c8785e] to-[#2c1a14] p-5 relative overflow-hidden group cursor-pointer shadow-lg">
                <div className="flex gap-4 relative z-10">
                  <img src="https://picsum.photos/seed/forrestradio/100" className="w-20 h-20 shadow-xl rounded-md" alt="Forrest" />
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-bold bg-black/20 w-fit px-2 py-0.5 rounded-sm mb-1">RADIO</span>
                    <h3 className="text-white font-black text-2xl leading-tight">Forrest<br/>Frank Radio</h3>
                    <span className="text-white/80 text-sm mt-1">Playlist • Spotify</span>
                  </div>
                </div>
                <div className="absolute bottom-16 left-5 right-5 text-white/80 text-[13px] font-medium line-clamp-2 z-10">
                  With Josiah Queen, LOST & FOUND, Jordan Feliz and more
                </div>
                <div className="flex items-center justify-between z-10 absolute bottom-4 left-5 right-5">
                  <button className="bg-black/20 hover:bg-black/30 text-white font-bold text-[13px] px-4 py-1.5 rounded-full transition-colors flex items-center gap-2">
                     <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM9.5 15.5v-7l6 3.5-6 3.5z"></path></svg>
                     Preview
                  </button>
                  <div className="flex gap-4 items-center">
                    <div className="flex gap-2 text-white/80 font-bold items-center">
                        ••• <span className="border border-white/60 rounded-full w-5 h-5 flex items-center justify-center text-sm">+</span>
                    </div>
                    <button className="h-10 w-10 bg-white rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-xl">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black ml-1"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-none w-[360px] flex flex-col gap-3">
              <span className="text-[13px] text-melody-text font-medium hover:underline cursor-pointer">New episode from [0]</span>
              <div className="h-[280px] rounded-lg bg-[#0f713c] p-5 relative overflow-hidden group cursor-pointer shadow-lg flex flex-col justify-between">
                <div className="flex flex-col relative z-10">
                  <h3 className="text-white font-black text-[22px] leading-tight line-clamp-2 mb-1">Nvidia's Big Test as AI Chip Race Heats Up</h3>
                  <span className="text-white/80 text-sm font-medium">Episode • Bloomberg Tech</span>
                </div>
                <div className="flex justify-center my-2 relative z-10">
                  <div className="relative">
                    <img src="https://picsum.photos/seed/bloomberg/150" className="w-32 h-32 rounded-xl shadow-2xl" alt="Bloomberg" />
                    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black font-bold text-[13px] px-5 py-2.5 rounded-full whitespace-nowrap shadow-2xl hover:scale-105 transition-transform z-20">
                      Continue playing
                    </button>
                  </div>
                </div>
                <div className="text-white/80 text-[13px] font-medium line-clamp-2 z-10 mt-auto">
                  Aug 25 • 44 min 15 sec • Bloomberg's Ed Ludlow breaks down what to expect...
                </div>
              </div>
            </div>

            <div className="flex-none w-[360px] flex flex-col gap-3">
              <span className="text-[13px] text-melody-text font-medium hover:underline cursor-pointer">For fans of Josiah Queen</span>
              <div className="h-[280px] rounded-lg bg-gradient-to-br from-[#cbb15b] to-[#2c2612] p-5 relative overflow-hidden group cursor-pointer shadow-lg">
                <div className="flex gap-4 relative z-10">
                  <img src="https://picsum.photos/seed/josiahradio/100" className="w-20 h-20 shadow-xl rounded-md" alt="Josiah" />
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-bold bg-black/20 w-fit px-2 py-0.5 rounded-sm mb-1">RADIO</span>
                    <h3 className="text-white font-black text-2xl leading-tight">Josiah<br/>Queen Radio</h3>
                    <span className="text-white/80 text-sm mt-1">Playlist • Spotify</span>
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-white/80 text-sm font-medium line-clamp-2 z-10">
                  With I OST & FOUND, ELEVATION RHYTHM, Colton Dixon and more
                </div>
                <button className="absolute right-5 bottom-5 translate-y-4 h-12 w-12 bg-melody-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 hover:bg-[#f40612] z-20">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black ml-1"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Large Cards Row 2 */}
          <div className="flex gap-6 mt-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex-none w-[360px] flex flex-col gap-3">
              <span className="text-[13px] text-melody-text font-medium hover:underline cursor-pointer">More like Benson Boone</span>
              <div className="h-[280px] rounded-lg bg-gradient-to-br from-[#1b5e20] to-[#0d2e10] p-5 relative overflow-hidden group cursor-pointer shadow-lg">
                <div className="flex gap-4 relative z-10">
                  <img src="https://picsum.photos/seed/benson/100" className="w-20 h-20 shadow-xl rounded-md" alt="Benson" />
                  <div className="flex flex-col">
                    <h3 className="text-white font-black text-2xl leading-tight mt-1">You'll Be<br/>Alright, Kid</h3>
                    <span className="text-white/80 text-sm mt-1">Album • Alex Warren</span>
                  </div>
                </div>
                <button className="absolute right-5 bottom-5 translate-y-4 h-12 w-12 bg-melody-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 hover:bg-[#f40612] z-20">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black ml-1"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                </button>
              </div>
            </div>
            
            <div className="flex-none w-[360px] flex flex-col gap-3">
              <span className="text-[13px] text-melody-text font-medium hover:underline cursor-pointer">Made for you</span>
              <div className="h-[280px] rounded-lg bg-gradient-to-b from-[#2e7d32] to-[#121212] p-5 relative overflow-hidden group cursor-pointer shadow-lg">
                <div className="flex gap-4 relative z-10">
                  <img src="https://picsum.photos/seed/holdon/100" className="w-20 h-20 shadow-xl rounded-md" alt="Hold On" />
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-bold bg-black/20 w-fit px-2 py-0.5 rounded-sm mb-1">RADIO</span>
                    <h3 className="text-white font-black text-2xl leading-tight">Hold On Radio</h3>
                    <span className="text-white/80 text-sm mt-1">Playlist • Spotify</span>
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-white/80 text-sm font-medium line-clamp-2 z-10">
                  With Chord Overstreet, Jaymes Young, James Arthur and more
                </div>
                <button className="absolute right-5 bottom-5 translate-y-4 h-12 w-12 bg-melody-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 hover:bg-[#f40612] z-20">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black ml-1"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                </button>
              </div>
            </div>

            <div className="flex-none w-[360px] flex flex-col gap-3">
              <span className="text-[13px] text-melody-text font-medium hover:underline cursor-pointer">Episodes you might like</span>
              <div className="h-[280px] rounded-lg bg-[#911b0e] p-5 relative overflow-hidden group cursor-pointer shadow-lg flex flex-col justify-between">
                <div className="flex flex-col relative z-10">
                  <h3 className="text-white font-black text-[22px] leading-tight line-clamp-2 mb-1">The risks of investing $7tn in AI data centres</h3>
                  <span className="text-white/80 text-sm font-medium">Episode • FT News Briefing</span>
                </div>
                <div className="flex justify-center my-2 relative z-10">
                  <img src="https://picsum.photos/seed/ftnews/150" className="w-32 h-32 rounded-xl shadow-2xl" alt="FT News" />
                </div>
                <div className="text-white/80 text-[13px] font-medium line-clamp-2 z-10 mt-auto">
                  Aug 26 • 11 min 53 sec • Traders and analysts are warning oil prices could soon hit $100 a barrel...
                </div>
                <button className="absolute right-5 bottom-5 translate-y-4 h-12 w-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 z-20">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black ml-1"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Large Cards Row 3 */}
          <div className="flex gap-6 mt-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex-none w-[360px] flex flex-col gap-3">
              <span className="text-[13px] text-melody-text font-medium hover:underline cursor-pointer">For fans of Forrest Frank</span>
              <div className="h-[280px] rounded-lg bg-gradient-to-br from-[#8a1a3e] to-[#2c0512] p-5 relative overflow-hidden group cursor-pointer shadow-lg">
                <div className="flex gap-4 relative z-10">
                  <img src="https://picsum.photos/seed/topchristian/100" className="w-20 h-20 shadow-xl rounded-md" alt="Christian" />
                  <div className="flex flex-col">
                    <h3 className="text-white font-black text-2xl leading-tight mt-1">Top Christian<br/>& Gospel</h3>
                    <span className="text-white/80 text-sm mt-1">Playlist • Spotify</span>
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-white/80 text-sm font-medium line-clamp-2 z-10">
                  The best mix of today's Christian music, all genres, worldwide.
                </div>
                <button className="absolute right-5 bottom-5 translate-y-4 h-12 w-12 bg-melody-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 hover:bg-[#f40612] z-20">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black ml-1"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                </button>
              </div>
            </div>
            
            <div className="flex-none w-[360px] flex flex-col gap-3">
              <span className="text-[13px] text-melody-text font-medium hover:underline cursor-pointer">Made for you</span>
              <div className="h-[280px] rounded-lg bg-gradient-to-br from-[#b71c1c] to-[#4a0000] p-5 relative overflow-hidden group cursor-pointer shadow-lg">
                <div className="flex gap-4 relative z-10">
                  <img src="https://picsum.photos/seed/praises/100" className="w-20 h-20 shadow-xl rounded-md" alt="Praises" />
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-bold bg-black/20 w-fit px-2 py-0.5 rounded-sm mb-1">RADIO</span>
                    <h3 className="text-white font-black text-2xl leading-tight">PRAISES Radio</h3>
                    <span className="text-white/80 text-sm mt-1">Playlist • Spotify</span>
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-white/80 text-sm font-medium line-clamp-2 z-10">
                  With ELEVATION RHYTHM, Josiah Queen, LOST & FOUND and more
                </div>
                <button className="absolute right-5 bottom-5 translate-y-4 h-12 w-12 bg-melody-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 hover:bg-[#f40612] z-20">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black ml-1"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                </button>
              </div>
            </div>

            <div className="flex-none w-[360px] flex flex-col gap-3">
              <span className="text-[13px] text-melody-text font-medium hover:underline cursor-pointer">Made for you</span>
              <div className="h-[280px] rounded-lg bg-gradient-to-br from-[#006064] to-[#002526] p-5 relative overflow-hidden group cursor-pointer shadow-lg">
                <div className="flex gap-4 relative z-10">
                  <img src="https://picsum.photos/seed/christina/100" className="w-20 h-20 shadow-xl rounded-md" alt="Christina" />
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-bold bg-black/20 w-fit px-2 py-0.5 rounded-sm mb-1">RADIO</span>
                    <h3 className="text-white font-black text-2xl leading-tight">Christina<br/>Perri Radio</h3>
                    <span className="text-white/80 text-sm mt-1">Playlist • Spotify</span>
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-white/80 text-sm font-medium line-clamp-2 z-10">
                  With Lewis Capaldi, Adele, Passenger and more
                </div>
                <button className="absolute right-5 bottom-5 translate-y-4 h-12 w-12 bg-melody-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 hover:bg-[#f40612] z-20">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black ml-1"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Large Cards Row 4 */}
          <div className="flex gap-6 mt-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex-none w-[360px] flex flex-col gap-3">
              <span className="text-[13px] text-melody-text font-medium hover:underline cursor-pointer">Episodes you might like</span>
              <div className="h-[280px] rounded-lg bg-[#b00f24] p-5 relative overflow-hidden group cursor-pointer shadow-lg flex flex-col justify-between">
                <div className="flex flex-col relative z-10">
                  <h3 className="text-white font-black text-[22px] leading-tight line-clamp-2 mb-1">Wednesday, August 26, 2026 - 5 Minute AI News</h3>
                  <span className="text-white/80 text-sm font-medium">Episode • 5 Minute AI News - Daily</span>
                </div>
                <div className="flex justify-center my-2 relative z-10">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-xl shadow-2xl bg-white flex flex-col items-center justify-center border border-gray-200">
                      <span className="text-[#b00f24] font-black text-6xl">5</span>
                      <span className="text-[#b00f24] text-[8px] font-bold tracking-widest mt-1">NEW PLAYING • TODAY'S S</span>
                    </div>
                    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black font-bold text-[13px] px-5 py-2.5 rounded-full whitespace-nowrap shadow-2xl hover:scale-105 transition-transform z-20 border border-black/5">
                      Continue playing
                    </button>
                  </div>
                </div>
                <div className="text-white/80 text-[13px] font-medium line-clamp-2 z-10 mt-auto">
                  Aug 26 • 4 min 51 sec • OpenAI reveals its custom Jalapeno chip, Apple launches Macs optimized...
                </div>
              </div>
            </div>
            
            <div className="flex-none w-[360px] flex flex-col gap-3">
              <span className="text-[13px] text-melody-text font-medium hover:underline cursor-pointer">More like Lauren Daigle</span>
              <div className="h-[280px] rounded-lg bg-gradient-to-br from-[#c8c8c8] to-[#404040] p-5 relative overflow-hidden group cursor-pointer shadow-lg flex flex-col justify-between border border-white/10">
                <div className="flex gap-4 relative z-10">
                  <img src="https://picsum.photos/seed/lifer/100" className="w-20 h-20 shadow-xl rounded-md bg-white p-2" alt="Lifer" />
                  <div className="flex flex-col">
                    <h3 className="text-black font-black text-2xl leading-tight mt-1">Lifer</h3>
                    <span className="text-black/80 text-sm mt-1 font-medium">Album • MercyMe</span>
                  </div>
                </div>
                <div className="flex justify-center relative z-0 flex-1 items-center">
                    <span className="text-black font-black text-6xl tracking-widest opacity-20">LIFER</span>
                </div>
                <div className="flex items-center justify-between z-10">
                  <button className="bg-black/10 hover:bg-black/20 text-black font-bold text-sm px-4 py-1.5 rounded-full transition-colors flex items-center gap-2">
                     <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM9.5 15.5v-7l6 3.5-6 3.5z"></path></svg>
                     Preview
                  </button>
                  <div className="flex gap-2 text-black font-bold">
                      ••• <span className="border border-black rounded-full w-6 h-6 flex items-center justify-center">+</span>
                  </div>
                </div>
                <button className="absolute right-5 bottom-5 translate-y-4 h-12 w-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 z-20">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black ml-1"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                </button>
              </div>
            </div>

            <div className="flex-none w-[360px] flex flex-col gap-3">
              <span className="text-[13px] text-melody-text font-medium hover:underline cursor-pointer">More like Lauren Daigle</span>
              <div className="h-[280px] rounded-lg bg-[#212121] p-5 relative overflow-hidden group cursor-pointer shadow-lg">
                <div className="flex gap-4 relative z-10">
                  <img src="https://picsum.photos/seed/worshiphits/100" className="w-20 h-20 shadow-xl rounded-md" alt="Worship Hits" />
                  <div className="flex flex-col">
                    <h3 className="text-white font-black text-2xl leading-tight mt-1">Worship Hits</h3>
                    <span className="text-white/80 text-sm mt-1">Playlist • Spotify</span>
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-white/80 text-sm font-medium line-clamp-2 z-10">
                  All of your recent Worship hits in one place! Cover: Elevation Worship
                </div>
                <button className="absolute right-5 bottom-5 translate-y-4 h-12 w-12 bg-melody-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 hover:bg-[#f40612] z-20">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black ml-1"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="h-10"></div>
          
        </>
      )}

    </div>
  );
};
