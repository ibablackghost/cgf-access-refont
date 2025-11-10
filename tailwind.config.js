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
          DEFAULT: '#112B60',
          light: '#1a3d7a',
          dark: '#0a1f42',
        },
      },
    },
  },
  plugins: [],
}
