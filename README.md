<div align="center">
  <img src="frontend/public/logo.png" alt="Melody Logo" width="120" />

  # 🎵 Melody
  
  **A beautiful, modern, and highly responsive music streaming web application.** <br/>
  *Built to mirror the sleek design and premium user experience of industry-leading platforms.*

  <p align="center">
    <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
    <img alt="TailwindCSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img alt="Go" src="https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white" />
    <img alt="GraphQL" src="https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white" />
  </p>
  
  <p align="center">
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-contributing">Contributing</a>
  </p>
</div>

---

## 🚀 About Melody

Melody isn't just a barebones clone; it's a meticulously crafted full-stack music application. Whether you are browsing as a guest or logged in to your personalized dashboard, Melody delivers a premium, dynamic, and seamless audio experience. 

It features an intelligent 3-pane architecture, real-time synced lyrics, state-of-the-art UI mimicking the top players in the game, and a robust Go/GraphQL backend.

---

## ✨ Features

- 🎧 **Custom Audio Engine**: Fully custom-built HTML5 audio player featuring scrubbing, volume control, track skipping, and a beautiful play queue.
- 🎨 **Premium UI/UX**: A state-of-the-art dark theme built from scratch with Tailwind CSS, featuring subtle micro-animations, glassmorphism, and pixel-perfect layouts.
- 🎤 **Real-Time Synced Lyrics**: A dynamic right-sidebar that beautifully scrolls and highlights real-time lyrics for the currently playing track.
- 🔒 **Guest & Authenticated States**: Features completely different customized UI flows depending on whether the user is logged in or browsing as a guest (complete with signup CTA banners).
- 📱 **Fully Responsive**: Adapts flawlessly across desktop, tablet, and mobile breakpoints using modern Flexbox & Grid layouts.
- 🔑 **Secure Authentication**: Built-in JWT-based authentication flow (Login/Signup).

---

## 💻 Tech Stack

