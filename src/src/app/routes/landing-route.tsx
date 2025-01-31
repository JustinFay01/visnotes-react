import { LandingView } from "@/features/landing/landing-view";
import { FlexColumn } from "@/ui/layout/flexbox";
import { Box, Button, Typography } from "@mui/material";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const LandingFallback = ({ error }: FallbackProps) => {
  return (
    <FlexColumn
      padding={10}
      spacing={5}
      alignItems="center"
      justifyContent="center"
    >
      <ErrorOutlineIcon color="error" sx={{ fontSize: 80 }} />

      <Typography variant="h5" color="error" align="center" gutterBottom>
        Oops! Something went wrong.
      </Typography>

      <Typography variant="body1" color="textSecondary" align="center">
        {error.message || "An unexpected error has occurred."}
      </Typography>

      <Box display="flex" gap={2} marginTop={3}>
        <Button
          variant="contained"
          color="primary"
          sx={{ minWidth: 150 }}
          onClick={() => window.location.reload()}
        >
          Reload Page
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          sx={{ minWidth: 150 }}
          onClick={() => {
            alert("We're on it! Thanks for reporting.");
          }}
        >
          Report Issue
        </Button>
      </Box>
    </FlexColumn>
  );
};

export const LandingRoute = () => {
  return (
    <ErrorBoundary
      FallbackComponent={LandingFallback}
      onReset={() => window.location.reload()}
    >
      <LandingView />;
    </ErrorBoundary>
  );
};
