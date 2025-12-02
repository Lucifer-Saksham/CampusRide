/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f9fb',
          100: '#bff3f6',
          300: '#6ce7ef',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#047481'
        },
  accent: '#22c1c3',
  brandBright: '#1e90ff',
  brandDull: '#4b82c7',
        bgDark: '#0f1724',
        surface: '#0b1220'
      }
    },
  },
  plugins: [],
}

