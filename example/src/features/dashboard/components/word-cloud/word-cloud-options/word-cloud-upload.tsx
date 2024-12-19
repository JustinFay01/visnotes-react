import { FlexColumn, FlexRow, FlexSpacer } from "@/ui/layout/flexbox";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Box, Button, Card, Grid2, Typography } from "@mui/material";
import { useRef } from "react";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { OcrDropzoneRef, OcrDropzone } from "@/ui/components/form/dropzone";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const convertBytes = (to: "KB" | "MB" | "GB", bytes: number) => {
  const units = ["B", "KB", "MB", "GB"];
  const index = units.indexOf(to);
  return bytes / Math.pow(1024, index);
};

const Files = ({ files }: { files: File[] }) => {
  return (
    <FlexColumn
      sx={{
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {files.map((file) => (
        <Card
          key={file.name}
          sx={{
            padding: 2,
            marginBottom: 2,
            width: "100%",
            display: "flex",
            justifyContent: "space-between", // Evenly spaces child items
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <InsertDriveFileIcon />
            <Typography>{file.name}</Typography>
            {file.lastModified && (
              <Typography>
                {new Date(file.lastModified).toLocaleString()}
              </Typography>
            )}
          </Box>
          <Typography>
            {`${convertBytes("KB", file.size).toFixed(2)} KB`}
          </Typography>
          {`${convertBytes("KB", file.size).toFixed(2)} KB`}
        </Card>
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
          width: "100%",
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
