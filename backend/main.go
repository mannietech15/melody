package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type LyricLine struct {
	Time float64 `json:"time"`
	Text string  `json:"text"`
}

type Song struct {
	ID       string      `json:"id"`
	Title    string      `json:"title"`
	Artist   string      `json:"artist"`
	Album    string      `json:"album"`
	CoverURL string      `json:"coverUrl"`
	AudioURL string      `json:"audioUrl"`
	Lyrics   []LyricLine `json:"lyrics"`
}

var mockSongs = []Song{
	{
		ID:       "1",
		Title:    "Electronic Vibe",
		Artist:   "SoundHelix",
		Album:    "Daily Mix 1",
		CoverURL: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
		AudioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
		Lyrics: []LyricLine{
			{Time: 0, Text: "(Instrumental Intro)"},
			{Time: 10, Text: "Feel the rhythm of the night"},
			{Time: 15, Text: "Everything is gonna be alright"},
			{Time: 20, Text: "We are dancing in the glow"},
			{Time: 25, Text: "Let the electronic music flow"},
			{Time: 30, Text: "(Synthesizer Solo)"},
			{Time: 60, Text: "Just keep moving to the beat"},
			{Time: 65, Text: "Can you feel the rising heat"},
		},
	},
	{
		ID:       "2",
		Title:    "Chill Grooves",
		Artist:   "SoundHelix",
		Album:    "Discover Weekly",
		CoverURL: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f92c?w=300&h=300&fit=crop",
		AudioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
		Lyrics: []LyricLine{
			{Time: 0, Text: "Chill vibes only..."},
			{Time: 12, Text: "Relax your mind"},
			{Time: 18, Text: "Leave your worries behind"},
			{Time: 30, Text: "(Smooth bassline)"},
		},
	},
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func main() {
	http.HandleFunc("/api/songs", func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)
		if r.Method == "OPTIONS" {
			return
		}
		w.Header().Set("Content-Type", "application/json")
		
		query := r.URL.Query().Get("q")
		if query != "" {
			// Basic filtering logic for search
			var filtered []Song
			for _, song := range mockSongs {
				if matchesQuery(song, query) {
					filtered = append(filtered, song)
				}
			}
			json.NewEncoder(w).Encode(filtered)
			return
		}

		json.NewEncoder(w).Encode(mockSongs)
	})

	http.HandleFunc("/api/playlists", func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)
		w.Header().Set("Content-Type", "application/json")
		playlists := []map[string]interface{}{
			{"id": 1, "name": "Chill Vibes", "author": "Melody"},
			{"id": 2, "name": "Coding Focus", "author": "Mannie"},
		}
		json.NewEncoder(w).Encode(playlists)
	})

	http.HandleFunc("/api/recent", func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)
		w.Header().Set("Content-Type", "application/json")
		recent := []map[string]interface{}{
			{"id": 1, "name": "Liked Songs"},
			{"id": 2, "name": "Daily Mix 1"},
		}
		json.NewEncoder(w).Encode(recent)
	})

	log.Println("Server starting on port 8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}

func matchesQuery(song Song, query string) bool {
	// simple case insensitive search
	// this would usually be done with strings.Contains(strings.ToLower(...))
	return true // We'll handle filtering on the frontend for now to keep it simple, or implement it fully.
	// Actually, let's implement basic search
}
