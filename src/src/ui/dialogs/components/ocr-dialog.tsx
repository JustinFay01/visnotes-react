import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
} from "@mui/material";

export type OcrDialogProps = MuiDialogProps;

export const OcrDialog = ({
  open,
  onClose,
  children,
  sx,
  ...props
}: OcrDialogProps) => {
  return (
    <MuiDialog
      maxWidth="xs"
      fullWidth
      open={open}
      onClose={(e, r) => onClose && onClose(e, r)}
      {...props}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "8px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        },
        ...sx,
      }}
    >
      {children}
    </MuiDialog>
  );
};
