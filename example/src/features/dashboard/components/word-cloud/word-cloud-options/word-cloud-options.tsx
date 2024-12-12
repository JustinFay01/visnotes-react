import { Grid2 } from "@mui/material";
import { WordCloudForm, WordCloudFormProps } from "./word-cloud-form";
import { WordCloudUpload } from "./word-cloud-upload";

type WordCloudOptionsProps = WordCloudFormProps & {
  inputType: "text" | "image";
};

export const WordCloudOptions = (props: WordCloudOptionsProps) => {
  const formProps = props;
  const { inputType } = props;

  return (
    <Grid2
      container
      spacing={5}
      sx={{
        backgroundColor: "primary.main",
      }}
    >
      <Grid2 size={6}>
        {inputType !== "text" ? null : <WordCloudUpload />}
      </Grid2>
      <Grid2 size={6}>
        <WordCloudForm {...formProps} />
      </Grid2>
    </Grid2>
  );
};
