/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          green: '#1DB954',
          dark: '#121212',
          base: '#191414',
          light: '#282828',
          text: '#B3B3B3',
          white: '#FFFFFF',
        }
      }
    },
  },
  plugins: [],
}
