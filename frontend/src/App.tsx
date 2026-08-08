import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { Home } from './components/Home';
import { Search } from './components/Search';
import { Player } from './components/Player';
import { RightSidebar } from './components/RightSidebar';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import './App.css';

const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-black text-melody-text p-2 pb-0 gap-2 font-sans">
      {/* Top section: Sidebar + Main Content + RightSidebar */}
      <div className="flex-1 flex overflow-hidden gap-2 h-[calc(100vh-80px-16px)]">
        <div className="hidden md:flex">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 bg-[#121212] rounded-lg overflow-y-auto relative flex flex-col">
          <Topbar />
          <div className="flex-1 overflow-y-auto px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </div>
        </main>
        
        
        <div className="hidden lg:flex">
          <RightSidebar />
        </div>
      </div>

      {/* Bottom section: Now Playing Bar */}
      <Player />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<MainLayout />} />
          </Routes>
        </BrowserRouter>
      </PlayerProvider>
    </AuthProvider>
  );
}

export default App;
