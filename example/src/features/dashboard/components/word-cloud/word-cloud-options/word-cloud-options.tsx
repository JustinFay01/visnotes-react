import { Card } from "@mui/material";
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
