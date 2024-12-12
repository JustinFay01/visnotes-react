import { FlexRow, FlexSpacer } from "@/ui/layout/flexbox";
import { WordCloudForm, WordCloudFormProps } from "./word-cloud-form";
import { WordCloudUpload } from "./word-cloud-upload";

type WordCloudOptionsProps = WordCloudFormProps & {
  inputType: "text" | "image";
};

export const WordCloudOptions = (props: WordCloudOptionsProps) => {
  const formProps = props;
  const { inputType } = props;

  return (
    <FlexRow spacing={5}>
      {inputType === "text" ? <WordCloudUpload /> : null}
      <FlexSpacer />
      <WordCloudForm {...formProps} />
    </FlexRow>
  );
};
