import { FlexColumn } from "@/ui/layout/flexbox";
import { Typography } from "@mui/material";

export const LandingRoute = () => {
  return (
    <FlexColumn>
      <Typography variant="h1">Hello, world!</Typography>
      <Typography variant="body1"> Welcome to the landing page.</Typography>
    </FlexColumn>
  );
};
