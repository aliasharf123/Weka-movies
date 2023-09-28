/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      backgroundColor: {
        'trans' : 'rgb(0, 0, 0,0.5)' ,
        'redColorTransparent': 'rgba(244,24,28,0.6)',
        'WhiteTransparent' : 'rgba(255,255,255,0.2)',
      },
      colors:{
        'redColor' : '#F4181C',
        'HeaderColor' : '#222425',
        'DetailBackground' : '#1D1F21',
        'SecondaryText': '#5C6064'
      }
    },
  },
  plugins: [],
}
