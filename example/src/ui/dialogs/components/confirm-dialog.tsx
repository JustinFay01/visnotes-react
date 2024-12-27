import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { GenericDialogProps } from "../types/generic";
import { ConfirmDialogOptions } from "../types/concrete";
import { FlexSpacer } from "@/ui/layout/flexbox";
import { OcrDialog } from "./ocr-dialog";

export type ConfirmDialogProps = GenericDialogProps<
  ConfirmDialogOptions,
  boolean
>;

export const ConfirmDialog = ({
  open,
  payload,
  onClose,
}: ConfirmDialogProps) => {
  return (
    <OcrDialog open={open} onClose={() => onClose(false)}>
      <DialogTitle variant="h1" sx={{ display: "flex", alignItems: "center" }}>
        {payload.title ?? "Are you sure?"}
        <FlexSpacer />
        {payload.icon}
      </DialogTitle>

      <DialogContent>
        <DialogContentText>{payload.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} variant="outlined">
          {payload.cancelLabel ?? "Cancel"}
        </Button>
        <Button onClick={() => onClose(true)} color={payload.variant}>
          {payload.confirmLabel ?? "Ok"}
        </Button>
      </DialogActions>
    </OcrDialog>
  );
};
