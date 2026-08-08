import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f4f6f8",
          100: "#e3e8ee",
          200: "#c5d0dc",
          300: "#9aabc0",
          400: "#6b829d",
          500: "#516782",
          600: "#3f5269",
          700: "#344356",
          800: "#2d3948",
          900: "#1a222d",
          950: "#0f141b",
        },
        copper: {
          400: "#d4a574",
          500: "#c4894a",
          600: "#a66d35",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
