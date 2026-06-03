/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"]
      },
      colors: {
        ink: "#10213b",
        navy: "#071f3a",
        panel: "#f8fbff",
        line: "#d8e2ef",
        blue: "#1f6feb",
        green: "#52ad46",
        amber: "#d6a52d",
        orange: "#e96922"
      },
      boxShadow: {
        soft: "0 12px 40px rgba(16, 33, 59, 0.10)",
        rail: "inset 0 0 0 1px rgba(216, 226, 239, 0.92)"
      }
    }
  },
  plugins: []
};
