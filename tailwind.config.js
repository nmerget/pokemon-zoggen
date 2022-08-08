module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      padding: {
        '8.5': '34px',
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
