import { OcrTypography } from "@/ui/typography/ocr-typography";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  useColorScheme,
} from "@mui/material";
import { FlexRow, FlexSpacer } from "../flexbox";
export const Header = () => {
  const { mode, setMode } = useColorScheme();

  const textSx = {
    fontWeight: "bold",
    color: mode === "dark" ? "text.primary" : "white",
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
          <Button variant="text" href="/dashboard" sx={textSx}>
            Dashboard
          </Button>
          <Button variant="text" href="/notes" sx={textSx}>
            notes
          </Button>
          <Button variant="text" href="/" sx={textSx}>
            WordCloud
          </Button>
          <IconButton
            aria-activedescendant="toggle-theme"
            sx={textSx}
            onClick={() => {
              setMode(mode === "dark" ? "light" : "dark");
            }}
          >
            {mode === "dark" ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </IconButton>
          <Button
            variant="outlined"
            href="/login"
            sx={{
              ...textSx,
              fontWeight: "bold",
              border: "2px solid",
            }}
          >
            Login
          </Button>
        </FlexRow>
      </Toolbar>
    </AppBar>
  );
};
