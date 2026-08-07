import React from 'react';
import './App.css';

function App() {
  return (
    <div className="h-screen flex flex-col bg-spotify-base text-spotify-text">
      {/* Top section: Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar placeholder */}
        <aside className="w-64 bg-spotify-base flex flex-col p-2 gap-2">
          <div className="bg-spotify-dark rounded-lg flex-1">Sidebar</div>
        </aside>

        {/* Main Content placeholder */}
        <main className="flex-1 bg-spotify-dark rounded-lg m-2 ml-0 overflow-y-auto">
          Main Content Area
        </main>
      </div>

      {/* Bottom section: Now Playing Bar */}
      <footer className="h-24 bg-black border-t border-spotify-light px-4 flex items-center">
        Now Playing Bar
      </footer>
    </div>
  );
}

export default App;
