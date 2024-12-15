import OcrDropzone from "@/ui/components/form/dropzone/dropzone";
import { FlexColumn } from "@/ui/layout/flexbox";
import { Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";

export const WordCloudUpload = () => {
  return (
    <OcrDropzone>
      <FlexColumn
        spacing={3}
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FileUploadIcon
          fontSize="large"
          sx={{
            color: "primary.main",
          }}
        />
        <Button variant="outlined">Browse Files</Button>
      </FlexColumn>
    </OcrDropzone>
  );
};
