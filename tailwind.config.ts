import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        surface: "#000000",
        ink: "#ffffff",
        muted: "#9a9a9a",
        accent: "#8052ff",
        line: "rgba(255,255,255,0.12)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "radial-grid": "radial-gradient(circle at 50% 0%, rgba(128,82,255,0.22), transparent 38%)"
      }
    }
  },
  plugins: []
};

export default config;
