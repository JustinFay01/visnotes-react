import { paths } from "@/lib/path";
import { OcrTypography } from "@/ui/typography/ocr-typography";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  useColorScheme,
  useMediaQuery,
} from "@mui/material";
import { FlexRow, FlexSpacer } from "../flexbox";
import { useAuth0 } from "@auth0/auth0-react";

const useCurrentTheme = (mode: string | undefined): string => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  if (mode === "dark") {
    return "dark";
  } else if (mode === "light") {
    return "light";
  } else if (mode === "system") {
    if (prefersDarkMode) {
      return "dark";
    }
    return "light";
  }
  return prefersDarkMode ? "dark" : "light";
};

export const Header = () => {
  const { mode, setMode } = useColorScheme();
  const currentTheme = useCurrentTheme(mode);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const textSx = {
    fontWeight: "bold",
    color: currentTheme === "dark" ? "text.primary" : "white",
  };
  //TODO: Add mobile header as a drawer for other pages

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          backgroundColor: "primary.main",
        }}
      >
        <OcrTypography variant="h6" fontWeight={"bold"}>
          OCR
        </OcrTypography>
        <FlexSpacer />
        <FlexRow gap={2}>
          <Button
            variant="text"
            href={paths.app.dashboard.getHref()}
            sx={textSx}
          >
            Dashboard
          </Button>
          <Button variant="text" href={paths.app.notes.getHref()} sx={textSx}>
            notes
          </Button>
          <Button
            variant="text"
            href={paths.app.wordcloud.getHref()}
            sx={textSx}
          >
            WordCloud
          </Button>
          <Tooltip title="Toggle Theme" placement="bottom" arrow>
            <IconButton
              aria-activedescendant="toggle-theme"
              sx={textSx}
              onClick={() => {
                setMode(currentTheme === "dark" ? "light" : "dark");
              }}
            >
              {currentTheme === "dark" ? (
                <LightModeOutlinedIcon />
              ) : (
                <DarkModeOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>
          {isAuthenticated ? (
            <FlexRow>
              <Avatar alt={user?.given_name} src={user?.picture} />
              <Button variant="outlined" sx={textSx} onClick={() => logout()}>
                Logout
              </Button>
            </FlexRow>
          ) : (
            <Button
              variant="outlined"
              sx={{
                ...textSx,
                fontWeight: "bold",
                border: "2px solid",
              }}
              onClick={() => loginWithRedirect()}
            >
              Login
            </Button>
          )}
        </FlexRow>
      </Toolbar>
    </AppBar>
  );
};
