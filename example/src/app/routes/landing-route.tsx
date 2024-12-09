import { FlexColumn, FlexRow, FlexSpacer } from "@/ui/layout/flexbox";
import { Box, Card, Typography } from "@mui/material";

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

export const LandingRoute = () => {
  return (
    <FlexColumn padding={10}>
      <Typography variant="h1">Hello, world!</Typography>
      <Typography variant="body1"> Welcome to the landing page.</Typography>

      <Card sx={{ margin: 5 }}>
        <FlexRow padding={2} spacing={5}>
          <BoxAndText color="primary.main" />
          <BoxAndText color="primary.light" />
          <BoxAndText color="primary.dark" />
          <FlexSpacer />

          <BoxAndText color="secondary.main" />
          <BoxAndText color="secondary.light" />
          <BoxAndText color="secondary.dark" />
        </FlexRow>
      </Card>
    </FlexColumn>
  );
};
