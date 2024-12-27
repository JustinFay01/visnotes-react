import { GenosButton } from "@genos/components/ui/button";
import { FlexSpacer } from "@genos/components/ui/layout/flexbox";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { GenericDialogProps } from "../types/generic";
import { GenosDialog } from "./ocr-dialog";
import { AlertDialogOptions } from "../types/concrete";

export type AlertDialogProps = GenericDialogProps<AlertDialogOptions, void>;

export const AlertDialog = ({ open, payload, onClose }: AlertDialogProps) => {
  return (
    <GenosDialog open={open} onClose={() => onClose()}>
      <DialogTitle variant="h1" sx={{ display: "flex", alignItems: "center" }}>
        {payload.title ?? "Alert"}
        <FlexSpacer />
        {payload.icon}
      </DialogTitle>

      <DialogContent>
        <DialogContentText>{payload.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <GenosButton onClick={() => onClose()} color={payload.variant}>
          {payload.okLabel ?? "Ok"}
        </GenosButton>
      </DialogActions>
    </GenosDialog>
  );
};
