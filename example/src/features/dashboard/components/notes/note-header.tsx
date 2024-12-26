import { FlexColumn, FlexRow, FlexSpacer } from "@/ui/layout/flexbox";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";

type NoteHeaderProps = {
  onCreate: () => void;
  onDelete: () => void;
  onAnalyze: () => void;
};

export const NoteHeader = ({
  onCreate,
  onDelete,
  onAnalyze,
}: NoteHeaderProps) => (
  <FlexColumn>
    <Typography variant="h5" sx={{ marginTop: 2 }}>
      Saved Notes
    </Typography>
    <Typography variant="body1">View your saved notes here.</Typography>

    <FlexRow spacing={2} sx={{ marginTop: 2 }}>
      <FlexSpacer />
      <Button variant="contained" startIcon={<AddIcon />} onClick={onCreate}>
        Create
      </Button>
      <Button
        variant="contained"
        startIcon={<TroubleshootIcon />}
        onClick={onAnalyze}
      >
        Analyze
      </Button>
      <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onDelete}>
        Delete
      </Button>
    </FlexRow>
  </FlexColumn>
);
