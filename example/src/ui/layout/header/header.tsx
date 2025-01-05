import { OcrTypography } from "@/ui/typography/ocr-typography";
import { AppBar, Button, Toolbar } from "@mui/material";
import { FlexRow, FlexSpacer } from "../flexbox";

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <OcrTypography variant="h6" fontWeight={"bold"}>
          OCR
        </OcrTypography>
        <FlexSpacer />
        <FlexRow gap={2}>
          <Button variant="text" href="/dashboard">
            Dashboard
          </Button>
          <Button variant="contained" href="/login">
            Login
          </Button>
        </FlexRow>
      </Toolbar>
    </AppBar>
  );
};
