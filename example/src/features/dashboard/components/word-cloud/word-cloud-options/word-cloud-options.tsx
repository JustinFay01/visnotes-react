import { Grid2, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { WordCloudForm, WordCloudFormProps } from "./word-cloud-form";
import { WordCloudTextBox } from "./word-cloud-text-box";
import { WordCloudUpload } from "./word-cloud-upload";
import { FlexColumn } from "@/ui/layout/flexbox";

type WordCloudOptionsProps = WordCloudFormProps;

export const WordCloudOptions = (props: WordCloudOptionsProps) => {
  const formProps = props;
  const [inputType, setInputType] = useState<"text" | "image">("image");

  const handleChange = (newValue: number) => {
    switch (newValue) {
      case 0:
        setInputType("image");
        break;
      case 1:
        setInputType("text");
        break;
    }
  };

  return (
    <Grid2 container spacing={5}>
      <Grid2 size={6}>
        <Tabs
          value={inputType === "image" ? 0 : 1}
          onChange={(_, newValue) => handleChange(newValue)}
          aria-label="word cloud input type"
        >
          <Tab label="Upload" />
          <Tab label="Text" />
        </Tabs>
        <FlexColumn>
          <FlexColumn sx={{ marginBottom: 3 }}>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
              Upload Image
            </Typography>
            <Typography>
              Upload your image by dragging your file or clicking the button
              below.
            </Typography>
          </FlexColumn>

          <WordCloudUpload />
        </FlexColumn>
      </Grid2>
      <Grid2 size={6}>
        <WordCloudForm {...formProps} />
      </Grid2>
    </Grid2>
  );
};
