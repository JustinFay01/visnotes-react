import {
  OcrDropzone,
  OcrDropzoneProps,
  OcrDropzoneRef,
} from "@/ui/components/form/dropzone";
import { OcrTypography } from "@/ui/typography/ocr-typography";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Box } from "@mui/material";
import { forwardRef, useState } from "react";

type NoteDropzoneProps = Omit<OcrDropzoneProps, "children">;

export const NoteDropzone = forwardRef(
  (
    { handleAcceptedFiles, handleRejectedFiles, sx }: NoteDropzoneProps,
    ref
  ) => {
    const [hovering, setHovering] = useState(false);

    return (
      <OcrDropzone
        ref={ref}
        handleAcceptedFiles={handleAcceptedFiles}
        handleRejectedFiles={handleRejectedFiles}
        sx={{ borderRadius: 5, ...sx }}
      >
        <Box
          onClick={() => {
            (ref as React.MutableRefObject<OcrDropzoneRef>)?.current?.open();
          }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onDragEnter={() => setHovering(true)}
          onDragLeave={() => setHovering(false)}
          sx={{
            height: 250,
            width: "100%",
            backgroundColor: "background.main",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <FileUploadIcon
            fontSize="large"
            sx={{
              transition: "all 0.2s ease-out",
              color: hovering ? "primary.main" : "action.active",
            }}
          />
          <OcrTypography
            variant="h6"
            sx={{
              transition: "all 0.2s ease-out",
              color: hovering ? "primary.main" : "action.active",
            }}
          >
            Click to upload or drag and drop.
          </OcrTypography>
          <OcrTypography
            variant="body2"
            sx={{
              transition: "all 0.2s ease-out",
              color: hovering ? "primary.main" : "action.active",
            }}
          >
            Image must be 800 x 400 px - Max 4MB
          </OcrTypography>
        </Box>
      </OcrDropzone>
    );
  }
);
