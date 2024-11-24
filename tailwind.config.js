/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        edu: ['"Edu AU VIC WA NT Pre"','sans-serif'],
        arsenica: ['"Arsenica"', 'sans-serif'],
        fredoka: ['"Fredoka"', 'sans-serif'],
        workSans: ['"Work Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}