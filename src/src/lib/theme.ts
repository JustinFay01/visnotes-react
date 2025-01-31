import { createTheme } from "@mui/material/styles";

export const lightThemeColors = {
  background: "#f2f2f7",
  white: "#ffffff",
  black: "#121212",
  grey: "#8e8e93",
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

export const darkThemeColors = {
  background: "#121212", // Dark background
  paper: "#1e1e1e",
  onBackground: "#d8d8d8", // White text
  brand: {
    slateBlue: "#8A84EE", // primary
    thistle: "#C7B8E2", // on primary
    champagnePink: "#EACDC7", // Warmer tone for contrast
    spaceCadet: "#423C66", // Lightened for depth

    tropicalIndigo: "#9F9FED",
    ylmnBlue: "#464D77",
    lightBlue: "#A3BFFA",
  },
};

export const theme = createTheme({
  colorSchemes: {
    light: {
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
    },
    dark: {
      palette: {
        primary: {
          main: darkThemeColors.brand.slateBlue,
          light: darkThemeColors.brand.thistle,
          dark: darkThemeColors.brand.spaceCadet,
        },
        secondary: {
          main: darkThemeColors.brand.thistle,
          light: darkThemeColors.brand.lightBlue,
          dark: darkThemeColors.brand.ylmnBlue,
        },
        background: {
          default: darkThemeColors.background,
          paper: darkThemeColors.paper,
        },
        text: {
          primary: darkThemeColors.onBackground,
          secondary: darkThemeColors.brand.thistle,
        },
      },
    },
  },
});
