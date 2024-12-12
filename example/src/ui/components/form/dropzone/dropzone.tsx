import { CloudUpload } from "@mui/icons-material";
import React, { useCallback } from "react";
import { Accept, FileRejection, useDropzone } from "react-dropzone";
import { Box } from "@mui/material";
import "./dropzone.css";

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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    accept: accept,
  });

  return (
    <Box
      aria-label="file dropzone"
      className={`dropzone ${className ?? ""} ${
        isDragActive ? "active" : "inactive"
      }`}
      {...getRootProps({
        style: { ...style },
      })}
    >
      <input {...getInputProps()} />
      {children}

      <Box className={`message ${isDragActive ? "visible" : ""}`}>
        <CloudUpload />
        Drop files to upload
      </Box>
    </Box>
  );
};

export default OcrDropzone;
