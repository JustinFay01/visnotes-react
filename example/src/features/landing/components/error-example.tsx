import { FlexColumn, FlexRow } from "@/ui/layout/flexbox";
import { Typography, Card, Button } from "@mui/material";
import { useErrorBoundary } from "react-error-boundary";

export const ErrorExample = () => {
  const { showBoundary } = useErrorBoundary();

  return (
    <FlexColumn>
      <Typography variant="h2">Error Boundary Example</Typography>
      <Typography variant="body1">
        Click the button to simulate an error
      </Typography>
      <Card>
        <FlexRow padding={2} spacing={5} sx={{ overflow: "auto" }}>
          <Button
            variant="contained"
            onClick={() => {
              showBoundary(new Error("You just threw an error!"));
            }}
          >
            Simulate Error
          </Button>
        </FlexRow>
      </Card>
    </FlexColumn>
  );
};
