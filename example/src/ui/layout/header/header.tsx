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

  //TODO: Add user context
  return (
    <AppBar position="static">
      <Toolbar>
        <OcrTypography variant="h6" fontWeight={"bold"}>
          OCR
        </OcrTypography>
        <FlexSpacer />
        <FlexRow gap={2}>
          <Button variant="text" href="/dashboard" sx={{ fontWeight: "bold" }}>
            Dashboard
          </Button>
          <Button variant="text" href="/notes" sx={{ fontWeight: "bold" }}>
            notes
          </Button>
          <IconButton
            aria-activedescendant="toggle-theme"
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
          <Button variant="outlined" href="/login">
            Login
          </Button>
        </FlexRow>
      </Toolbar>
    </AppBar>
  );
};
