const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "// Adjust based on your project structure\r\n    \"./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}\"",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|ripple|spinner).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
});
