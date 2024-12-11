import { createTheme } from "@mui/material/styles";

export const themeColors = {
  background: "#f2f2f7",
  white: "#ffffff",
  black: "#08080a",
  brand: {
    slateBlue: "#736CED",
    thistle: "#D4C1EC",
    champagnePink: "#F2DFD7",
    spaceCadet: "#2E294E",

    tropicalIndigo: "#9F9FED",
    ylmnBlue: "#464D77",
    lightBlue: "#A3BFFA",
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: themeColors.brand.slateBlue,
      light: themeColors.brand.thistle,
      dark: themeColors.brand.spaceCadet,
    },
    secondary: {
      main: themeColors.brand.tropicalIndigo,
      light: themeColors.brand.lightBlue,
      dark: themeColors.brand.ylmnBlue,
    },
    background: {
      default: themeColors.background,
      paper: themeColors.brand.champagnePink,
    },
    text: {
      primary: themeColors.black,
    },
  },
});
