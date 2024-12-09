import { createTheme } from "@mui/material/styles";

export const themeColors = {
  background: "#f2f2f7",
  white: "#ffffff",
  black: "#08080a",
  brand: {
    slateBlue: "#736CED",
    tropicalIndigo: "#9F9FED",
    thistle: "#D4C1EC",
    champagnePink: "#F2DFD7",
    spaceCadet: "#2E294E",
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: themeColors.brand.slateBlue,
    },
    secondary: {
      main: themeColors.brand.tropicalIndigo,
    },
    background: {
      default: themeColors.background,
      paper: themeColors.white,
    },
    text: {
      primary: themeColors.black,
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});
