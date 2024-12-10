import { FlexColumn } from "@/ui/layout/flexbox";
import { Divider, Typography } from "@mui/material";
import { ErrorExample } from "./components/error-example";
import { MuiThemeExample } from "./components/mui-theme-example";

export const LandingView = () => {
  return (
    <FlexColumn
      margin={5}
      height="100vh"
      sx={{
        minWidth: 700,
        minHeight: 700,
      }}
    >
      <Typography variant="h1">Hello, world!</Typography>
      <Typography variant="body1"> Welcome to the landing page.</Typography>
      <Divider />
      <FlexColumn spacing={5} padding={5}>
        <MuiThemeExample />
        <Divider />
        <ErrorExample />
      </FlexColumn>
    </FlexColumn>
  );
};
