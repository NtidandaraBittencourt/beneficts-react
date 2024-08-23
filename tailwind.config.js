/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg-light': '#f6eee7',
        'custom-bg-pink': '#ffeff3',
      },
    },
  },
  plugins: [],
}

