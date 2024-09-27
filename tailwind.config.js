/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-bg": "url('/src/assets/bg1.svg')",
        "about-bg": "url('/src/assets/photo.png')",
        "contact-bg": "url('/src/assets/bg3.png')",
      },
      whitespace: {
        "pre-wrap": "pre-wrap", // Add this line
      },
    },
    fontFamily: {
      outfit: ["Outfit", "sans-serif"],
    },
  },
  plugins: [require("daisyui")],
};
