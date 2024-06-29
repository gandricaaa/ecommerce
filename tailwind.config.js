/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mainOrange": "#EDA415",
        "mainBlue": "#003F62",
        "mainGray": "#ACACAC",
        "secondBlue": "#1B5A7D",
        "mainWhite": "#FFFFFF",
        "mainBlack": "#292D32",
        "secondGray": "#D9D9D9",
        "thirdGray": "#ADADAD",
        "fourthGray": "#B6B6B6",
        "secondBlack": "#4A4A4A",
        "firstShadeBlue": "#E2F4FF",
        "secondShadeBlue": "#B3D4E5",
        "thirdShadeBlack": "#3A3A3A",
        "fourthShadeBlack": "#3B3B3B",
        "thirdShadeBlue": "#87BCD9",
        "fourthShadeBlue": "#265F7F",
        "fifthShadeGray": "#A5A5A5",
        "sixsthShadeGray": "#B5B5B5",
        "seventhShadeGray": "#BABABA",
        "fifthShadeBlack": "#272727",
        "fifthShadeBlue": "#316887",
        "eigthShadeGray": "#C8C8C8",
        "ninethShadeGray": "#D4D4D4",
        "tenthShadeGray": "#EAEAEA",
        "sixthShadeBlue": "#2E8FC5",
        "eleventhShadeGray": "#606060",
        "twelvethShadeGray": "#9D9D9D",
        "secondShadeOrange": "#EDA415",
        "secondShadeWhite": "#F4F4F4"

      }
    },
  },
  plugins: [],
}