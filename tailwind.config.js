/** @type {import('tailwindcss').Config} */

// Build a { DEFAULT, 100..900 } scale from a CSS-var prefix.
const ramp = (prefix, def) => ({
  ...(def ? { DEFAULT: `rgb(var(${def}) / <alpha-value>)` } : {}),
  100: `rgb(var(${prefix}-100) / <alpha-value>)`,
  200: `rgb(var(${prefix}-200) / <alpha-value>)`,
  300: `rgb(var(${prefix}-300) / <alpha-value>)`,
  400: `rgb(var(${prefix}-400) / <alpha-value>)`,
  500: `rgb(var(${prefix}-500) / <alpha-value>)`,
  600: `rgb(var(${prefix}-600) / <alpha-value>)`,
  700: `rgb(var(${prefix}-700) / <alpha-value>)`,
  800: `rgb(var(${prefix}-800) / <alpha-value>)`,
  900: `rgb(var(${prefix}-900) / <alpha-value>)`,
});

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
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
        },
        // Organic ("Vatra") ramps.
        accent: ramp('--color-accent', '--museum-brown'),   // terracotta — primary action
        sage: ramp('--color-accent-2', '--museum-moss'),    // guide mode
        clay: ramp('--color-neutral'),                      // warm neutral ramp
      },
      fontFamily: {
        sans: ['Figtree', 'system-ui', 'sans-serif'],
        heading: ['"Bree Serif"', 'Georgia', 'serif'],
      },
      borderRadius: {
        thumb: '16px',
        inner: '22px',
        card: '28px',
        sheet: '30px',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        warm: 'var(--shadow-sm)',
        'warm-lg': 'var(--shadow-lg)',
      },
    },
  },
  plugins: [],
}
