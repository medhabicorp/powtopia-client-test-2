const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6504b5',
        secondary: '#383838',
        info:'#6e6b6b'
      }
    },
  },
  plugins: [],
});
