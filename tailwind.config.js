/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        museum: {
          beige: 'rgb(var(--museum-beige) / <alpha-value>)',
          walnut: 'rgb(var(--museum-walnut) / <alpha-value>)',
          moss: 'rgb(var(--museum-moss) / <alpha-value>)',
          cream: 'rgb(var(--museum-cream) / <alpha-value>)',
          sand: 'rgb(var(--museum-sand) / <alpha-value>)',
          brown: 'rgb(var(--museum-brown) / <alpha-value>)',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'warm': '0 4px 14px 0 rgba(0, 0, 0, 0.12)',
        'warm-lg': '0 10px 25px -5px rgba(0, 0, 0, 0.18)',
        'inner-wood': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
