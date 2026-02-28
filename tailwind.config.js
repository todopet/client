/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#4195f5",
          muted: "#adadad",
          border: "#c9c9c9",
        },
      },
      spacing: {
        18: "4.5rem",
      },
      borderRadius: {
        xl2: "1rem",
      },
      animation: {
        "toast-in": "toastFadeIn 0.35s ease-out forwards",
        "toast-out": "toastFadeOut 0.35s ease-in forwards",
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
