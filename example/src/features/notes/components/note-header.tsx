import { FlexColumn, FlexSpacer } from "@/ui/layout/flexbox";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import { Button, Stack, Typography } from "@mui/material";

type NoteHeaderProps = {
  onCreate: () => void;
  onDelete: () => void;
  onAnalyze: () => void;
  notesSelected: boolean;
};

export const NoteHeader = ({
  onCreate,
  onDelete,
  onAnalyze,
  notesSelected,
}: NoteHeaderProps) => {
  return (
    <FlexColumn>
      <Typography variant="h5" sx={{ marginTop: 2 }}>
        Saved Notes
      </Typography>
      <Typography variant="body1">View your saved notes here.</Typography>

      <Stack
        spacing={2}
        sx={{ marginTop: 2 }}
        direction={{ sm: "column", md: "row" }}
      >
        <FlexSpacer />
        <Button variant="contained" startIcon={<AddIcon />} onClick={onCreate}>
          Create
        </Button>
        <Button
          variant="contained"
          startIcon={<TroubleshootIcon />}
          onClick={onAnalyze}
          disabled={!notesSelected}
        >
          Analyze
        </Button>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={onDelete}
          disabled={!notesSelected}
        >
          Delete
        </Button>
      </Stack>
    </FlexColumn>
  );
};
