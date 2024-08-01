/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  separator: '_',
  content: [
    "./index.html",
    // "./tailwind_always_compile.html", // For always compile some class
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        '1': '1',
        '2': '2',
        '301': '301',
        '1051': '1051',
        '1052': '1052',
      },
    },
  },
  plugins: [],
}
