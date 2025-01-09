import { OcrTypography } from "@/ui/typography/ocr-typography";
import { Box } from "@mui/material";

export const EmptyNoteList = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <OcrTypography variant="h6" color="textSecondary">
        No notes found
      </OcrTypography>
    </Box>
  );
};
