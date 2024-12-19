import { createTheme } from "@mui/material/styles";

export const lightThemeColors = {
  background: "#f2f2f7",
  white: "#ffffff",
  black: "#121212",
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

const lightTheme = createTheme({
  palette: {
    primary: {
      main: lightThemeColors.brand.slateBlue,
      light: lightThemeColors.brand.thistle,
      dark: lightThemeColors.brand.spaceCadet,
    },
    secondary: {
      main: lightThemeColors.brand.tropicalIndigo,
      light: lightThemeColors.brand.lightBlue,
      dark: lightThemeColors.brand.ylmnBlue,
    },
    background: {
      default: lightThemeColors.background,
      paper: lightThemeColors.white,
    },
    text: {
      primary: lightThemeColors.black,
    },
  },
});

export const darkThemeColors = {
  background: "#121212", // Dark background
  white: "#ffffff", // Unchanged for contrast
  black: "#000000", // True black for accents
  brand: {
    slateBlue: "#8A84EE", // Slightly brighter for better visibility
    thistle: "#C7B8E2", // Softened for a dark background
    champagnePink: "#EACDC7", // Warmer tone for contrast
    spaceCadet: "#423C66", // Lightened for depth
    tropicalIndigo: "#B0B0F7", // Slightly brighter for visibility
    ylmnBlue: "#5C6289", // Adjusted for contrast
    lightBlue: "#BAC5FF", // Softer light blue for dark mode
  },
};

const darkTheme = createTheme({
  colorSchemes: {
    dark: true,
  },
  palette: {
    primary: {
      main: darkThemeColors.brand.slateBlue,
      light: darkThemeColors.brand.thistle,
      dark: darkThemeColors.brand.spaceCadet,
    },
    secondary: {
      main: darkThemeColors.brand.tropicalIndigo,
      light: darkThemeColors.brand.lightBlue,
      dark: darkThemeColors.brand.ylmnBlue,
    },
    background: {
      default: darkThemeColors.background,
      paper: darkThemeColors.white,
    },
    text: {
      primary: darkThemeColors.white,
    },
  },
});

export const createAppTheme = (mode: "light" | "dark") =>
  mode === "light" ? lightTheme : darkTheme;
