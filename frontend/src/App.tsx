import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { Home } from './components/Home';
import { Search } from './components/Search';
import { Player } from './components/Player';
import { RightSidebar } from './components/RightSidebar';
import { PreviewBanner } from './components/PreviewBanner';
import { useAuth } from './context/AuthContext';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import './App.css';

const MainLayout = () => {
  const { user } = useAuth();
  
  return (
    <div className="h-screen flex flex-col bg-black text-melody-text p-2 gap-2 font-sans overflow-hidden">
      <Topbar />

      {/* Middle section: Sidebar + Main Content + RightSidebar */}
      <div className="flex-1 flex overflow-hidden gap-2">
        <div className="hidden md:flex">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 bg-[#121212] rounded-lg overflow-y-auto relative flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>
        
        {user && (
          <div className="hidden lg:flex">
            <RightSidebar />
          </div>
        )}
      </div>

      {/* Bottom section: Now Playing Bar or Preview Banner */}
      {user ? <Player /> : <PreviewBanner />}
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
