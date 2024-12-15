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
        <FlexColumn
          sx={{
            transition: "all 1s ease-out",
          }}
        >
          {inputType === "text" ? (
            <>
              <Typography variant="h5">Text</Typography>
              <Typography variant="body1">
                Copy and paste or write out the words you would like to use to
                generate your wordcloud!
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h5">Upload Image</Typography>
              <Typography>
                Upload your image by dragging your file or clicking the button
                below.
              </Typography>
            </>
          )}
        </FlexColumn>

        <Tabs
          value={inputType === "image" ? 0 : 1}
          onChange={(_, nv) => handleChange(nv)}
          aria-label="basic tabs example"
        >
          <Tab label="Upload" />
          <Tab label="Text" />
        </Tabs>
        {inputType === "text" ? <WordCloudTextBox /> : <WordCloudUpload />}
      </Grid2>
      <Grid2 size={6}>
        <WordCloudForm {...formProps} />
      </Grid2>
    </Grid2>
  );
};
