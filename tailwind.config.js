/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#023047',
        secodary: '#219EBC',
        background: '#EDEDE9',
      },
      //3rem = 48px
      fontSize: {
        xxs: '0.75rem',
        xs: '1rem',
        s: '1.15rem',
        m: '1.5rem',
      },
    },
  },
  plugins: [],
};
