import React from 'react';

export const Home = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Greeting */}
      <h1 className="text-3xl font-bold text-white tracking-tight">Good afternoon</h1>
      
      {/* Recently Played Area */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="bg-white/10 hover:bg-white/20 transition-colors flex items-center rounded overflow-hidden cursor-pointer group h-16">
            <img 
              src={`https://picsum.photos/seed/recent${item}/80/80`} 
              alt="Cover" 
              className="h-16 w-16 shadow-[0_8px_24px_rgba(0,0,0,0.5)] object-cover"
            />
            <span className="font-bold text-white ml-4 text-sm truncate pr-4 flex-1">
              Mix {item}
            </span>
            <button className="h-10 w-10 bg-spotify-green rounded-full flex items-center justify-center mr-4 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              <svg role="img" height="20" width="20" aria-hidden="true" viewBox="0 0 24 24" fill="black">
                <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path>
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Recommended Carousels Placeholder */}
      <div className="flex flex-col gap-8 mt-4">
        {/* Placeholder for Albums/Playlists */}
      </div>
    </div>
  );
};
