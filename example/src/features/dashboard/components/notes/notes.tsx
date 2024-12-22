import { FlexColumn } from "@/ui/layout/flexbox";
import { Card, Typography } from "@mui/material";
import { Note } from "../../types/api-types";
import { NoteListTile } from "./note-list-tile";

type NotesProps = {
  notes?: Note[];
};

export const Notes = ({ notes }: NotesProps) => {
  return (
    <Card>
      <FlexColumn
        padding={2}
        spacing={2}
        sx={{
          marginBottom: 3,
        }}
      >
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          Saved Notes
        </Typography>
        <Card
          sx={{
            border: "none",
            backgroundColor: "primary.main",
          }}
        >
          {notes && notes.map((n) => <NoteListTile key={n.id} note={n} />)}
        </Card>
      </FlexColumn>
    </Card>
  );
};
