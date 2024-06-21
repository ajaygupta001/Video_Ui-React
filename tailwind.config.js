module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        customBlue: '#1d75bb',
        cutomhover: '#061f5c',
        customLightGray: '#f7f7f7',
       
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
]
}
