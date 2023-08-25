import type { Config } from "tailwindcss";

const config: Config = {
  mode: 'jit',
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: "#FF6D60",
          dark: "#CC594F",
          light: "#FF8E7D",
          sat: "#FF473A",
          desat: "#FFA699",
        },
        sunflower: {
          DEFAULT: "#F7D160",
          dark: "#C7A74B",
          light: "#FFE37A",
          sat: "#FFC800",
          desat: "#FFE8AA",
        },
        cream: {
          DEFAULT: "#F3EAA0",
          dark: "#C0B680",
          light: "#FFF3BB",
          sat: "#FFF86C",
          desat: "#FFF5C7",
        },
        mint: {
          DEFAULT: "#99D9AC",
          dark: "#7FB28C",
          light: "#B3E3C5",
          sat: "#66D977",
          desat: "#CCE9D0",
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
export default config;
