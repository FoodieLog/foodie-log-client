import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: "#FF6D60",
          dark: "#CC594F",
          light: "#FF8E7D",
          saturated: "#FF473A",
          desaturated: "#FFA699",
        },
        sunflower: {
          DEFAULT: "#F7D160",
          dark: "#C7A74B",
          light: "#FFE37A",
          saturated: "#FFC800",
          desaturated: "#FFE8AA",
        },
        cream: {
          DEFAULT: "#F3EAA0",
          dark: "#C0B680",
          light: "#FFF3BB",
          saturated: "#FFF86C",
          desaturated: "#FFF5C7",
        },
        mint: {
          DEFAULT: "#99D9AC",
          dark: "#7FB28C",
          light: "#B3E3C5",
          saturated: "#66D977",
          desaturated: "#CCE9D0",
        },
      },
    },
  },
  plugins: [],
};
export default config;
