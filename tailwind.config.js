// https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
    "./public/**/*.js",
  ],
  theme: {
    screens: {
      sm: "492px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        redx: "hsl(12, 88%, 59%)",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [

    // https://tailwindcss.com/docs/typography-plugin
    require("@tailwindcss/typography"),

    // https://github.com/tailwindlabs/tailwindcss-forms
    require("@tailwindcss/forms"),

    // https://github.com/tailwindlabs/tailwindcss-line-clamp
    require("@tailwindcss/line-clamp"),

    // https://github.com/tailwindlabs/tailwindcss-aspect-ratio
    require("@tailwindcss/aspect-ratio"),
  ],
  darkMode: "class",
  // prefix: 'tw-',
  // important: true,
};

// // On page load or when changing themes, best to add inline in `head` to avoid FOUC
// if (localStorage.theme === 'dark' ||
//   (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
//   document.documentElement.classList.add('dark')
// } else {
//   document.documentElement.classList.remove('dark')
// }

// // Whenever the user explicitly chooses light mode
// localStorage.theme = 'light'

// // Whenever the user explicitly chooses dark mode
// localStorage.theme = 'dark'

// // Whenever the user explicitly chooses to respect the OS preference
// localStorage.removeItem('theme')
