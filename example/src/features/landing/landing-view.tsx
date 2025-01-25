import { paths } from "@/lib/path";
import { FlexColumn } from "@/ui/layout/flexbox";
import { Button, Divider, Typography } from "@mui/material";

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
      <Typography
        variant="h1"
        component={"h1"}
        fontWeight={"bold"}
        gutterBottom
      >
        Welcome to the OCR App
      </Typography>

      <Divider sx={{ width: "100%" }} />

      <Typography variant="h2" component={"h2"} gutterBottom>
        Real landing page coming soon
      </Typography>

      <Button
        variant="contained"
        color="primary"
        href={paths.app.dashboard.getHref()}
      >
        Go to Dashboard
      </Button>
    </FlexColumn>
  );
};
