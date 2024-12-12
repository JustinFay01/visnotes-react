import OcrDropzone from "@/ui/components/form/dropzone";
import { FlexColumn } from "@/ui/layout/flexbox";
import { Box, Typography } from "@mui/material";

export const WordCloudUpload = () => {
  return (
    <FlexColumn>
      <FlexColumn>
        <Typography variant="h6">Upload Image</Typography>
        <Typography variant="subtitle1">
          Upload an image to generate a word cloud
        </Typography>
      </FlexColumn>
      <OcrDropzone>
        <Box
          sx={{
            border: "1px dashed",
            borderColor: "grey.500",
            borderRadius: 1,
            p: 2,
            mt: 2,
          }}
        >
          <Typography variant="body2">Drop an image here</Typography>
        </Box>
      </OcrDropzone>
    </FlexColumn>
  );
};
