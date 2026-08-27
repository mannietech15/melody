package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	_ "github.com/mattn/go-sqlite3"
	"golang.org/x/crypto/bcrypt"
)

var db *sql.DB
var jwtKey = []byte("my_secret_melody_key_change_in_production")

type Claims struct {
	ID    string `json:"id"`
	Email string `json:"email"`
	Name  string `json:"name"`
	jwt.RegisteredClaims
}

type User struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password,omitempty"`
}

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

func initDB() {
	var err error
	db, err = sql.Open("sqlite3", "./melody.db")
	if err != nil {
		log.Fatal(err)
	}

	createTableQuery := `
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		email TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL
	);`

	_, err = db.Exec(createTableQuery)
	if err != nil {
		log.Fatal("Failed to create users table: ", err)
	}
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func main() {
	initDB()
	defer db.Close()

	http.HandleFunc("/api/signup", signupHandler)
	http.HandleFunc("/api/login", loginHandler)
	
	http.HandleFunc("/api/songs", func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)
		if r.Method == "OPTIONS" {
			return
		}
		w.Header().Set("Content-Type", "application/json")
		
		query := r.URL.Query().Get("q")
		if query != "" {
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
	q := strings.ToLower(query)
	return strings.Contains(strings.ToLower(song.Title), q) || strings.Contains(strings.ToLower(song.Artist), q) || strings.Contains(strings.ToLower(song.Album), q)
}

func generateToken(id, email, name string) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		ID:    id,
		Email: email,
		Name:  name,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKey)
}

func signupHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == "OPTIONS" {
		return
	}
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var creds User
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, "Invalid payload", http.StatusBadRequest)
		return
	}

	if creds.Email == "" || creds.Password == "" || creds.Name == "" {
		http.Error(w, "Missing fields", http.StatusBadRequest)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(creds.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Server error", http.StatusInternalServerError)
		return
	}

	var id int
	err = db.QueryRow("INSERT INTO users (name, email, password) VALUES (?, ?, ?) RETURNING id", creds.Name, creds.Email, string(hashedPassword)).Scan(&id)
	if err != nil {
		if strings.Contains(err.Error(), "UNIQUE constraint failed") {
			http.Error(w, "Email already exists", http.StatusConflict)
			return
		}
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	strId := fmt.Sprintf("%d", id)
	tokenString, err := generateToken(strId, creds.Email, creds.Name)
	if err != nil {
		http.Error(w, "Error generating token", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"token": tokenString,
		"id":    strId,
		"name":  creds.Name,
		"email": creds.Email,
	})
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == "OPTIONS" {
		return
	}
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var creds User
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, "Invalid payload", http.StatusBadRequest)
		return
	}

	var id int
	var name, storedHash string
	err := db.QueryRow("SELECT id, name, password FROM users WHERE email = ?", creds.Email).Scan(&id, &name, &storedHash)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
			return
		}
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	if err = bcrypt.CompareHashAndPassword([]byte(storedHash), []byte(creds.Password)); err != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	strId := fmt.Sprintf("%d", id)
	tokenString, err := generateToken(strId, creds.Email, name)
	if err != nil {
		http.Error(w, "Error generating token", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"token": tokenString,
		"id":    strId,
		"name":  name,
		"email": creds.Email,
	})
}
