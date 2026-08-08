import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { Home } from './components/Home';
import { Player } from './components/Player';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import './App.css';

const MainLayout = () => {
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
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
