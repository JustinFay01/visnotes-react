import { OcrTypography } from "@/ui/typography/ocr-typography";
import { Box } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";

type EmptyNoteListProps = React.ComponentProps<typeof Box> & {
  isHovering: boolean;
  setIsHovering: (hovering: boolean) => void;
};

export const EmptyNoteList = ({
  isHovering,
  setIsHovering,
  ...restProps
}: EmptyNoteListProps) => {
  return (
    <Box
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onDragEnter={() => setIsHovering(true)}
      onDragLeave={() => setIsHovering(false)}
      {...restProps}
      sx={{
        height: 250,
        width: "100%",
        backgroundColor: "background.main",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        ":hover": {
          cursor: "pointer",
        },
      }}
    >
      <FileUploadIcon
        fontSize="large"
        sx={{
          transition: "all 0.2s ease-out",
          color: isHovering ? "primary.main" : "action.active",
        }}
      />
      <OcrTypography
        variant="h6"
        sx={{
          transition: "all 0.2s ease-out",
          color: isHovering ? "primary.main" : "action.active",
        }}
      >
        Click to upload or drag and drop.
      </OcrTypography>
      <OcrTypography
        variant="body2"
        sx={{
          transition: "all 0.2s ease-out",
          color: isHovering ? "primary.main" : "action.active",
        }}
      >
        Image must be 800 x 400 px - Max 4MB
      </OcrTypography>
    </Box>
  );
};
