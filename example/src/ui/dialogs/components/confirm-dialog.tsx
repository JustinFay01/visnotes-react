import { FlexSpacer } from "@/ui/layout/flexbox";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ConfirmDialogOptions } from "../types/concrete";
import { GenericDialogProps } from "../types/generic";
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
      <DialogTitle
        component={"h1"}
        variant="h3"
        sx={{ display: "flex", alignItems: "center" }}
      >
        {payload.title ?? "Are you sure?"}
        <FlexSpacer />
        {payload.icon}
      </DialogTitle>

      <DialogContent>{payload.message}</DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} variant="outlined">
          {payload.cancelLabel ?? "Cancel"}
        </Button>
        <Button
          variant={"contained"}
          onClick={() => onClose(true)}
          color={payload.variant}
        >
          {payload.confirmLabel ?? "Ok"}
        </Button>
      </DialogActions>
    </OcrDialog>
  );
};
