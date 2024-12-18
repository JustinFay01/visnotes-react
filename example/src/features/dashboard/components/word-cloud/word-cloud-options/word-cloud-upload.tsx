import { FlexColumn, FlexRow, FlexSpacer } from "@/ui/layout/flexbox";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Button } from "@mui/material";
import { useRef } from "react";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { OcrDropzoneRef, OcrDropzone } from "@/ui/components/form/dropzone";

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
  onSubmit?: () => Promise<void>;
};

export const WordCloudUpload = ({
  files,
  setFiles,
  onSubmit,
}: WordCloudUploadProps) => {
  const dropzoneRef = useRef<OcrDropzoneRef>(null); // Ref to access the dropzone's `open` method
  const [loading, setLoading] = useState(false);

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
        <FlexRow>
          <LoadingButton
            onClick={() => {
              setLoading(true);
              onSubmit?.().finally(() => {
                setLoading(false);
              });
            }}
            variant="outlined"
            sx={{ margin: 2 }}
            loading={loading}
          >
            Analyze
          </LoadingButton>
          <FlexSpacer />
          <Button
            onClick={() => {
              dropzoneRef.current?.open();
            }}
            variant="outlined"
            sx={{ margin: 2 }}
          >
            Browse
          </Button>
        </FlexRow>
      </FlexColumn>
    </OcrDropzone>
  );
};
