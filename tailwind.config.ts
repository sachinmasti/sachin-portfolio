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
        acronym: [
          "Acronym",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif"
        ],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif"
        ]
      },
      fontSize: {
        caption: ["12px", { lineHeight: "1.5", letterSpacing: "0.05px" }],
        "body-sm": ["14px", { lineHeight: "1.5", letterSpacing: "0.05px" }],
        subheading: ["18px", { lineHeight: "1.5", letterSpacing: "0.025px" }],
        "heading-sm": ["24px", { lineHeight: "1.3", letterSpacing: "0.021px" }],
        heading: ["36px", { lineHeight: "1.2", letterSpacing: "0.021px" }],
        "heading-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.04px" }],
        display: ["78px", { lineHeight: "0.9", letterSpacing: "-0.04px" }],
        hero: ["113px", { lineHeight: "0.81", letterSpacing: "-0.04px" }]
      },
      fontWeight: {
        extralight: "200",
        regular: "400",
        semibold: "600",
        bold: "700"
      },
      spacing: {
        "6": "6px",
        "12": "12px",
        "18": "18px",
        "24": "24px",
        "30": "30px",
        "36": "36px",
        "60": "60px",
        "96": "96px",
        "120": "120px"
      },
      borderRadius: {
        DEFAULT: "24px",
        sm: "24px",
        md: "24px",
        lg: "24px",
        xl: "24px",
        "2xl": "24px",
        "3xl": "24px",
        nav: "24px",
        cards: "24px",
        buttons: "24px"
      },
      maxWidth: {
        page: "1200px"
      }
    }
  },
  plugins: []
};

export default config;
