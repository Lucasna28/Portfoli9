/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(147, 51, 234)",
          50: "rgb(250, 245, 255)",
          100: "rgb(243, 232, 255)",
          200: "rgb(233, 213, 255)",
          300: "rgb(216, 180, 254)",
          400: "rgb(192, 132, 252)",
          500: "rgb(147, 51, 234)",
          600: "rgb(126, 34, 206)",
          700: "rgb(107, 33, 168)",
          800: "rgb(88, 28, 135)",
          900: "rgb(74, 29, 104)",
          950: "rgb(46, 16, 101)",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        glow: "0 0 15px rgba(147, 51, 234, 0.5)",
        "glow-lg": "0 0 30px rgba(147, 51, 234, 0.5)",
      },
    },
  },
  plugins: [],
};
