import { useAnalyzeNote } from "@/api/notes/analyze-note";
import { useCreateNote } from "@/api/notes/create-note";
import { useDeleteNote } from "@/api/notes/delete-note";
import { useGetNotes } from "@/api/notes/get-notes";
import { OcrDropzoneRef } from "@/ui/components/form/dropzone";
import { useToast } from "@/ui/components/toasts/use-toast";
import { useDialogs } from "@/ui/dialogs";
import { FlexColumn } from "@/ui/layout/flexbox";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Card, Divider } from "@mui/material";
import React, { useState } from "react";
import { NoteDropzone } from "./components/note-dropzone";
import { NoteHeader } from "./components/note-header";
import { NoteListTile } from "./components/note-list-tile";
import { Note } from "./types/api-types";

type NotesProps = React.ComponentProps<typeof Card>;

export const Notes = ({ ...cardProps }: NotesProps) => {
  const createNote = useCreateNote();
  const deleteNote = useDeleteNote();
  const analyzeNote = useAnalyzeNote();
  const { data: notes } = useGetNotes();

  const { promise } = useToast();
  const { confirm } = useDialogs();

  //@ts-ignore - This will be fixed in the next update
  const [selectedNotes, setSelectedNotes] = useState<Note[]>([]);
  const dropzoneRef = React.useRef<OcrDropzoneRef>(null);

  const handleAcceptedFiles = (files: File[]) => {
    files.forEach(async (f) => {
      console.log("Creating note for file", f.name);
      const prom = createNote.mutateAsync({
        file: f,
      });
      promise(
        prom,
        `Uploading ${f.name}`,
        `Uploaded ${f.name}`,
        `Failed to upload ${f.name}`
      );
    });
  };

  const handleDeleteClick = async () => {
    const confirmed = await confirm(
      `Are you sure you want to delete (${selectedNotes.length}) note(s)?`,
      {
        variant: "error",
        icon: (
          <DeleteIcon
            fontSize="inherit"
            sx={{
              color: "error.light",
            }}
          />
        ),
      }
    );

    if (confirmed) {
      selectedNotes.forEach(async (note) => {
        const prom = deleteNote.mutateAsync({
          id: note.id,
        });
        promise(
          prom,
          `Deleting ${note.name}`,
          `Deleted ${note.name}`,
          `Failed to delete ${note.name}`
        );
      });
    }
  };

  const handleAnalyzeClick = () => {
    selectedNotes.forEach(async (note) => {
      const prom = analyzeNote.mutateAsync({
        id: note.id,
      });
      promise(
        prom,
        `Analyzing ${note.name}`,
        `Analyzed ${note.name}`,
        `Failed to analyze ${note.name}`
      );
    });
  };

  return (
    <FlexColumn
      spacing={5}
      paddingX={2}
      height={"100vh"}
      sx={{
        backgroundColor: "background.paper",
      }}
    >
      <Box sx={{ display: "none" }} />
      <NoteDropzone
        ref={dropzoneRef}
        handleAcceptedFiles={handleAcceptedFiles}
        handleRejectedFiles={() => {}}
      />
      <Card
        sx={{ borderRadius: 5, backgroundColor: "background.main" }}
        {...cardProps}
      >
        <FlexColumn
          paddingX={2}
          paddingBottom={2}
          spacing={2}
          sx={{ backgroundColor: "background.main" }}
        >
          <NoteHeader
            onCreate={() => dropzoneRef.current?.open()}
            onDelete={handleDeleteClick}
            onAnalyze={handleAnalyzeClick}
            notesSelected={selectedNotes.length > 0}
          />
          {notes && (
            <FlexColumn
              spacing={2}
              sx={{
                marginTop: 2,
                backgroundColor: "background.paper",
                borderRadius: 5,
                padding: 1,
              }}
            >
              {notes.map((note, index) => (
                <FlexColumn>
                  <NoteListTile
                    note={note}
                    sx={{
                      border: "none",
                      boxShadow: "none",
                    }}
                  />
                  {index < notes.length - 1 && <Divider />}
                </FlexColumn>
              ))}
            </FlexColumn>
          )}
        </FlexColumn>
      </Card>
    </FlexColumn>
  );
};
