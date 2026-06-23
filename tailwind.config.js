/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        ink: '#120B22',
        dusk: '#1B1033',
        wine: '#3D1230',
        gold: '#E8B83D',
        rose: '#E8607A',
        parchment: '#F5EDE4',
        haze: '#9D8FB8',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Outfit"', 'sans-serif'],
        script: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(232, 184, 61, 0.35)',
      },
      backgroundImage: {
        'night-gradient': 'radial-gradient(120% 120% at 50% 0%, #2A1845 0%, #1B1033 45%, #120B22 100%)',
      },
    },
  },
  plugins: [],
}

