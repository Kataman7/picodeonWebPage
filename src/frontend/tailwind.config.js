/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'tilt-neon': ['"Tilt Neon"', 'sans-serif'],
      },
      colors: {
        // Couleurs de la charte PicoKeebs v1
        'pk-black': '#222',
        'pk-white': '#FAFAFA', 
        'pk-dark-gray': '#434343',
        'pk-gray': '#f9f9f9',
      },
    },
  },
  plugins: [],
}