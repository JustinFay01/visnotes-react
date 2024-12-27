import { WithSx } from "@/ui/props";
import { CloudUpload } from "@mui/icons-material";
import React, { forwardRef, useCallback, useImperativeHandle } from "react";
import { Accept, FileRejection, useDropzone } from "react-dropzone";
import { StyledDropzone } from "./styled-dropzone";
import { StyledMessage } from "./styled-message";

type OcrDropzoneProps = WithSx & {
  children: React.ReactNode;
  accept?: Accept;
  handleAcceptedFiles?: (files: File[]) => void;
  handleRejectedFiles?: (files: FileRejection[]) => void;
};

export type OcrDropzoneRef = {
  open: () => void;
};

export const OcrDropzone = forwardRef(
  (
    {
      children,
      accept,
      sx,
      handleAcceptedFiles,
      handleRejectedFiles,
    }: OcrDropzoneProps,
    ref
  ) => {
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

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
      onDrop,
      noClick: true,
      accept: accept,
    });

    // Expose the `open` method to the parent component
    useImperativeHandle(ref, () => ({
      open,
    }));

    return (
      <StyledDropzone isDragActive={isDragActive} {...getRootProps()} sx={sx}>
        <input {...getInputProps()} />
        {children}
        <StyledMessage isDragActive={isDragActive}>
          <CloudUpload />
          Drop files to upload
        </StyledMessage>
      </StyledDropzone>
    );
  }
);

export default OcrDropzone;