### Frontend
- **Framework**: React 18 (via Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM v6
- **State Management**: React Context API (Custom Hooks for Player & Auth)

### Backend
- **Language**: Go (Golang) 1.20+
- **API**: GraphQL
- **Authentication**: JWT (JSON Web Tokens)
- **Architecture**: Clean, modular API design for scalability.

---

## 📸 Screenshots

*(Add your screenshots here to show off the app! Replace these placeholders)*

<div align="center">
  <img src="https://via.placeholder.com/800x450/121212/1ed760?text=Dashboard+Screenshot" alt="Dashboard Preview" width="80%"/>
  <br/>
  <i>The main dashboard showcasing the player, right sidebar, and synced lyrics.</i>
</div>

---

## 🛠️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [Go](https://golang.org/doc/install) (v1.20 or higher)

### 1. Clone the repository
```bash
git clone https://github.com/mannietech15/melody.git
cd melody
```

### 2. Start the Backend Server
The backend powers the authentication and API endpoints.
```bash
cd backend
go run main.go
```
*The backend will be running on `http://localhost:8080` (or whichever port is configured).*

### 3. Start the Frontend Application
Open a new terminal window/tab, navigate to the frontend folder, install dependencies, and start the Vite dev server.
```bash
cd frontend
npm install
npm run dev
```
*The frontend will be running on `http://localhost:5173`. Open this URL in your browser to see Melody in action!*

---

## 📂 Project Structure

```text
melody/
├── backend/                  # Go backend, GraphQL resolvers, and models
│   ├── main.go               # Entry point for the Go server
│   └── ...
├── frontend/                 # React frontend application
│   ├── public/               # Static assets (logos, etc.)
│   ├── src/                  
│   │   ├── components/       # Reusable UI components (Sidebar, Player, etc.)
│   │   ├── context/          # Global state (AuthContext, PlayerContext)
│   │   ├── pages/            # Page layouts (Login, SignUp, Home, etc.)
│   │   └── App.tsx           # Main application routing and layout structure
│   └── package.json          
├── CONTRIBUTING.md           # Guidelines for contributing
├── README.md                 # You are here!
└── docker-compose.yml        # Docker configuration for easy deployment
```

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please check out our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

---

## 📝 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">
  <b>Built with ❤️ by MannieTech</b><br/>
  If you like this project, please consider giving it a ⭐!
</div>
<!-- update 0 -->
<!-- update 1 -->
<!-- update 2 -->
<!-- update 3 -->
<!-- update 4 -->
<!-- update 5 -->
<!-- update 6 -->
<!-- update 7 -->
<!-- update 8 -->
<!-- update 9 -->
<!-- update 10 -->
<!-- update 11 -->
<!-- update 12 -->
<!-- update 13 -->
<!-- update 14 -->
<!-- update 15 -->
<!-- update 16 -->
<!-- update 17 -->
<!-- update 18 -->
<!-- update 19 -->
<!-- chore: optimize image loading performance -->
<!-- style: refine border radiuses across containers -->
<!-- refactor: clean up unused variables in layout -->
<!-- docs: update image source documentation -->
<!-- chore: prepare assets for production build -->
<!-- style: adjust padding in sidebar components -->
<!-- fix: ensure consistent image aspect ratios -->
<!-- refactor: simplify grid layout properties -->
<!-- chore: update internal dependencies -->
<!-- style: tweak hover states on playable cards -->
<!-- docs: add comments to home component sections -->
<!-- chore: remove legacy mock data -->
<!-- style: enhance contrast on pre-save text -->
<!-- refactor: modularize episode list rendering -->
<!-- chore: validate image seed generation -->
<!-- style: adjust spacing around filter chips -->
<!-- docs: clarify responsive behavior constraints -->
<!-- chore: review accessibility of image alts -->
<!-- style: fine-tune typography in sidebar -->
<!-- refactor: consolidate flexbox classes -->
<!-- chore: prep for upcoming feature toggle -->
<!-- style: smooth transition timings on hover -->
<!-- docs: document new gradient background -->
<!-- chore: audit console warnings -->
<!-- style: optimize scrollbar hiding css -->
<!-- refactor: abstract hardcoded strings -->
<!-- chore: finalize layout tweaks for beta release -->
<!-- style: adjust margins in new home sections -->
<!-- refactor: componentize large card layouts -->
<!-- docs: document mock data for new sections -->
<!-- chore: optimize station gradient overlays -->
<!-- style: fine-tune radio badge positioning -->
<!-- fix: ensure scrollbar remains hidden on new rows -->
<!-- refactor: abstract common card styling -->
<!-- chore: validate image seed generation for podcasts -->
<!-- style: adjust line-clamp for long playlist titles -->
<!-- docs: add comments to recommended stations -->
<!-- chore: review z-index for hover states -->
<!-- style: tweak play button translation on hover -->
<!-- refactor: simplify flexbox properties in large cards -->
<!-- chore: test image loading performance -->
<!-- style: enhance contrast of radio badge text -->
<!-- docs: clarify responsive behavior of large cards -->
<!-- chore: remove legacy styles from home component -->
<!-- style: adjust aspect ratios for station images -->
<!-- refactor: consolidate shadow styles -->
<!-- chore: audit console warnings for map keys -->
<!-- style: smooth transition timings on new sections -->
<!-- docs: update layout documentation -->
<!-- chore: prep for dynamic data integration -->
<!-- style: tweak typography in large cards -->
<!-- refactor: clean up unused variables -->
<!-- chore: validate responsive breakpoints -->
<!-- style: adjust padding in playlist section -->
<!-- docs: document shadow utilities -->
<!-- chore: review accessibility of new images -->
<!-- style: fine-tune hover opacity -->
<!-- refactor: modularize station rendering -->
<!-- chore: optimize SVG play button icons -->
<!-- style: adjust spacing around section headers -->
<!-- docs: clarify z-index layering -->
<!-- chore: finalize layout tweaks for new sections -->
<!-- style: ensure consistent corner radius -->
<!-- refactor: abstract hardcoded strings in cards -->
<!-- chore: review flex gap consistency -->
<!-- style: polish overall dashboard layout -->
<!-- style: refine layout of mixed format artists section -->
<!-- refactor: modularize large card variants -->
<!-- docs: document mock data for new artist rows -->
<!-- chore: optimize gradient blends in large cards -->
<!-- style: adjust padding for circular artist images -->
<!-- fix: ensure proper text truncation in mixed sections -->
<!-- refactor: abstract album art styling -->
<!-- chore: test seeded image reliability for new rows -->
<!-- style: fine-tune play button hover effects -->
<!-- docs: update documentation for Lifer custom card UI -->
<!-- chore: review flex alignments in grid elements -->
<!-- style: enhance contrast on custom album cards -->
<!-- refactor: simplify container structures in new rows -->
<!-- chore: validate image aspect ratios across cards -->
<!-- style: adjust border radius on square playlists -->
<!-- docs: clarify responsive stacking behavior -->
<!-- chore: remove legacy styles from large cards -->
<!-- style: tweak typography in custom 5 Minute AI card -->
<!-- refactor: consolidate shadow variables -->
<!-- chore: audit console warnings for missing keys -->
<!-- style: smooth transitions in newly added rows -->
<!-- docs: document absolute positioning in custom cards -->
<!-- chore: prep for fetching dynamic large card data -->
<!-- style: tweak flex gaps between distinct sections -->
<!-- refactor: clean up unused gradient classes -->
<!-- chore: validate breakpoints for large cards -->
<!-- style: adjust margins in circular artist row -->
<!-- docs: add comments to mock data arrays -->
<!-- chore: review accessibility of new SVG icons -->
<!-- style: fine-tune hover overlay opacity -->
<!-- refactor: modularize custom card rendering -->
<!-- chore: optimize SVG icon sizes -->
<!-- style: adjust typography weights in section headers -->
<!-- docs: clarify z-index layering for custom layouts -->
<!-- chore: finalize structural layout for beta preview -->
<!-- style: ensure consistent gap spacing throughout -->
<!-- refactor: abstract static labels in custom cards -->
<!-- chore: review structural integrity of horizontal scroll -->
<!-- style: polish overall feed architecture -->
<!-- style: adjust button positioning on podcast cards -->
<!-- refactor: componentize play controls overlay -->
<!-- docs: add comments to continue playing state -->
<!-- chore: review z-index for hover overlays -->
<!-- style: tweak preview button opacity on radio card -->
<!-- fix: ensure continue button overrides hover effects -->
<!-- refactor: abstract button styles for large cards -->
<!-- chore: test play controls on different screen sizes -->
<!-- style: fine-tune gap between preview icons -->
<!-- docs: update documentation for custom player controls -->
<!-- chore: review flex alignments in control bar -->
<!-- style: enhance contrast on translucent buttons -->
<!-- refactor: simplify container structures in overlays -->
<!-- chore: validate click targets for preview buttons -->
