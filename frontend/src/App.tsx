import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { Home } from './components/Home';
import { Player } from './components/Player';
import './App.css';

function App() {
  return (
    <div className="h-screen flex flex-col bg-melody-base text-melody-text">
      {/* Top section: Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        {/* Main Content placeholder */}
        <main className="flex-1 bg-melody-dark rounded-lg m-2 ml-0 overflow-y-auto relative bg-gradient-to-b from-[#2a2a2a] to-melody-dark">
          <Topbar />
          <div className="p-6">
            <Home />
          </div>
        </main>
      </div>

      {/* Bottom section: Now Playing Bar */}
      <Player />
    </div>
  );
}

export default App;
