import { FlexSpacer } from "@/ui/layout/flexbox";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { AlertDialogOptions } from "../types/concrete";
import { GenericDialogProps } from "../types/generic";
import { OcrDialog } from "./ocr-dialog";

export type AlertDialogProps = GenericDialogProps<AlertDialogOptions, void>;

export const AlertDialog = ({ open, payload, onClose }: AlertDialogProps) => {
  return (
    <OcrDialog open={open} onClose={() => onClose()}>
      <DialogTitle
        component={"h1"}
        variant="h3"
        sx={{ display: "flex", alignItems: "center" }}
      >
        {payload.title ?? "Alert"}
        <FlexSpacer />
        {payload.icon}
      </DialogTitle>

      <DialogContent>{payload.message}</DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color={payload.variant}>
          {payload.okLabel ?? "Ok"}
        </Button>
      </DialogActions>
    </OcrDialog>
  );
};
