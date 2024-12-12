import { FlexColumn, FlexRow, FlexSpacer } from "@/ui/layout/flexbox";
import { Typography } from "@mui/material";

type WordCloudOptionsHeaderProps = {
  type: "text" | "image";
};
export const WordCloudOptionsHeader = ({
  type,
}: WordCloudOptionsHeaderProps) => {
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

  const ImageHeader = () => {
    return (
      <FlexColumn>
        <Typography variant="h6">Upload Image</Typography>
        <Typography variant="subtitle1">
          Upload an image to generate a word cloud
        </Typography>
      </FlexColumn>
    );
  };
  return (
    <FlexRow>
      {type === "text" ? <TextHeader /> : <ImageHeader />}
      <FlexSpacer />
      <FlexColumn>
        <Typography variant="h6">Options</Typography>
        <Typography variant="subtitle1">
          Customize your word cloud with the options below
        </Typography>
      </FlexColumn>
    </FlexRow>
  );
};
