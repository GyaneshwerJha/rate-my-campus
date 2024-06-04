/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.2rem',
        sm: '0rem',
      },
    },
    extend: {},
  },
  plugins: [],
};
