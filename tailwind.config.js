/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {},
    extend: {
      colors: {
        "main-blue": "#020230",
        secondary: "#008080",
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
      boxShadow: {
        modal: "0 35px 60px -15px rgba(255,255,255, 0.9)",
      },
    },
  },
  plugins: [],
};
