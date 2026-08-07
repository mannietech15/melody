import React from 'react';

export const Home = () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  
  return (
    <div className="flex flex-col gap-8 pb-20">
      
      {/* Trending songs */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] font-bold text-white hover:underline cursor-pointer tracking-tight">
            Trending songs
          </h2>
          <span className="text-sm font-bold text-spotify-text hover:underline cursor-pointer">Show all</span>
        </div>
        <div className="flex gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {items.map((item) => (
            <div key={item} className="flex-none w-[160px] xl:w-[180px] bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-all cursor-pointer group relative">
              <div className="relative mb-4">
                <img 
                  src={`https://picsum.photos/seed/trending${item}/200/200`} 
                  alt="Cover" 
                  className="w-full aspect-square object-cover rounded-md shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
                />
                <button className="absolute right-2 bottom-2 translate-y-2 h-12 w-12 bg-spotify-green rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 hover:bg-[#1fdf64]">
                  <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" fill="black">
                    <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path>
                  </svg>
                </button>
              </div>
              <h3 className="font-bold text-white mb-1 truncate text-[15px]">Song Title {item}</h3>
              <p className="text-sm text-spotify-text line-clamp-2">Artist Name</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular artists */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] font-bold text-white hover:underline cursor-pointer tracking-tight">
            Popular artists
          </h2>
          <span className="text-sm font-bold text-spotify-text hover:underline cursor-pointer">Show all</span>
        </div>
        <div className="flex gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {items.map((item) => (
            <div key={item} className="flex-none w-[160px] xl:w-[180px] bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-all cursor-pointer group relative">
              <div className="relative mb-4">
                <img 
                  src={`https://picsum.photos/seed/artist${item}/200/200`} 
                  alt="Artist" 
                  className="w-full aspect-square object-cover rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
                />
                <button className="absolute right-2 bottom-2 translate-y-2 h-12 w-12 bg-spotify-green rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 hover:bg-[#1fdf64]">
                  <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" fill="black">
                    <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path>
                  </svg>
                </button>
              </div>
              <h3 className="font-bold text-white mb-1 truncate text-[15px]">Artist Name {item}</h3>
              <p className="text-sm text-spotify-text line-clamp-2">Artist</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular albums and singles */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] font-bold text-white hover:underline cursor-pointer tracking-tight">
            Popular albums and singles
          </h2>
          <span className="text-sm font-bold text-spotify-text hover:underline cursor-pointer">Show all</span>
        </div>
        <div className="flex gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {items.map((item) => (
            <div key={item} className="flex-none w-[160px] xl:w-[180px] bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-all cursor-pointer group relative">
              <div className="relative mb-4">
                <img 
                  src={`https://picsum.photos/seed/album${item}/200/200`} 
                  alt="Cover" 
                  className="w-full aspect-square object-cover rounded-md shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
                />
                <button className="absolute right-2 bottom-2 translate-y-2 h-12 w-12 bg-spotify-green rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 hover:bg-[#1fdf64]">
                  <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" fill="black">
                    <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path>
                  </svg>
                </button>
              </div>
              <h3 className="font-bold text-white mb-1 truncate text-[15px]">Album Name {item}</h3>
              <p className="text-sm text-spotify-text line-clamp-2">Artist Name</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
