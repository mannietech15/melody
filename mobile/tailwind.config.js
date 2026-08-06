/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Spotify's actual palette
        spotify: {
          green: "#1DB954",
          black: "#000000",
          darkgray: "#121212",
          card: "#181818",
          elevated: "#282828",
          lightgray: "#B3B3B3",
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
