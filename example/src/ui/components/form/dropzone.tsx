import { CloudUpload } from "@mui/icons-material";
import React, { useCallback } from "react";
import { Accept, FileRejection, useDropzone } from "react-dropzone";
import styles from "./dropzone.module.scss";
import { Box } from "@mui/material";

interface DropzoneProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  accept?: Accept;
  handleAcceptedFiles?: (files: File[]) => void;
  handleRejectedFiles?: (files: FileRejection[]) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({
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
      className={`${className ?? ""} ${
        isDragActive ? styles.active : styles.inactive
      } ${styles.dropzone}`}
      {...getRootProps({
        style: { ...style },
      })}
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

export default Dropzone;
