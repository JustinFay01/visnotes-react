import { FlexColumn } from "@/ui/layout/flexbox";
import { ErrorRouteBase } from "@/ui/layout/route-base";
import { OcrTypography } from "@/ui/typography/ocr-typography";
import { Button } from "@mui/material";

export const NotFoundRoute = () => {
  return (
    <ErrorRouteBase>
      <FlexColumn
        padding={10}
        gap={2}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <OcrTypography variant="h1">404 Not Found</OcrTypography>
        <Button variant="contained" href="/">
          Go Home
        </Button>
      </FlexColumn>
    </ErrorRouteBase>
  );
};
