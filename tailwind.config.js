/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-blue": "#020230",
      },
      backgroundImage: {
        "hero-pattern": "linear-gradient(to bottom, rgba(0, 0, 0, 0), #020230), url('./src/assets/bg.jpg')",
      },
      animation: {
        bounce: "bounceAnimation 1s linear 5 alternate",
      },
      keyframes: {
        bounceAnimation: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-25%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
