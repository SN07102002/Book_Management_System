/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,jsx}",
],
  theme: {
    extend: {
      fontFamily: {
        'alan': ['"Alan Sans"', 'sans-serif'],
        'funnel': ['"Funnel Display"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

