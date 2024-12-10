import { LandingView } from "@/features/landing/landing-view";
import { FlexColumn } from "@/ui/layout/flexbox";
import { Button, Typography } from "@mui/material";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

const LandingFallBack = ({ error }: FallbackProps) => {
  return (
    <FlexColumn padding={10} spacing={5}>
      <Typography variant="h5" color="error">
        Something went wrong: {error.message}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ width: 200 }}
        onClick={() => window.location.reload()}
      >
        Reload Page
      </Button>
    </FlexColumn>
  );
};

export const LandingRoute = () => {
  return (
    <ErrorBoundary
      FallbackComponent={LandingFallBack}
      onReset={() => window.location.reload()}
    >
      <LandingView />;
    </ErrorBoundary>
  );
};
