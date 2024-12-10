import { FlexColumn } from "@/ui/layout/flexbox";
import { Box, Typography } from "@mui/material";
import { ErrorExample } from "./components/error-example";
import { MuiThemeExample } from "./components/mui-theme-example";

export const ColorBox = ({ color }: { color: string }) => {
  return (
    <Box
      sx={{
        backgroundColor: color,
        height: 100,
        width: 100,
        padding: 2,
        borderRadius: 1,
      }}
    />
  );
};

export const BoxAndText = ({ color }: { color: string }) => {
  const colorString = color.toUpperCase();

  return (
    <FlexColumn>
      <ColorBox color={color} />
      <Typography variant="body1">{colorString}</Typography>
    </FlexColumn>
  );
};

export const LandingView = () => {
  return (
    <FlexColumn
      padding={10}
      height="100vh"
      sx={{
        minWidth: 700,
        minHeight: 700,
      }}
    >
      <Typography variant="h1">Hello, world!</Typography>
      <Typography variant="body1"> Welcome to the landing page.</Typography>

      <FlexColumn margin={5} spacing={5}>
        <MuiThemeExample />
        <ErrorExample />
      </FlexColumn>
    </FlexColumn>
  );
};
