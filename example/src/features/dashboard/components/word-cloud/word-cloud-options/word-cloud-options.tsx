import { FlexColumn } from "@/ui/layout/flexbox";
import { Card, Grid2, Typography } from "@mui/material";
import { WordCloudForm, WordCloudFormProps } from "./word-cloud-form";

type WordCloudOptionsProps = WordCloudFormProps;

export const WordCloudOptions = (props: WordCloudOptionsProps) => {
  const formProps = props;

  return (
    <Card>
      <WordCloudForm {...formProps} />
    </Card>
  );
};
