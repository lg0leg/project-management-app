/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('assets/images/login.png')",
        registration: "url('assets/images/registration.png')",
        profile: "url('assets/images/profile.png')",
      },
    },
  },
  plugins: [],
};
