import React from 'react';

export const Home = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Greeting */}
      <h1 className="text-3xl font-bold text-white tracking-tight">Good afternoon</h1>
      
      {/* Recently Played Area Placeholder */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Placeholder for Recently Played */}
      </div>

      {/* Recommended Carousels Placeholder */}
      <div className="flex flex-col gap-8 mt-4">
        {/* Placeholder for Albums/Playlists */}
      </div>
    </div>
  );
};
