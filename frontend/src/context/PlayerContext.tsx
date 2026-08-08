import { createContext, useContext, useState, useRef, useEffect, type ReactNode } from 'react';
import { type Song, mockSongs } from '../data/mockSongs';

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isLyricsOpen: boolean;
  isRightSidebarOpen: boolean;
  playSong: (song: Song) => void;
  togglePlayPause: () => void;
  seek: (time: number) => void;
  setVolume: (vol: number) => void;
  toggleLyrics: () => void;
  toggleRightSidebar: () => void;
  playNext: () => void;
  playPrev: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    
    const audio = audioRef.current;
    
    const updateTime = () => setProgress(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const onEnded = () => playNext();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
    };
  }, []);

  const playSong = (song: Song) => {
    if (!audioRef.current) return;
    
    if (currentSong?.id === song.id) {
      togglePlayPause();
      return;
    }
    
    setCurrentSong(song);
    audioRef.current.src = song.audioUrl;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (!audioRef.current || !currentSong) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const setVolume = (vol: number) => {
    if (audioRef.current) {
      audioRef.current.volume = vol;
      setVolumeState(vol);
    }
  };

  const toggleLyrics = () => {
    if (!isRightSidebarOpen) {
      setIsRightSidebarOpen(true);
      setIsLyricsOpen(true);
    } else if (isLyricsOpen) {
      setIsRightSidebarOpen(false);
      setIsLyricsOpen(false);
    } else {
      setIsLyricsOpen(true);
    }
  };

  const toggleRightSidebar = () => {
    if (isRightSidebarOpen) {
      setIsRightSidebarOpen(false);
      setIsLyricsOpen(false);
    } else {
      setIsRightSidebarOpen(true);
      setIsLyricsOpen(false);
    }
  };

  const playNext = () => {
    if (!currentSong) return;
    const currentIndex = mockSongs.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % mockSongs.length;
    playSong(mockSongs[nextIndex]);
  };

  const playPrev = () => {
    if (!currentSong) return;
    const currentIndex = mockSongs.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + mockSongs.length) % mockSongs.length;
    playSong(mockSongs[prevIndex]);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        progress,
        duration,
        volume,
        isLyricsOpen,
        isRightSidebarOpen,
        playSong,
        togglePlayPause,
        seek,
        setVolume,
        toggleLyrics,
        toggleRightSidebar,
        playNext,
        playPrev,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
