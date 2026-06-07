import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: "#000000",
        bone: "#ffffff",
        ash: "#bdbdbd",
        smoke: "#9a9a9a",
        "plum-voltage": "#8052ff",
        "amber-spark": "#ffb829",
        lichen: "#15846e",
        surface: "#000000",
        ink: "#ffffff",
        muted: "#9a9a9a",
        accent: "#8052ff",
        line: "rgba(255,255,255,0.1)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      borderRadius: {
        DEFAULT: "24px",
        sm: "24px",
        md: "24px",
        lg: "24px",
        xl: "24px",
        "2xl": "24px",
        "3xl": "24px"
      }
    }
  },
  plugins: []
};

export default config;
