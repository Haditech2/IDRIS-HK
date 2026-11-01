import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#006C43",
          foreground: "#ffffff",
          dark: "#004d30",
          light: "#008f58",
        },
        royal: {
          DEFAULT: "#0A6FB8",
          dark: "#085791",
        },
        accent: {
          orange: "#F58220",
        },
        muted: {
          DEFAULT: "#f3f4f6",
          foreground: "#6b7280",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#111827",
        },
        border: "#e5e7eb",
        input: "#e5e7eb",
        ring: "#006C43",
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
export default config;

