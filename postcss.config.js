module.exports = {
  plugins: {
    tailwindcss: {
      purge: [
        "widget/**/*.svelte",
        "widget/theme.css"
      ],
      darkMode: 'class',
      variants: {
        extend: {
          outline: ['dark']
        }
      },
      plugins: [
        require('@tailwindcss/forms')
      ]
    },
    autoprefixer: {},
  },
};
