import React, { useState, useEffect } from 'react';

interface Recent {
  id: number;
  name: string;
}

export const Home = () => {
  const [recent, setRecent] = useState<Recent[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/recent')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setRecent(data);
      })
      .catch(err => console.error("Error fetching recent", err));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Greeting */}
      <h1 className="text-3xl font-bold text-white tracking-tight">Good afternoon</h1>
      
      {/* Recently Played Area */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        {recent.map((item) => (
          <div key={item.id} className="bg-white/10 hover:bg-white/20 transition-colors flex items-center rounded overflow-hidden cursor-pointer group h-16">
            <img 
              src={`https://picsum.photos/seed/recent${item.id}/80/80`} 
              alt="Cover" 
              className="h-16 w-16 shadow-[0_8px_24px_rgba(0,0,0,0.5)] object-cover"
            />
            <span className="font-bold text-white ml-4 text-sm truncate pr-4 flex-1">
              {item.name}
            </span>
            <button className="h-10 w-10 bg-spotify-green rounded-full flex items-center justify-center mr-4 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              <svg role="img" height="20" width="20" aria-hidden="true" viewBox="0 0 24 24" fill="black">
                <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path>
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Recommended Carousels */}
      <div className="flex flex-col gap-8 mt-6 pb-20">
        {[
          { title: "Made For You" },
          { title: "Recently played" },
          { title: "More of what you like" }
        ].map((section, idx) => (
          <div key={idx} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer tracking-tight">
                {section.title}
              </h2>
              <span className="text-sm font-bold text-spotify-text hover:underline cursor-pointer">Show all</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-all cursor-pointer group relative">
                  <div className="relative mb-4">
                    <img 
                      src={`https://picsum.photos/seed/${section.title.replace(/\s+/g, '')}${item}/200/200`} 
                      alt="Album Cover" 
                      className="w-full aspect-square object-cover rounded-md shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
                    />
                    <button className="absolute right-2 bottom-2 translate-y-2 h-12 w-12 bg-spotify-green rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 hover:bg-[#1fdf64]">
                      <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" fill="black">
                        <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path>
                      </svg>
                    </button>
                  </div>
                  <h3 className="font-bold text-white mb-1 truncate">Daily Mix {item}</h3>
                  <p className="text-sm text-spotify-text line-clamp-2">
                    A custom mix tailored just for you. Discover new tracks and artists.
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
