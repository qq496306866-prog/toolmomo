import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef4fb",
          100: "#d9e7f6",
          200: "#b7cce4",
          500: "#17345d",
          600: "#0b2345",
          700: "#061a35",
          900: "#031225",
        },
        accent: {
          50: "#fff4ed",
          100: "#ffe4d2",
          200: "#ffc49d",
          500: "#ff6a00",
          600: "#f05a00",
          700: "#c94700",
        },
      },
      boxShadow: {
        soft: "0 8px 24px rgba(15, 23, 42, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
