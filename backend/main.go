package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/api/playlists", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		playlists := []map[string]interface{}{
			{"id": 1, "name": "Chill Vibes", "author": "Spotify"},
			{"id": 2, "name": "Coding Focus", "author": "Mannie"},
		}
		json.NewEncoder(w).Encode(playlists)
	})

	http.HandleFunc("/api/recent", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
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
