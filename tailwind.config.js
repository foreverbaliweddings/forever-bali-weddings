/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F9F7F4',
        champagne: '#C8A96A',
        beige: '#F3EDE5',
        charcoal: '#2E2E2E',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        luxe: '0 20px 60px rgba(46, 46, 46, 0.12)',
      },
    },
  },
  plugins: [],
};
