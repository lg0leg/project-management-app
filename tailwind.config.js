/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('assets/images/login.png')",
        registration: "url('assets/images/registration.png')",
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-30deg)' },
          '50%': { transform: 'rotate(30deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 2s cubic-bezier(0.6, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
