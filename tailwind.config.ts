/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    backgroundImage: {
      "drop-down": "url('/svgs/arrow_drop_down.svg')",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        red: {
          DEFAULT: "#DE2E1F",
        },
        gray: {
          0: "#FFFFFF",
          1: "#F4F4F4",
          2: "#E9E9E9",
          3: "#BABABA",
          4: "#777777",
          8: "#3B4555",
          10: "#363232",
        },
        kakao: {
          DEFAULT: "#FEE500",
        },
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
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/aspect-ratio")],
};
