import { FlexColumn } from "@/ui/layout/flexbox";
import { Card, Grid2, Typography } from "@mui/material";
import { WordCloudForm, WordCloudFormProps } from "./word-cloud-form";
import { WordCloudUpload } from "./word-cloud-upload";

type WordCloudOptionsProps = WordCloudFormProps & {
  files: File[];
  setFiles: (files: File[]) => void;
  onSubmit?: () => Promise<void>;
};

export const WordCloudOptions = (props: WordCloudOptionsProps) => {
  const formProps = props;
  const { files, setFiles, onSubmit } = props;

  return (
    <Grid2 container spacing={5}>
      <Grid2 size={{ sm: 12, md: 6 }}>
        <FlexColumn>
          <Card>
            <FlexColumn padding={2} spacing={2} sx={{ marginBottom: 3 }}>
              <Typography variant="h5" sx={{ marginTop: 2 }}>
                Upload Image
              </Typography>
              <Typography>
                Upload your image by dragging your file or clicking the button
                below.
              </Typography>
              <WordCloudUpload
                files={files}
                setFiles={setFiles}
                onSubmit={onSubmit}
              />
            </FlexColumn>
          </Card>
        </FlexColumn>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Card>
          <WordCloudForm {...formProps} />
        </Card>
      </Grid2>
    </Grid2>
  );
};
