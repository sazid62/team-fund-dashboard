/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#22c55e",
        brand2: "#60a5fa",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.2)"
      },
      borderRadius: {
        "2xl": "1rem"
      }
    },
  },
  plugins: [],
}
