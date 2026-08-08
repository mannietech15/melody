export interface LyricLine {
  time: number; // in seconds
  text: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  audioUrl: string;
  lyrics: LyricLine[];
}

export const mockSongs: Song[] = [
  {
    id: "1",
    title: "Electronic Vibe",
    artist: "SoundHelix",
    album: "Daily Mix 1",
    coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    lyrics: [
      { time: 0, text: "(Instrumental Intro)" },
      { time: 10, text: "Feel the rhythm of the night" },
      { time: 15, text: "Everything is gonna be alright" },
      { time: 20, text: "We are dancing in the glow" },
      { time: 25, text: "Let the electronic music flow" },
      { time: 30, text: "(Synthesizer Solo)" },
      { time: 60, text: "Just keep moving to the beat" },
      { time: 65, text: "Can you feel the rising heat" },
    ]
  },
  {
    id: "2",
    title: "Chill Grooves",
    artist: "SoundHelix",
    album: "Discover Weekly",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f92c?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    lyrics: [
      { time: 0, text: "Chill vibes only..." },
      { time: 12, text: "Relax your mind" },
      { time: 18, text: "Leave your worries behind" },
      { time: 30, text: "(Smooth bassline)" },
    ]
  }
];
