import React from 'react';

interface SectionProps {
  title: string;
  isCircular?: boolean;
}

export const Section: React.FC<SectionProps> = ({ title, isCircular = false }) => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-[22px] font-bold text-white hover:underline cursor-pointer tracking-tight">
          {title}
        </h2>
        <span className="text-sm font-bold text-melody-text hover:underline cursor-pointer">Show all</span>
      </div>
      <div className="flex gap-5 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {items.map((item) => (
          <div key={item} className="flex-none w-[180px] hover:bg-[#282828] transition-colors duration-300 p-4 rounded-lg transition-all cursor-pointer group relative">
            <div className="relative mb-4">
              <img 
                src={`https://picsum.photos/seed/${title.replace(/\s+/g, '')}${item}/200/200`} 
                alt="Cover" 
                className={`w-full aspect-square object-cover shadow-lg ${isCircular ? 'rounded-full' : 'rounded-md'}`}
              />
              <button className="absolute right-2 bottom-2 translate-y-2 h-12 w-12 drop-shadow-md bg-melody-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 hover:bg-[#f40612]">
                <svg role="img" height="24" width="24" className="text-black" aria-hidden="true" viewBox="0 0 24 24" fill="black">
                  <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path>
                </svg>
              </button>
            </div>
            <h3 className="font-bold text-white mb-1 truncate text-base">Item {item}</h3>
            <p className="text-sm text-melody-text line-clamp-2">{isCircular ? 'Artist' : 'Description text here...'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
