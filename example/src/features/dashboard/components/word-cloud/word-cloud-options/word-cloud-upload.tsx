import { FlexColumn } from "@/ui/layout/flexbox";
import { Typography } from "@mui/material";

export const WordCloudUpload = () => {
  const TextHeader = () => {
    return (
      <FlexColumn>
        <Typography variant="h6">Type Text</Typography>
        <Typography variant="subtitle1">
          Paste or type your text in the text area below
        </Typography>
      </FlexColumn>
    );
  };
  return (
    <FlexColumn>
      <FlexColumn>
        <Typography variant="h6">Upload Image</Typography>
        <Typography variant="subtitle1">
          Upload an image to generate a word cloud
        </Typography>
      </FlexColumn>
      WordCloud Upload Holder
    </FlexColumn>
  );
};
