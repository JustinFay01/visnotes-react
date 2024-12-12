import { CloudUpload } from "@mui/icons-material";
import React, { useCallback } from "react";
import { Accept, FileRejection, useDropzone } from "react-dropzone";
import { Box } from "@mui/material";

interface OcrDropzoneProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  accept?: Accept;
  handleAcceptedFiles?: (files: File[]) => void;
  handleRejectedFiles?: (files: FileRejection[]) => void;
}

const OcrDropzone: React.FC<OcrDropzoneProps> = ({
  className,
  children,
  style,
  accept,
  handleAcceptedFiles,
  handleRejectedFiles,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections?.length) {
        handleRejectedFiles?.(fileRejections);
        return;
      }

      if (acceptedFiles?.length) {
        handleAcceptedFiles?.(acceptedFiles);
      }
    },
    [handleAcceptedFiles, handleRejectedFiles]
  );

  const { getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    accept: accept,
  });

  return (
    <Box
      aria-label="file dropzone"
      className={className}
      style={style}
      sx={{
        border: "1px dashed",
        borderColor: isDragActive ? "primary.main" : "grey.500",
        borderRadius: 1,
        p: 2,
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {children}

      <Box>
        <CloudUpload />
        Drop files to upload
      </Box>
    </Box>
  );
};

export default OcrDropzone;
