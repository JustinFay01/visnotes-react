import { CloudUpload } from "@mui/icons-material";
import React, { useCallback } from "react";
import { Accept, FileRejection, useDropzone } from "react-dropzone";
import { Box, styled } from "@mui/material";
import "./dropzone.css";
import { WithSx } from "@/ui/props";

type OcrDropzoneProps = WithSx & {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  accept?: Accept;
  handleAcceptedFiles?: (files: File[]) => void;
  handleRejectedFiles?: (files: FileRejection[]) => void;
};

const StyledDropzone = styled(Box)<{ isDragActive: boolean }>(
  ({ theme, isDragActive }) => ({
    border: `2px solid ${
      isDragActive ? theme.palette.primary.main : "transparent"
    }`,
    backgroundColor: isDragActive
      ? theme.palette.action.hover
      : theme.palette.background.default,
    transition: "border 0.2s ease-out, background-color 0.2s ease-out",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  })
);

const StyledMessage = styled(Box)<{ isDragActive: boolean }>(
  ({ theme, isDragActive }) => ({
    color: theme.palette.text.secondary,
    display: isDragActive ? "block" : "none",
    textAlign: "center",
    marginTop: theme.spacing(2),
  })
);

const OcrDropzone: React.FC<OcrDropzoneProps> = ({
  className,
  children,
  style,
  accept,
  sx,
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
    <StyledDropzone
      className={`dropzone ${className ?? ""}`}
      isDragActive={isDragActive}
      {...getRootProps({
        style,
      })}
      sx={sx} // Users can pass the sx prop to extend or override styles
    >
      <input {...getInputProps()} />
      {children}

      <StyledMessage className="message" isDragActive={isDragActive}>
        <CloudUpload />
        Drop files to upload
      </StyledMessage>
    </StyledDropzone>
  );
};

export default OcrDropzone;
