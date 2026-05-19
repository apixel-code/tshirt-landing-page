import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F0F0F",
        accent: "#FF4D00",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Bricolage Grotesque", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem", // rounded-2xl as project default
      },
    },
  },
  plugins: [],
};

export default config;
