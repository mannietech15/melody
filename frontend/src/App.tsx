import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { Home } from './components/Home';
import './App.css';

function App() {
  return (
    <div className="h-screen flex flex-col bg-spotify-base text-spotify-text">
      {/* Top section: Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        {/* Main Content placeholder */}
        <main className="flex-1 bg-spotify-dark rounded-lg m-2 ml-0 overflow-y-auto relative bg-gradient-to-b from-[#2a2a2a] to-spotify-dark">
          <Topbar />
          <div className="p-6">
            <Home />
          </div>
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
