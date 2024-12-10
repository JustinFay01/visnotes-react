import { FlexColumn, FlexRow, FlexSpacer } from "@/ui/layout/flexbox";
import { Typography, Card } from "@mui/material";
import { BoxAndText } from "../landing-view";

export const MuiThemeExample = () => {
  return (
    <FlexColumn spacing={2}>
      <Typography variant="h2">Color Examples</Typography>

      <Typography variant="h3">Primary Colors</Typography>
      <Typography variant="body1">Custom defined</Typography>
      <Card>
        <FlexRow padding={2} spacing={5} sx={{ overflow: "auto" }}>
          <BoxAndText color="primary.main" />
          <BoxAndText color="primary.light" />
          <BoxAndText color="primary.dark" />
          <FlexSpacer />

          <BoxAndText color="secondary.main" />
          <BoxAndText color="secondary.light" />
          <BoxAndText color="secondary.dark" />
        </FlexRow>
      </Card>

      <FlexSpacer />

      <Typography variant="h3">Mui Defined Examples</Typography>
      <Card>
        <FlexRow padding={2} spacing={5} sx={{ overflow: "auto" }}>
          <BoxAndText color="warning.main" />
          <BoxAndText color="error.main" />
          <BoxAndText color="info.main" />
          <BoxAndText color="success.main" />
        </FlexRow>
      </Card>
    </FlexColumn>
  );
};
