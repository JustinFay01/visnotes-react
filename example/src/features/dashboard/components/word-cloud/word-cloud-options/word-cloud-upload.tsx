import OcrDropzone from "@/ui/components/form/dropzone/dropzone";
import { FlexColumn } from "@/ui/layout/flexbox";
import FileUploadIcon from "@mui/icons-material/FileUpload";

export const WordCloudUpload = () => {
  return (
    <OcrDropzone sx={{ border: "2px dashed", borderColor: "primary.main" }}>
      <FlexColumn
        spacing={3}
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FileUploadIcon fontSize="large" sx={{ color: "primary.main" }} />
      </FlexColumn>
    </OcrDropzone>
  );
};
