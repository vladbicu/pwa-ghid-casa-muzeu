/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        museum: {
          beige: '#FAF7F0',
          walnut: '#2C1810',
          moss: '#6B7D5C',
          cream: '#FFFCF5',
          sand: '#F0EBE3',
          brown: '#3D2817',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'warm': '0 4px 14px 0 rgba(107, 68, 35, 0.15)',
        'warm-lg': '0 10px 25px -5px rgba(107, 68, 35, 0.2)',
        'inner-wood': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
