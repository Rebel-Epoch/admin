/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/preline/preline.js", // Ensures Tailwind works in all components
  ],
  theme: {},
  plugins: [require("preline/plugin")],
};
