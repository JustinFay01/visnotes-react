import { FlexColumn, FlexRow, FlexSpacer } from "@/ui/layout/flexbox";
import { Typography, Card, Box } from "@mui/material";

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

export const BoxAndText = ({
  color,
  label,
}: {
  color: string;
  label: string;
}) => {
  return (
    <FlexColumn>
      <ColorBox color={color} />
      <Typography variant="body1">{label}</Typography>
    </FlexColumn>
  );
};

export const MuiThemeExample = () => {
  return (
    <FlexColumn spacing={4} padding={3}>
      <Typography variant="h2">Color Examples</Typography>

      <Typography variant="body1">Custom Defined Colors</Typography>
      <Card sx={{ padding: 2 }}>
        <FlexRow spacing={3} sx={{ overflowX: "auto" }}>
          <BoxAndText color="primary.main" label="Primary Main" />
          <BoxAndText color="primary.light" label="Primary Light" />
          <BoxAndText color="primary.dark" label="Primary Dark" />
          <BoxAndText color="secondary.main" label="Secondary Main" />
          <BoxAndText color="secondary.light" label="Secondary Light" />
          <BoxAndText color="secondary.dark" label="Secondary Dark" />
        </FlexRow>
      </Card>

      <FlexSpacer />

      <Typography variant="body1">Material UI Extra Colors</Typography>
      <Card sx={{ padding: 2 }}>
        <FlexRow spacing={3} sx={{ overflowX: "auto" }}>
          <BoxAndText color="warning.main" label="Warning Main" />
          <BoxAndText color="error.main" label="Error Main" />
          <BoxAndText color="info.main" label="Info Main" />
          <BoxAndText color="success.main" label="Success Main" />
        </FlexRow>
      </Card>
    </FlexColumn>
  );
};

export default MuiThemeExample;
