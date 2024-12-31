/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-bg": "url('/src/assets/bg1.svg')",
        "about-bg": "url('/src/assets/photo.png')",
        "contact-bg": "url('/src/assets/bg3.webp')",
      },
      whitespace: {
        "pre-wrap": "pre-wrap",
      },
    },
    fontFamily: {
      outfit: ["Outfit", "sans-serif"],
    },
  },
  plugins: [
    require("daisyui")
  ],
}
