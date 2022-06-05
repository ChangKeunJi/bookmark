module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Spoqa Han Sans Neo", "sans-serif", "Helvetica", "Arial"],
    },
    colors: {
      gray: "#F7F6F3",
      "gray-dark": "#DAD9D4",
      "gray-dark2": "#9d9d9c",
      orange: "#f5691e",
      white: "#FFFFFF",
      black: "#000000",
      red: "#da1515",
      green: "#48bb78",
      "dark-bg": "#2F3437",
      "dark-font": "#c7c7c7",
      "dark-black": "#373C3F",
      "dark-black-light": "#474C50",
    },
    screens: {
      sm: "600px",
      md: "820px",
      lg: "1090px",
      xl: "1500px",
      "2xl": "1724px",
    },
    container: {
      center: true,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
