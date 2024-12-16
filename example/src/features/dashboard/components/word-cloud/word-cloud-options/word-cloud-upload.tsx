import OcrDropzone from "@/ui/components/form/dropzone/dropzone";
import { FlexColumn } from "@/ui/layout/flexbox";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Button } from "@mui/material";
import { useRef } from "react";

const Files = ({ files }: { files: File[] }) => {
  return (
    <FlexColumn>
      {files.map((file) => (
        <div key={file.name}>{file.name}</div>
      ))}
    </FlexColumn>
  );
};

type WordCloudUploadProps = {
  files: File[];
  setFiles: (files: File[]) => void;
};

export const WordCloudUpload = ({ files, setFiles }: WordCloudUploadProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dropzoneRef = useRef<any>(null); // Ref to access the dropzone's `open` method

  return (
    <OcrDropzone
      sx={{ border: "2px dashed", borderColor: "primary.main" }}
      handleAcceptedFiles={(acceptedFiles) => setFiles(acceptedFiles)}
      ref={dropzoneRef}
    >
      <FlexColumn
        spacing={3}
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {files.length > 0 ? (
          <Files files={files} />
        ) : (
          <FileUploadIcon fontSize="large" sx={{ color: "primary.main" }} />
        )}
        <Button
          onClick={() => {
            dropzoneRef.current?.open();
          }}
          variant="outlined"
          sx={{ margin: 2 }}
        >
          Browse Files
        </Button>
      </FlexColumn>
    </OcrDropzone>
  );
};
