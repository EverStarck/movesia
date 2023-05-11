// const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#292929",
        input: "#292929",
        ring: "#1d283a",
        background: "#000000",
        foreground: "#ffffff",
        myBlue: "#148eff",
        myGreen: "#16ca49",
        myOrange: "#ffa12e",
        primary: {
          DEFAULT: "​#000000",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#000000",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#c53434",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#121212",
          foreground: "#b8b8b8",
        },
        accent: {
          DEFAULT: "#121212",
          foreground: "#f8fafc",
        },
        popover: {
          DEFAULT: "#000000",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#030711",
          foreground: "#e1e7ef",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.8rem",
        sm: "1.0rem",
      },
      //   fontFamily: {
      //     sans: ["var(--font-sans)", ...fontFamily.sans],
      //   },
    },
  },
};
