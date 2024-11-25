/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arsenica: ['"Arsenica"', 'sans-serif'],
        fredoka: ['"Fredoka"', 'sans-serif'],
        workSans: ['"Work Sans"', 'sans-serif'],
        bungee: ['"Bungee Spice"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}